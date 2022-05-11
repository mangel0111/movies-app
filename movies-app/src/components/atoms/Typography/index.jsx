import React from 'react';
import {StyledTypography} from './style';

const Typography = ({children, ...props}) => {
  return (
    <StyledTypography {...props}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
