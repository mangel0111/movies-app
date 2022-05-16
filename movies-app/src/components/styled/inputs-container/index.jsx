import styled from 'styled-components';

export default styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;

    @media (max-width: 599px) {
        flex-direction: ${({ $isDrawer }) => ($isDrawer ? 'row' : 'column')};
    }
`;
