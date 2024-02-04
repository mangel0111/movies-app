import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
      filterSection: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
        paddingTop: '.5em',
        paddingBottom: '.5em',
      },
      filterItem: {
        width: '200px',
        marginTop: '.5em',
        marginBottom: '.5em',
      },
      filterButton: {
        width: '200px',
        height: '56px',
        marginTop: '.5em',
        marginBottom: '.5em',
      },
}));