import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { DRAWER_WIDTH } from '../constants'
import AddButton from './AddButton'
import AddMemoDialog from './AddMemoDialog'
import Header from './Header'
import LeftDrawer from './LeftDrawer'
import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { GetRandomIndexes } from '../utility/utility'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    content: {
      width: 'auto',
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      '& .MuiContainer-maxWidthMd': {
        maxWidth: '960px',
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      paddingLeft: DRAWER_WIDTH,
    },
    item: {
      '& .MuiGrid-root': {
        minWidth: '280px',
      },
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

  const [memos, setMemos] = React.useState([
    'test hot reload',
    'test memo 1',
    'Frontend for JunkNoteAPI',
    'test multi line',
    'coffee',
  ])
  const updateMemos = (newText: string, id: number) => {
    if (id === -1) {
      setMemos([...memos, newText])
    } else {
      memos[id] = newText
      setMemos([...memos])
    }
  }

  const [indexes, setIndexes] = React.useState<number[]>([])
  React.useEffect(() => {
    setIndexes(GetRandomIndexes(memos.length))
  }, [memos])

  return (
    <div className={classes.root}>
      <Header handleOpen={handleOpen} handleTheme={handleTheme} />
      <IsDialogOpen.Provider value={value}>
        <LeftDrawer open={isDrawerOpen} />
        <AddMemoDialog onUpdate={updateMemos} />
        <Container
          maxWidth="md"
          className={clsx(classes.content, {
            [classes.contentShift]: isDrawerOpen,
          })}>
          <Grid
            container
            justifyContent="flex-start"
            spacing={2}
            className={classes.item}>
            {indexes.map((index) => (
              <Grid key={index} item xs={6} sm={4} md={4}>
                <MemoCard text={memos[index]} id={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <AddButton />
      </IsDialogOpen.Provider>
    </div>
  )
}
