import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import ContentRegion from './ContentRegion'
import Header from './Header'
import LeftDrawer from './LeftDrawer'
import { IMemo } from '../model/Memo'
import { setAccessedTimestamp } from '../utility/AccessedTimestamp'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
  })
)

interface ContextProps {
  memo: IMemo | null
  setMemo: React.Dispatch<React.SetStateAction<IMemo | null>>
}
export const MemoContext = React.createContext<ContextProps>({
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

  React.useEffect(() => {
    setAccessedTimestamp(new Date())
  }, [])

  return (
    <div className={classes.root}>
      <Header handleOpen={handleOpen} handleTheme={handleTheme} />
      <MemoContext.Provider value={value}>
        <LeftDrawer open={isDrawerOpen} />
        <ContentRegion isDrawerOpen={isDrawerOpen} />
      </MemoContext.Provider>
    </div>
  )
}
