import React from 'react';
import MuiButton from '@material-ui/core/Button';

const Button = ({children, ...props}) => {
  return (
    <MuiButton variant="outlined" size="small" {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
