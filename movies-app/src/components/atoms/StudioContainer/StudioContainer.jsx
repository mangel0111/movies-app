import styled from '@material-ui/core/styles/styled'

export default styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
    rowGap: theme.spacing(2)
}))