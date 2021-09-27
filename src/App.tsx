import React from 'react'

import MainView from './pages/MainView'

type Props = { handleTheme: React.MouseEventHandler }

const App: React.FC<Props> = ({ handleTheme }) => {
  return <MainView handleTheme={handleTheme} />
}

export default App
