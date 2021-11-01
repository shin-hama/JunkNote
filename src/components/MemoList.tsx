import React from 'react'
import Masonry from '@mui/lab/Masonry'
import Typography from '@mui/material/Typography'

import AlertDialog from './AlertDialog'
import { MemosContext } from './ContentRegion'
import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

type MemosProps = {
  items: Array<IMemo>
  title?: string
}
const Memos: React.FC<MemosProps> = ({ items, title }) => {
  const [targetMemo, setTargetMemo] = React.useState<IMemo | null>(null)
  const { setMemos } = React.useContext(MemosContext)

  const handleAlertOk = () => {
    if (targetMemo) {
      const props: ApiProps = {
        endpoint: `/memos/${targetMemo.id}`,
        method: 'delete',
        callback: () => setMemos({ type: 'remove', value: targetMemo }),
      }
      ConnectApi(props)
    }
    handleAlertClose()
  }

  const handleAlertOpen = (memo: IMemo) => {
    setTargetMemo(memo)
  }

  const handleAlertClose = () => {
    setTargetMemo(null)
  }

  if (items.length === 0) {
    return <></>
  }
  return (
    <div>
      {title ? (
        <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
          {title}
        </Typography>
      ) : (
        <></>
      )}
      <Masonry columns={{ md: 4, sm: 2 }} spacing={1}>
        {items.map((item, i) => (
          <MemoCard key={i} memo={item} handleAlertOpen={handleAlertOpen} />
        ))}
      </Masonry>

      <AlertDialog
        open={targetMemo !== null}
        message="Do you want to delete the note completely?"
        okCallback={handleAlertOk}
        cancelCallback={handleAlertClose}
      />
    </div>
  )
}

export default Memos
