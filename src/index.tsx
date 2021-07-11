import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'

import './index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'

const customTheme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  palette: {
    primary: {
      main: '#1A535C',
      contrastText: '#F7FFF7',
    },
    secondary: {
      main: '#FFE047',
      contrastText: '#1A535C',
    },
    error: {
      main: '#FF6B6B',
      contrastText: '#F7FFF7',
    },
    warning: {
      main: '#FFE66D',
      contrastText: '#1A535C',
    },
    info: {
      main: '#24737F',
      contrastText: '#F7FFF7',
    },
    success: {
      main: '#5892DA',
      contrastText: '#F7FFF7',
    },
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

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={customTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
