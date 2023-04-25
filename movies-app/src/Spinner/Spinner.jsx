import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './Spinner.styles';

const Spinner = () => {

    const styles = useStyles();
    
    return (
        <div className={styles.spinner}>
            <CircularProgress />
        </div>
    )
};

export default Spinner;