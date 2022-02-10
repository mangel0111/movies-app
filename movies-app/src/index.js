import './index.css'
import { render } from 'react-dom'

import App from './App.jsx'
import withQueryClient from './hoc/withQueryClient'
import { DataProvider } from './contexts/Data'

render(
  withQueryClient(
    <DataProvider>
      <App />
    </DataProvider>
  ),
  document.getElementById('root')
)
