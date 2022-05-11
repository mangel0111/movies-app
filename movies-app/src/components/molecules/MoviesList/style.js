import styled from 'styled-components';

export const StyledCard = styled.div`
  border-radius: 12px;
  margin: 12px;
  padding: 12px;
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: #fff;

  ${(props) =>
    props.selected &&
    `
    padding: 8px;
    border: 4px solid #00bbc9;
  `}
`;

export const StyledContent = styled.div`
  display: flex;
  flex: 1;
  border-radius: 12px;
  margin-top: 6px;
  margin-botom: 6px;
  padding: 12px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;

  @media (min-width: 761px) and (max-width: 1080px) {
    margin-top: 24px;
  }

  @media (min-width: 1081px) {
    margin-top: 64px;
  }
`;
