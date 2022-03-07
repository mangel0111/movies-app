import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#82A3A2",
            contrastText: "#FFF "
        },
        secondary: {
            main: "#9ABEB2"
        },
        background: {
            main: "#F1F1F1",
            paper: "#D5D5D5"
        }
    }
})

export default theme