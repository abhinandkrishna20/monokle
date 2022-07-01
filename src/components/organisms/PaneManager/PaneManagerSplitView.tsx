import React, {Suspense, useCallback} from 'react';

import {GUTTER_SPLIT_VIEW_PANE_WIDTH, MIN_SPLIT_VIEW_PANE_WIDTH} from '@constants/constants';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setPaneConfiguration} from '@redux/reducers/ui';

import {ActionsPane, NavigatorPane} from '@organisms';

import {useMainPaneDimensions} from '@utils/hooks';

import * as S from './PaneManagerSplitView.styled';
// eslint-disable-next-line import/no-relative-packages
import {ReflexContainer, ReflexElement, ReflexSplitter} from './react-reflex';

const FileTreePane = React.lazy(() => import('@organisms/FileTreePane'));
const HelmPane = React.lazy(() => import('@organisms/HelmPane'));
const ImagesPane = React.lazy(() => import('@components/organisms/ImagesPane'));
const KustomizePane = React.lazy(() => import('@organisms/KustomizePane'));
const TemplateManagerPane = React.lazy(() => import('@organisms/TemplateManagerPane'));
const ValidationPane = React.lazy(() => import('@organisms/ValidationPane'));

const PaneManagerSplitView: React.FC = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(state => state.ui.paneConfiguration);
  const leftActiveMenu = useAppSelector(state =>
    state.ui.leftMenu.isActive ? state.ui.leftMenu.selection : undefined
  );
  const {height, width} = useMainPaneDimensions();

  const handleResize = useCallback(
    (elements: any) => {
      const updates = elements.reduce((obj: any, el: any) => {
        if (!['leftPane', 'navPane'].includes(el.props.id)) return obj;
        obj[el.props['id']] = el.props['flex'];
        return obj;
      }, {});

      const newLayout = {...layout, ...updates};
      dispatch(setPaneConfiguration(newLayout));
    },
    [dispatch, layout]
  );

  return (
    <S.SplitViewContainer style={{width, height}}>
      <ReflexContainer orientation="vertical" onStopResize={handleResize} windowResizeAware style={{width}}>
        {leftActiveMenu && (
          <ReflexElement id="leftPane" minSize={MIN_SPLIT_VIEW_PANE_WIDTH} flex={layout.leftPane}>
            <S.LeftPane>
              <Suspense fallback={<div />}>
                {leftActiveMenu === 'file-explorer' && <FileTreePane height={height} />}
                {leftActiveMenu === 'helm-pane' && <HelmPane />}
                {leftActiveMenu === 'kustomize-pane' && <KustomizePane />}
                {leftActiveMenu === 'images-pane' && <ImagesPane />}
                {leftActiveMenu === 'templates-pane' && <TemplateManagerPane height={height} />}
                {leftActiveMenu === 'validation-pane' && <ValidationPane height={height} />}
              </Suspense>
            </S.LeftPane>
          </ReflexElement>
        )}

        {/* react-reflex does not work as intended when you
            use fragments so keep this separate. */}
        {leftActiveMenu && <ReflexSplitter propagate />}

        <ReflexElement
          id="navPane"
          minSize={MIN_SPLIT_VIEW_PANE_WIDTH}
          maxSize={MIN_SPLIT_VIEW_PANE_WIDTH + 200}
          flex={layout.navPane}
        >
          <NavigatorPane height={height} />
        </ReflexElement>

        {/* react-reflex does not work as intended when you use propagate 
            without multiple splitters so set is dynamically. */}
        <ReflexSplitter propagate={Boolean(leftActiveMenu)} />

        <ReflexElement id="editPane" minSize={width < 1000 ? GUTTER_SPLIT_VIEW_PANE_WIDTH : MIN_SPLIT_VIEW_PANE_WIDTH}>
          <ActionsPane height={height} />
        </ReflexElement>
      </ReflexContainer>
    </S.SplitViewContainer>
  );
};

export default PaneManagerSplitView;
