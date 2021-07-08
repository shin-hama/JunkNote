import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Header from './Header'
import MemoCard from './MemoCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(3),
    },
  })
)

export default function App() {
  const classes = useStyles()

  const testMemos = [
    'test hot reload',
    'test memo 1',
    'Frontend for JunkNoteAPI',
  ]
  return (
    <div className="reactApp">
      <Header />
      <Container maxWidth="md" className={classes.mainContainer}>
        <Grid container justify="flex-start" spacing={2}>
          {testMemos.map((item, i) => (
            <Grid key={i} item xs={6} md={4}>
              <MemoCard text={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
