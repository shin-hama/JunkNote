import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { DRAWER_WIDTH, TOKEN_KEY } from '../constants'
import MemoCard from './MemoCard'
import { IMemos } from '../model/Memo'
import { GetMethod } from '../utility/ApiConnection'
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

const MemoList: React.FC = () => {
  const classes = useStyles()
  const [memos, setMemos] = React.useState<IMemos[]>([])
  const [indexes, setIndexes] = React.useState<number[]>([])
  React.useEffect(() => {
    setIndexes(GetRandomIndexes(memos.length))
  }, [memos])

  React.useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      GetMethod('memos', null, (data: IMemos[]) => {
        setMemos(data)
      })
    }
  }, [])

  return (
    <Grid
      container
      justifyContent="flex-start"
      spacing={2}
      className={classes.item}>
      {indexes.map((index) => (
        <Grid key={index} item xs={6} sm={4} md={4}>
          <MemoCard text={memos[index].containts} id={index} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MemoList
