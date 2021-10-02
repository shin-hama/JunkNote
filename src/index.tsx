import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'

import './index.css'
import App from './App'
import CustomTheme from './theme/CustomTheme'
import reportWebVitals from './reportWebVitals'

const Index: React.FC = () => {
  const [isLightMode, setIsLightMode] = React.useState<boolean>(true)
  const handleThemeMode = () => setIsLightMode(!isLightMode)

  return (
    <React.StrictMode>
      <CustomTheme isLightMode={isLightMode}>
        <CssBaseline />
        <App handleTheme={handleThemeMode} />
      </CustomTheme>
    </React.StrictMode>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
