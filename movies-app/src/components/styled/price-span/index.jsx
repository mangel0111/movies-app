import styled from 'styled-components';

export default styled.span`
    font-weight: bold;
    color: ${({ $color }) => $color || 'black'}
`;
