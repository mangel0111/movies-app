/* eslint-disable no-nested-ternary */
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

export default styled(Avatar)`
    width: ${({ $isLogo, $isDrawer }) => ($isLogo ? '36px' : ($isDrawer ? '200px' : '280px'))};
    height: ${({ $isLogo, $isDrawer }) => ($isLogo ? '36px' : ($isDrawer ? '200px' : '280px'))};
    margin: 5px;

    @media (max-width: 599px) {
        width: ${({ $isLogo, $isDrawer }) => ($isLogo ? '24px' : ($isDrawer ? '200px' : '100px'))};
        height: ${({ $isLogo, $isDrawer }) => ($isLogo ? '24px' : ($isDrawer ? '200px' : '100px'))};
      }
`;
