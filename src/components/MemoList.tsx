import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MemoCard from './MemoCard'
import { IMemo } from '../model/Memo'
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
