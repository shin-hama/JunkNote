import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import ContentRegion from './ContentRegion'
import Header from './Header'
import LeftDrawer from './LeftDrawer'
import { IMemo } from '../model/Memo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
  })
)

export interface ContextProps {
  memo: IMemo | null
  setMemo: React.Dispatch<React.SetStateAction<IMemo | null>>
}
export const IsDialogOpen = React.createContext<ContextProps>({
  memo: null,
  setMemo: () => {
    // no run
  },
})

type Props = { handleTheme: React.MouseEventHandler }
export default function App({ handleTheme }: Props) {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true)
  const [memo, setMemo] = React.useState<IMemo | null>(null)
  const value = {
    memo: memo,
    setMemo: setMemo,
  }

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className={classes.root}>
      <Header handleOpen={handleOpen} handleTheme={handleTheme} />
      <IsDialogOpen.Provider value={value}>
        <LeftDrawer open={isDrawerOpen} />
        <ContentRegion isDrawerOpen={isDrawerOpen} />
      </IsDialogOpen.Provider>
    </div>
  )
}
