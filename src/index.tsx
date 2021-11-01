import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'

import './index.css'
import App from './App'
import CustomTheme from './theme/CustomTheme'
import reportWebVitals from './reportWebVitals'

const Index: React.FC = () => {
  return (
    <React.StrictMode>
      <CustomTheme>
        <CssBaseline />
        <App />
      </CustomTheme>
    </React.StrictMode>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
