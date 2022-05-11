import styled from 'styled-components';

export const InputContainer = styled.div`
  margin: 6px;
  padding: 0 6px;
`;
export const StyledFilter = styled.div`
  display: flex;
  flex: 1;
  border-radius: 12px;
  margin: 6px 12px 24px;
  padding: 12px 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  @media (min-width: 601px) {
    flex-direction: row;
  }
`;
