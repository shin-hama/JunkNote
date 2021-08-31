import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MemoCard from './MemoCard'
import { IMemos } from '../model/Memo'
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

type Props = {
  memos: IMemos[]
}
const MemoList: React.FC<Props> = ({ memos }) => {
  const classes = useStyles()
  const [indexes, setIndexes] = React.useState<number[]>([])

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
