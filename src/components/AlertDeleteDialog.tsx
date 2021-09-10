import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

type Props = {
  open: boolean
  okCallback: CallableFunction
  cancelCallback: CallableFunction
}
const AlertDeleteDialog: React.FC<Props> = ({
  open,
  okCallback,
  cancelCallback,
}) => {
  const handleOk = () => {
    okCallback(false)
  }
  const handleCancel = () => {
    cancelCallback(false)
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{'Warning'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your memos will be completely erased, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDeleteDialog
