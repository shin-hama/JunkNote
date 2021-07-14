import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'

import './index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'

const Index: React.FC = () => {
  const [isLightMode, setIsLightMode] = React.useState<boolean>(true)
  const handleThemeMode = () => setIsLightMode(!isLightMode)

  // TODO: Move to other file
  const customTheme = createTheme({
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
    palette: {
      type: isLightMode ? 'light' : 'dark',
    },
    props: {
      MuiTextField: {
        variant: 'outlined',
      },
      MuiList: {
        dense: true,
      },
      MuiCheckbox: {
        color: 'primary',
      },
      MuiRadio: {
        color: 'primary',
      },
      MuiSwitch: {
        color: 'primary',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  })

  return (
    <React.StrictMode>
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        <App handleTheme={handleThemeMode} />
      </MuiThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
