import React from 'react'
import Grid from '@mui/material/Grid'

import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { Typography } from '@mui/material'

// item: {
//   marginTop: '5px',
//   marginBottom: '5px',
//   '& .MuiGrid-root': {
//     minWidth: '240px',
//   },
// },

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
      <Grid
        container
        justifyContent="flex-start"
        spacing={2}
        sx={{
          marginTop: '5px',
          marginBottom: '5px',
          '& .MuiGrid-root': {
            minWidth: '240px',
          },
        }}>
        {items.map((item, i) => (
          <Grid key={i} item xs={6} sm={4} md={4}>
            <MemoCard memo={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Memos
