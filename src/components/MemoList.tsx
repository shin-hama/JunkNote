import React from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Grid from '@mui/material/Grid'

import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
import { Typography } from '@mui/material'

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

type MemosProps = {
  items: Array<IMemo>
  title?: string
}
const Memos: React.FC<MemosProps> = ({ items, title }) => {
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

export default Memos
