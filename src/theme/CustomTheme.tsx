import React from 'react'
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'

type ContextProps = {
  isLightMode: boolean
  setIsLightMode: React.Dispatch<React.SetStateAction<boolean>>
}
export const IsLightModeContext = React.createContext<ContextProps>({
  isLightMode: true,
  setIsLightMode: () => {
    // no run
  },
})

type Props = {
  children: React.ReactNode
}
const CustomTheme: React.FC<Props> = ({ children }) => {
  const [isLightMode, setIsLightMode] = React.useState<boolean>(true)

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
        <IsLightModeContext.Provider value={{ isLightMode, setIsLightMode }}>
          <div>{children}</div>
        </IsLightModeContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default CustomTheme
