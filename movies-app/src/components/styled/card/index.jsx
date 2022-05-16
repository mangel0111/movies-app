import { Card } from '@material-ui/core';
import styled from 'styled-components';

export default styled(Card)`
  border-radius: 4px;
  margin: 2px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  height: 100%;
  
  &:hover {
    cursor: ${({ $hoverable }) => ($hoverable ? 'pointer' : 'auto')};
    opacity: ${({ $hoverable }) => ($hoverable ? '0.7' : '1')};
  }
`;
