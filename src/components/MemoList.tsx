import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { TOKEN_KEY } from '../constants'
import MemoCard from './MemoCard'
import { IMemos } from '../model/Memo'
import { GetMethod } from '../utility/ApiConnection'
import { GetRandomIndexes } from '../utility/utility'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      '& .MuiGrid-root': {
        minWidth: '240px',
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
