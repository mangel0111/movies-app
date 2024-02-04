import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    avatar: {
        margin: 5, 
        width: 280, 
        height: 280,
        '@media(max-width: 601px)': {
            width: 60,
            height: 60,
          }
    },
    card: {
        border: '1px solid gray',
        borderRadius: '4px',
        margin: '2px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:' center',
        '@media(max-width: 601px)': {
            border: '1px solid gray',
            borderRadius: '4px',
            margin: '2px',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
          }
      },
      movieName: {
        display: 'inline-block',
      },
      moviePosition: {
        display: 'inline-block',
        fontWeight: 'bold',
      }
}));