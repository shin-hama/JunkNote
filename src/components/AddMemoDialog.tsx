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
import { IMemos, IMemoCreate } from '../model/Memo'
import { PostMethod } from '../utility/ApiConnection'

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
  const { memo, setMemo } = React.useContext(IsDialogOpen)
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState('')
  const handleClose = () => {
    setMemo(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSave = () => {
    if (memo !== null) {
      const memoParam: IMemoCreate = {
        containts: text,
        reference: '',
      }
      const params = { memo: memoParam }

      PostMethod('memos', null, params, (data: IMemos) => {
        console.log(data)
        onUpdate(data)
      })
    }
    setMemo(null)
    setText('')
  }

  React.useEffect(() => {
    if (memo === null) {
      setIsOpen(false)
      setText('')
    } else {
      setText(memo.text)
      setIsOpen(true)
    }
  }, [memo])

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
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
