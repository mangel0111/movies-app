import styled from '@material-ui/core/styles/styled'

export default styled("div")(({ theme }) => ({
    height: "100%",
    minHeight: 400,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyCSontent: "stretch",
    backgroundColor: theme.palette.background.main

}))