import React, { useCallback, useEffect } from 'react';
// @ts-ignore
import { Easing, Tween, autoPlay } from 'es6-tween';
import { useStore, useZoomPanHelper } from 'react-flow-renderer';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setAutoZoom } from '@redux/reducers/appConfig';

autoPlay(true);

const TRANSITION_TIME = 300;
const EASING = Easing.Quadratic.Out;

const Sidebar = (reactFlow: any) => {
  const store = useStore();
  const dispatch = useAppDispatch();
  const zoomPanHelper = useZoomPanHelper();
  const selectedResource = useAppSelector(state => state.main.selectedResource);
  const settings = useAppSelector(state => state.config.settings);

  const selectSelectedResource = useCallback(() => {
    if (selectedResource) {
      const { nodes } = store.getState();

      if (nodes.length) {
        const node = nodes.find(node => node.id === selectedResource);
        if (node) {
          if (node.data.wasSelectedInGraphView === true) {
            node.data.wasSelectedInGraphView = false;
          } else {
            const x = node.__rf.position.x + node.__rf.width / 2;
            const y = node.__rf.position.y + node.__rf.height / 2;

            performTransform({ x: x, y: y, zoom: 1 });
          }
        }
      }
    }
  }, [selectedResource]);

  useEffect(() => {
    if (settings.autoZoomGraphOnSelection) {
      selectSelectedResource();
    }
  }, [selectedResource]);

  const onZoomChange = useCallback((e: any) => {
    dispatch(setAutoZoom(e.target.checked));
  }, [dispatch]);

  function fit() {
    zoomPanHelper.fitView();
  }

  const handleZoom = useCallback(
    (ratio) => () => {
      const zoom = store.getState().transform[2];
      new Tween({ zoom })
        .to({ zoom: zoom * ratio }, TRANSITION_TIME)
        .easing(EASING)
        // @ts-ignore
        .on('update', ({ zoom }) => {
          zoomPanHelper.zoomTo(zoom);
        })
        .start();
    }, [zoomPanHelper],
  );

  function performTransform(transform: any) {
    const {
      position: [x, y],
      zoom,
    } = reactFlow.reactFlow.toObject();

    new Tween({ x: -x + 300, y: -y + 300, zoom })
      .to(transform, TRANSITION_TIME)
      .easing(EASING)
      // @ts-ignore
      .on('update', ({ x, y, zoom }) =>
        // @ts-ignore
        zoomPanHelper.setCenter(x, y, zoom),
      )
      .start();
  }

  return (
    <aside>
      <button onClick={fit}>Fit view</button>
      <button onClick={handleZoom(1.4)}>Zoom in</button>
      <button onClick={handleZoom(1 / 1.4)}>Zoom out</button>
      <button onClick={selectSelectedResource} disabled={selectedResource === undefined}>Zoom on selected resource
      </button>
      <input type='checkbox' onChange={onZoomChange} checked={settings.autoZoomGraphOnSelection === true} /> auto-zoom
    </aside>
  );
};

export default Sidebar;