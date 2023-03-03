import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
      modalBox: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: 'white',
        width:'400px',
        height: '200px',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #000',
        boxShadow: 24,
      },
      modalItem: {
        width: '300px',
        margin: '5px 0',
      }
}));