import { Alert as MuiAlert } from '@mui/material';
import tw from 'twin.macro';

import { useAppSelector } from '../../store';

const StyledAlert = tw(MuiAlert)`fixed right-5 top-5 z-[1500]`;

const Alert = () => {
  const { severity, message } = useAppSelector((state) => state.messages);

  if (!message) return null;

  return <StyledAlert severity={severity}>{message}</StyledAlert>;
};

export default Alert;
