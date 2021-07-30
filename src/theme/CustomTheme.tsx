import React from 'react'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'

type Props = {
  children: React.ReactNode,
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
