import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { DRAWER_WIDTH } from '../constants'
import AddButton from './AddButton'
import Header from './Header'
import LeftDrawer from './LeftDrawer'
import MemoCard from './MemoCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    content: {
      width: 'auto',
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    },
  })
)

type Props = { handleTheme: React.MouseEventHandler }
export default function App({ handleTheme }: Props) {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true)

  const testMemos = [
    'test hot reload',
    'test memo 1',
    'Frontend for JunkNoteAPI',
    'test multi line',
    'coffee',
  ]

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className={classes.root}>
      <Header handleOpen={handleOpen} handleTheme={handleTheme} />
      <LeftDrawer open={isDrawerOpen} />
      <Container
        maxWidth="lg"
        className={clsx(classes.content, {
          [classes.contentShift]: isDrawerOpen,
        })}>
        <Grid container justify="flex-start" spacing={2}>
          {testMemos.map((item, i) => (
            <Grid key={i} item xs={6} md={4} lg={3}>
              <MemoCard text={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <AddButton />
    </div>
  )
}
