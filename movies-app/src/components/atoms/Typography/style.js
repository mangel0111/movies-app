import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const StyledTypography = styled(Typography)`
  &.MuiTypography-body1 {
    font-size: 0.8rem;
    font-weight: 700;
    color: #202022;

    @media (min-width: 601px) and (max-width: 1080px) {
      font-size: 1rem;
    }
    @media (min-width: 1081px) {
      font-size: 1.2rem;
    }
  }
`;
