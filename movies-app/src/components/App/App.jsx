import React from 'react'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme'
import { Provider } from "react-redux";
import store from '../../store'
import { styled } from '@material-ui/core';
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MoviesGrid />
      </Provider>
    </ThemeProvider>
  )
  
}
const StyledApp = styled(App)({
  height: "100vh",
  minHeight: 400,
  textAlign: "center",
  flexDirection: "column",
  justifyContent: "stretch"
})

export default StyledApp
