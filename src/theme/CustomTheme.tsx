import React from 'react'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'

type Props = {
  children: React.ReactNode
  isLightMode: boolean
}
const CustomTheme: React.FC<Props> = ({ children, isLightMode }) => {
  const customTheme = createTheme({
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
    palette: {
      type: isLightMode ? 'light' : 'dark',
      primary: {
        light: '#FFE97E',
        main: '#ffe047',
        dark: '#FFD837',
        contrastText: '#000',
      },
      secondary: {
        light: '#50BDCE',
        main: '#319EAF',
        dark: '#24737F',
        contrastText: '#fff',
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

  return (
    <MuiThemeProvider theme={customTheme}>
      <div>{children}</div>
    </MuiThemeProvider>
  )
}

export default CustomTheme
