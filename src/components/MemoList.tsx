import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { MemosContext } from './ContentRegion'
import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { GetRandomIndexes } from '../utility/utility'
import { getAccessedTimestamp } from '../utility/AccessedTimestamp'
import { Typography } from '@material-ui/core'

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
  const [indexes, setIndexes] = React.useState<IMemo[]>([])
  const { memos } = React.useContext(MemosContext)
  const [latest, setLatest] = React.useState<IMemo[]>([])
  // const [pinned, setPinned] = React.useState<IMemo[]>([])
  const [common, setCommon] = React.useState<IMemo[]>([])

  React.useEffect(() => {
    memos.forEach((memo) => {
      if (new Date(Date.parse(memo.created)) > getAccessedTimestamp()) {
        setLatest((prev) => [...prev, memo])
      } else {
        setCommon((prev) => [...prev, memo])
      }
    })
  }, [memos])

  React.useEffect(() => {
    setIndexes(GetRandomIndexes(common))
  }, [common])

  return (
    <div>
      {latest.length > 0 ? (
        <div>
          <Typography>Latest Added</Typography>
          <Cards items={latest}></Cards>
        </div>
      ) : (
        <></>
      )}
      <Cards items={indexes} />
    </div>
  )
}

type CardsProps = {
  items: Array<IMemo>
}
const Cards: React.FC<CardsProps> = ({ items }: CardsProps) => {
  const classes = useStyles()
  return (
    <Grid
      container
      justifyContent="flex-start"
      spacing={2}
      className={classes.item}>
      {items.map((item, i) => (
        <Grid key={i} item xs={6} sm={4} md={4}>
          <MemoCard memo={item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MemoList
