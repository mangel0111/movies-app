import styled from '@material-ui/core/styles/styled'

export default styled("div")(({ theme }) => ({
    height: "100vh",
    minHeight: 400,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    backgroundColor: theme.palette.background.main
}))