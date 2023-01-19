import './Alert.css';

import { Alert as MuiAlert } from '@mui/material';

import { useAppSelector } from '../../store';

const Alert = () => {
  const { severity, message } = useAppSelector((state) => state.messages);

  if (!message) return null;

  return (
    <MuiAlert className="mui-alert" severity={severity}>
      {message}
    </MuiAlert>
  );
};

export default Alert;
