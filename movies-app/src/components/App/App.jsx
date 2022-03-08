import React from 'react'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme'
import { Provider } from "react-redux";
import store from '../../store'

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
