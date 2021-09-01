import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { MemosContext } from './ContentRegion'
import MemoCard from './MemoCard'
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
  const [indexes, setIndexes] = React.useState<number[]>([])
  const { memos } = React.useContext(MemosContext)

  React.useEffect(() => {
    setIndexes(GetRandomIndexes(memos.length))
  }, [memos])

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
