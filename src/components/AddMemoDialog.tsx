import React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Tooltip from '@mui/material/Tooltip'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import { MemoContext, MemosContext } from './ContentRegion'
import { IMemo, IMemoCreate } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

const FlexDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
}))

const AddMemoDialog: React.FC = () => {
  const { memo, setMemo } = React.useContext(MemoContext)
  const { setMemos } = React.useContext(MemosContext)
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
      if (memo.id === -1) {
        // Create new memo
        const memoParam: IMemoCreate = {
          contents: text,
          reference: '',
        }
        const params = { memo: memoParam }
        const props: ApiProps<IMemo> = {
          method: 'post',
          endpoint: `memos`,
          data: params,
          callback: (data: IMemo) => {
            setMemos({ type: 'add', value: data })
          },
        }
        ConnectApi(props)
      } else {
        memo.contents = text
        const props: ApiProps<IMemo> = {
          method: 'put',
          endpoint: `memos/${memo.id}`,
          data: { memo: memo },
          callback: (data: IMemo) => {
            setMemos({ type: 'update', value: data })
          },
        }
        ConnectApi(props)
      }
    }
    setMemo(null)
    setText('')
  }

  React.useEffect(() => {
    if (memo === null) {
      setIsOpen(false)
      setText('')
    } else {
      setText(memo.contents)
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
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.code === 'Enter') {
                handleSave()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton size="large">
            <AttachFileIcon />
          </IconButton>
          <FlexDiv />
          <Tooltip title="Save memo (Ctrl + Enter)" placement="top">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Memo
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddMemoDialog
