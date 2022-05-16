import { Drawer } from '@material-ui/core';
import styled from 'styled-components';

export default styled(Drawer)`
  .MuiDrawer-paper {
    width: 400px;
  }
  
  @media (max-width: 599px) {
    .MuiDrawer-paper {
      width: 100%;
    }
  }
`;
