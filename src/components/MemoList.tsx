import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Masonry from '@mui/lab/Masonry'

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

  return (
    <div>
      {title ? (
        <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
          {title}
        </Typography>
      ) : (
        <></>
      )}
      <Masonry columns={isUpperSm ? 4 : 2} spacing={1}>
        {items.map((item, i) => (
          <MemoCard key={i} memo={item} />
        ))}
      </Masonry>
    </div>
  )
}

export default Memos
