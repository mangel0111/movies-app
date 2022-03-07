import './App.css'
import React from 'react'
import MoviesGrid from '../MoviesGrid/MoviesGrid'
import { Provider } from "react-redux";
import store from '../../store'
const App = () => {

  return (
    <Provider store={store}>
      <MoviesGrid />
    </Provider>
  )

}

export default App
