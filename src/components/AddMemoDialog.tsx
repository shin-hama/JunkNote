import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import { MemoContext } from './App'
import { MemosContext } from './ContentRegion'
import { IMemo, IMemoCreate, IMemoUpdate } from '../model/Memo'
import { PostMethod, PutMethod } from '../utility/ApiConnection'

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

const AddMemoDialog: React.FC = () => {
  const classes = useStyles()
  const { memo, setMemo } = React.useContext(MemoContext)
  const { memos, setMemos } = React.useContext(MemosContext)
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
      // TODO: Update memo when memo card is clicked that means memo.id !== -1
      if (memo.id === -1) {
        // Create new memo
        const memoParam: IMemoCreate = {
          containts: text,
          reference: '',
        }
        const params = { memo: memoParam }
        PostMethod('memos', null, params, (data: IMemo) => {
          setMemos([data, ...memos])
        })
      } else {
        const memoParam: IMemoUpdate = {
          containts: text,
          reference: '',
          isRemoved: false,
        }
        const params = { memo: memoParam }
        PutMethod(`memos/${memo.id}`, null, params, (data: IMemo) => {
          const updatedIndex = memos.findIndex((item) => item.id === data.id)
          memos[updatedIndex].containts = data.containts
          setMemos([...memos])
        })
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
      setText(memo.containts)
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
              console.log(e)
              if ((e.ctrlKey || e.metaKey) && e.code === 'Enter') {
                console.log('enter with ctrl')
                handleSave()
              }
            }}
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
