import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { MemoContext } from './ContentRegion'
import { MemoFactory } from '../model/Memo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
  })
)

function AddButton() {
  const classes = useStyles()
  const { setMemo } = React.useContext(MemoContext)
  const handleOpen = () => {
    setMemo(MemoFactory({}))
  }

  return (
    <div className={classes.root}>
      <Fab color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default AddButton
