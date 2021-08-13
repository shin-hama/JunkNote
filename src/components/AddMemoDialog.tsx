import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import { IsDialogOpen } from './App'

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
  onUpdate: CallableFunction
}
function AddMemoDialog({ onUpdate }: Props) {
  const classes = useStyles()
  const { isDialogOpen, setIsDialogOpen } = React.useContext(IsDialogOpen)
  const [text, setText] = React.useState('')
  const handleOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSave = () => {
    setIsDialogOpen(!isDialogOpen)
    onUpdate(text)
    setText('')
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleOpen} maxWidth="sm" fullWidth>
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
            value={text}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <div className={classes.grow} />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Memo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddMemoDialog
