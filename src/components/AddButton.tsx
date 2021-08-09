import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
  })
)

type Props = {
  onClick: React.MouseEventHandler
}
function AddButton({onClick}: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default AddButton
