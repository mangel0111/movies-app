import { Box } from '@material-ui/core';
import styled from 'styled-components';

export default styled(Box)`
  background-color: #eeeeee;
  display: flex;
  justify-content: ${({ $isDrawer }) => ($isDrawer ? 'space-between' : 'space-around')};
  width: 100%
  border: 1px solid gray;
  border-radius: 4px;
  margin: 2px 2px 16px;
  padding: 8px;
  flex-direction: ${({ $isDrawer }) => ($isDrawer ? 'column' : 'row')};
  height: 100%;
  align-items: center;

  @media (max-width: 599px) {
    flex-direction: ${({ $isDrawer }) => ($isDrawer ? 'column' : 'row')};
  }
`;
