import React from 'react'
import { Provider } from "react-redux";
import { ThemeProvider } from '@material-ui/styles';
import MoviesGrid from 'components/organism/MoviesGrid/MoviesGrid'
import theme from 'theme'
import store from 'store'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MoviesGrid />
      </Provider>
    </ThemeProvider>
  )
  
}

export default App
