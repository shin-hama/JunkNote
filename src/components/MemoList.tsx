import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
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
  const theme = useTheme()
  const isUpperSm = useMediaQuery(theme.breakpoints.up('sm'))
  console.log(isUpperSm)
  return (
    <div>
      {title ? (
        <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
          {title}
        </Typography>
      ) : (
        <></>
      )}
      <Masonry columns={isUpperSm ? 3 : 2} spacing={1}>
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
