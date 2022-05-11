import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

export const StyledAvatar = styled(Avatar)`
  margin: 5px;
  
  &.MuiAvatar-root {
    width: 70px;
    height: 110px;

    @media (min-width: 761px) and (max-width: 1080px) {
      width: 130px;
      height: 180px;
    }
    @media (min-width: 1081px) {
      width: 150px;
      height: 250px;
    }
  }
`;
