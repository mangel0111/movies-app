import './Alert.css';
import { Alert as MuiAlert } from '@mui/material';
import { useSelector } from 'react-redux';

const Alert = () => {
  const { severity, message } = useSelector(state => state.messages);

  if (!message) return null;

  return <MuiAlert className="mui-alert" severity={severity}>{message}</MuiAlert>;
};

export default Alert;
