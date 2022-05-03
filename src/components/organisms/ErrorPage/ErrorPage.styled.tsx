import {Button} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/Colors';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: calc(100vh - 15rem) 15rem;
`;

export const ErrorFigure = styled.img`
  width: 16rem;
  height: 16rem;
`;

export const ErrorDescription = styled.div`
  height: 100%;
  overflow-y: auto;
  ${GlobalScrollbarStyle}
`;

export const ErrorButton = styled(Button)`
  display: flex;
  padding: 0;
  margin: 0;
  align-items: end;
  font-size: 13px;
  color: ${Colors.grey7};
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding-top: 6rem;
`;

export const ActionItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const ActionItem = styled.div`
  display: flex;
  width: 18rem;
  margin: 0 3rem;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const ActionItemLogo = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

export const ActionItemContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 1rem;
  font-weight: 400;
  font-size: 13px;
`;

export const Actions = styled.div`
  background: ${Colors.grey3000};
  height: 240px;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 1rem 0;
`;

export const ActionsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${Colors.whitePure};
`;

export const ActionItemText = styled.div``;
export const ActionItemButton = styled(Button)`
  display: flex;
  padding: 0;
  margin: 0;
  align-items: end;
  font-size: 13px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${Colors.whitePure};
  margin: 3rem 0 1rem 0;
  font-weight: 600;
`;
