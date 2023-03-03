import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
      appContainer: {
        height: '100%',
        minHeight: '400px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
      },
      appFlex: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
}));