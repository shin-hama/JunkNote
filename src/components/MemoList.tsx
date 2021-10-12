import React from 'react'
import Masonry from '@mui/lab/Masonry'
import MasonryItem from '@mui/lab/MasonryItem'

import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { Typography } from '@mui/material'

type MemosProps = {
  items: Array<IMemo>
  title?: string
}
const Memos: React.FC<MemosProps> = ({ items, title }) => {
  return (
    <div>
      {title ? (
        <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
          {title}
        </Typography>
      ) : (
        <></>
      )}
      <Masonry
        columns={3}
        spacing={1}
        sx={{ margin: (theme) => theme.spacing(2) }}>
        {items.map((item, i) => (
          <MasonryItem key={i}>
            <MemoCard memo={item} />
          </MasonryItem>
        ))}
      </Masonry>
    </div>
  )
}

export default Memos
