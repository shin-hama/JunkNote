import React from 'react'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

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
      mode: isLightMode ? 'light' : 'dark',
      primary: {
        light: '#50BDCE',
        main: '#319EAF',
        dark: '#24737F',
        contrastText: '#fff',
      },
      secondary: {
        light: '#FFE97E',
        main: '#ffe047',
        dark: '#FFD837',
        contrastText: '#000',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <div>{children}</div>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default CustomTheme
