import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Notification({ message, severity, onClose }) {
  return (
    <Snackbar open={!!message} autoHideDuration={4000} onClose={onClose}>
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
