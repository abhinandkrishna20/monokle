import React, {useState, useEffect} from 'react';
import {Popover, Typography, Divider} from 'antd';
import styled from 'styled-components';
import Colors, {FontColors} from '@styles/Colors';
import MonoIcon, {MonoIconTypes} from '@components/atoms/MonoIcon';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectK8sResource} from '@redux/reducers/main';
import {ResourceRef, K8sResource} from '@models/k8sresource';
import {ResourceMapType} from '@models/appstate';
import {isOutgoingRef, isIncomingRef, isUnsatisfiedRef} from '@redux/services/resourceRefs';
import ScrollIntoView from '@molecules/ScrollIntoView';

const {Text} = Typography;

type RefLinkProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

type NavigatorRowLabelProps = {
  label: string;
  resourceId: string;
  isSelected: boolean;
  isHighlighted: boolean;
  hasIncomingRefs: boolean;
  hasOutgoingRefs: boolean;
  hasUnsatisfiedRefs?: boolean;
  onClickLabel?: React.MouseEventHandler<HTMLDivElement>;
};

const StyledDivider = styled(Divider)`
  margin: 5px 0;
`;

const PopoverTitle = styled(Text)`
  font-weight: 500;
`;

const StyledRefDiv = styled.div`
  display: block;
  margin: 5px 0;
`;

const StyledUnsatisfiedRefText = styled(Text)`
  color: ${FontColors.warning};
`;

const StyledRefText = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledSpan = styled.span<{isSelected: boolean; isHighlighted: boolean}>`
  cursor: pointer;
  ${props => {
    if (props.isSelected) {
      return `color: ${Colors.blackPure}`;
    }
    if (props.isHighlighted) {
      return `color: ${Colors.cyan7}`;
    }
    return `color: ${Colors.blue10}`;
  }}
`;

const OutgoingRefLink = (props: RefLinkProps) => {
  const {text, onClick} = props;
  return (
    <div onClick={onClick}>
      <MonoIcon type={MonoIconTypes.OutgoingRefs} marginRight={5} />
      <StyledRefText>{text}</StyledRefText>
    </div>
  );
};

const IncomingRefLink = (props: RefLinkProps) => {
  const {text, onClick} = props;
  return (
    <div onClick={onClick}>
      <MonoIcon type={MonoIconTypes.IncomingRefs} marginRight={5} />
      <StyledRefText>{text}</StyledRefText>
    </div>
  );
};

const UnsatisfiedRefLink = (props: {text: string}) => {
  const {text} = props;
  return (
    <div>
      <MonoIcon type={MonoIconTypes.Warning} marginRight={5} />
      <StyledUnsatisfiedRefText>{text}</StyledUnsatisfiedRefText>
    </div>
  );
};

const RefLink = (props: {resourceRef: ResourceRef; resourceMap: ResourceMapType; onClick?: () => void}) => {
  const {resourceRef, resourceMap, onClick} = props;

  const targetName =
    resourceRef.targetResource && resourceMap[resourceRef.targetResource]
      ? resourceMap[resourceRef.targetResource].name
      : resourceRef.refName;

  if (isOutgoingRef(resourceRef.refType)) {
    return <OutgoingRefLink onClick={onClick} text={targetName} />;
  }
  if (isIncomingRef(resourceRef.refType)) {
    return <IncomingRefLink onClick={onClick} text={targetName} />;
  }
  if (isUnsatisfiedRef(resourceRef.refType)) {
    return <UnsatisfiedRefLink text={targetName} />;
  }

  return null;
};

const PopoverContent = (props: {
  children: React.ReactNode;
  resourceRefs: ResourceRef[];
  resourceMap: ResourceMapType;
  selectResource: (selectedResource: string) => void;
}) => {
  const {children, resourceRefs, resourceMap, selectResource} = props;

  const onLinkClick = (ref: ResourceRef) => {
    if (ref.targetResource) {
      selectResource(ref.targetResource);
    }
  };

  return (
    <>
      <PopoverTitle>{children}</PopoverTitle>
      <StyledDivider />
      {resourceRefs.map(resourceRef => (
        <StyledRefDiv key={resourceRef.targetResource || resourceRef.refName}>
          <RefLink resourceRef={resourceRef} resourceMap={resourceMap} onClick={() => onLinkClick(resourceRef)} />
        </StyledRefDiv>
      ))}
    </>
  );
};

const NavigatorRowLabel = (props: NavigatorRowLabelProps) => {
  const {
    label,
    isSelected,
    isHighlighted,
    resourceId,
    hasIncomingRefs,
    hasOutgoingRefs,
    hasUnsatisfiedRefs,
    onClickLabel,
  } = props;

  const dispatch = useAppDispatch();
  const resourceMap = useAppSelector(state => state.main.resourceMap);
  const selectedPath = useAppSelector(state => state.main.selectedPath);
  const [resource, setResource] = useState<K8sResource>();
  const scrollContainer = React.useRef(null);

  useEffect(() => {
    setResource(resourceMap[resourceId]);
  }, [resourceId, resourceMap]);

  useEffect(() => {
    if (isHighlighted && selectedPath) {
      // @ts-ignore
      scrollContainer.current?.scrollIntoView();
    }
  }, [isHighlighted, selectedPath]);

  const selectResource = (resId: string) => {
    dispatch(selectK8sResource(resId));
  };

  return (
    <>
      {resource && resource.refs && hasIncomingRefs && (
        <Popover
          mouseEnterDelay={0.5}
          placement="rightTop"
          content={
            <PopoverContent
              resourceRefs={resource.refs.filter(r => isIncomingRef(r.refType))}
              resourceMap={resourceMap}
              selectResource={selectResource}
            >
              Incoming Links <MonoIcon type={MonoIconTypes.IncomingRefs} />
            </PopoverContent>
          }
        >
          <span>
            <MonoIcon type={MonoIconTypes.IncomingRefs} marginRight={5} />
          </span>
        </Popover>
      )}
      <StyledSpan
        isSelected={isSelected}
        isHighlighted={isHighlighted}
        onClick={onClickLabel}
        style={!hasIncomingRefs ? {marginLeft: 19} : {}}
      >
        <ScrollIntoView ref={scrollContainer}>{label}</ScrollIntoView>
      </StyledSpan>
      {resource && resource.refs && (hasOutgoingRefs || hasUnsatisfiedRefs) && (
        <Popover
          placement="rightTop"
          mouseEnterDelay={0.5}
          content={
            <PopoverContent
              resourceRefs={resource.refs.filter(r => isOutgoingRef(r.refType) || isUnsatisfiedRef(r.refType))}
              resourceMap={resourceMap}
              selectResource={selectResource}
            >
              Outgoing Links <MonoIcon type={MonoIconTypes.OutgoingRefs} />
            </PopoverContent>
          }
        >
          <span>
            <MonoIcon type={MonoIconTypes.OutgoingRefs} marginLeft={5} />
            {hasUnsatisfiedRefs && <MonoIcon type={MonoIconTypes.Warning} marginLeft={5} />}
          </span>
        </Popover>
      )}
    </>
  );
};

export default NavigatorRowLabel;
