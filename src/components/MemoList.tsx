import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { ContentKind, ContentKindContext } from './App'
import { MemosContext } from './ContentRegion'
import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { SortRandomly } from '../utility/utility'
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
  const [pinned, setPinned] = React.useState<IMemo[]>([])
  const [latest, setLatest] = React.useState<IMemo[]>([])
  // const [pinned, setPinned] = React.useState<IMemo[]>([])
  const [common, setCommon] = React.useState<IMemo[]>([])
  const { kind } = React.useContext(ContentKindContext)

  React.useEffect(() => {
    if (kind === ContentKind.Home) {
      const _pinned: IMemo[] = []
      const _latest: IMemo[] = []
      const _common: IMemo[] = []
      memos.forEach((memo) => {
        if (memo.pinned) {
          _pinned.push(memo)
        } else if (new Date(Date.parse(memo.created)) > getAccessedTimestamp()) {
          _latest.push(memo)
        } else {
          _common.push(memo)
        }
      })
      setPinned(_pinned)
      setLatest(_latest)
      setCommon(_common)
    } else {
      setCommon(memos)
    }
  }, [kind, memos])

  React.useEffect(() => {
    setIndexes(SortRandomly(common))
  }, [common])

  return (
    <div>
      {pinned.length > 0 ? (
        <div>
          <CardsGroup title={'Pinned'} items={pinned}></CardsGroup>
        </div>
      ) : (
        <></>
      )}
      {latest.length > 0 ? (
        <div>
          <CardsGroup title={'Latest Added'} items={latest}></CardsGroup>
        </div>
      ) : (
        <></>
      )}
      <CardsGroup title={latest.length || pinned.length ? 'Common' : null} items={indexes} />
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
      <Grid container justifyContent="flex-start" spacing={2} className={classes.item}>
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
