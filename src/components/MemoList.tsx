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
      marginTop: '5px',
      marginBottom: '5px',
      '& .MuiGrid-root': {
        minWidth: '240px',
      },
    },
    title: {
      marginLeft: '10px',
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
    const _latest: IMemo[] = []
    const _common: IMemo[] = []
    memos.forEach((memo) => {
      if (new Date(Date.parse(memo.created)) > getAccessedTimestamp()) {
        _latest.push(memo)
      } else {
        _common.push(memo)
      }
    })
    setLatest(_latest)
    setCommon(_common)
  }, [memos])

  React.useEffect(() => {
    console.log(common)
    setIndexes(GetRandomIndexes(common))
  }, [common])

  return (
    <div>
      {latest.length > 0 ? (
        <div>
          <CardsGroup title={'Latest Added'} items={latest}></CardsGroup>
        </div>
      ) : (
        <></>
      )}
      <CardsGroup title={latest.length ? 'Common' : null} items={indexes} />
    </div>
  )
}

type CardsProps = {
  items: Array<IMemo>
  title: string | null
}
const CardsGroup: React.FC<CardsProps> = ({ items, title }: CardsProps) => {
  const classes = useStyles()
  return (
    <div>
      {title ? (
        <Typography variant="subtitle2" className={classes.title}>
          {title}
        </Typography>
      ) : (
        <></>
      )}
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
    </div>
  )
}

export default MemoList
