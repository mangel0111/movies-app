import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import config from '../constants/config'

const useStyles = makeStyles({
  avatar: {
    margin: 5,
    width: (props) => props.size,
    height: (props) => props.size,
  },
  img: {
    width: '100%',
  },
})

const Thumbnail = ({ img, size }) => {
  const classes = useStyles({ size })
  return (
    <Avatar className={classes.avatar} src={img}>
      <img className={classes.img} alt="avatar" src={config.DEFAULT_AVATAR} />
    </Avatar>
  )
}
export default Thumbnail
