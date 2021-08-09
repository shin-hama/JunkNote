import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import AttachFileIcon from '@material-ui/icons/AttachFile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    grow: {
      flexGrow: 1,
    },
  })
)

type Props = {
  isOpen: boolean
  handleOpen: React.MouseEventHandler
}

function AddMemoDialog({ isOpen, handleOpen }: Props) {
  const classes = useStyles()

  return (
    <Dialog open={isOpen} onClose={handleOpen} maxWidth="sm" fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Memo"
          multiline
          minRows={4}
          maxRows={16}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <div className={classes.grow} />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Save Memo
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddMemoDialog
