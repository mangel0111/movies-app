import './index.css'
import { render } from 'react-dom'

import App from './App.jsx'
import withQueryClient from './hoc/withQueryClient'

render(withQueryClient(<App />), document.getElementById('root'))
