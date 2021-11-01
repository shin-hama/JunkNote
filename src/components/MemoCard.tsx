import React from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

import { ContentKind, ContentKindContext } from '../pages/MainView'
import { MemoContext, MemosContext } from './ContentRegion'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

const updateMemo = (updated: IMemo, callback?: () => void) => {
  const props: ApiProps = {
    endpoint: `/memos/${updated.id}`,
    method: 'put',
    data: { memo: updated },
    callback: callback,
  }
  ConnectApi(props)
}

type Props = { memo: IMemo; handleAlertOpen: (memo: IMemo) => void }
const MemoCard: React.FC<Props> = ({ memo, handleAlertOpen }) => {
  const [isMouseOver, setIsMouseOver] = React.useState(false)
  const { setMemos } = React.useContext(MemosContext)
  const { kind } = React.useContext(ContentKindContext)
  const { setMemo } = React.useContext(MemoContext)
  const handleCardClicked = () => {
    if (kind === ContentKind.Home) {
      setMemo(memo)
    }
  }

  const handleMouseEnter = () => {
    setIsMouseOver(true)
  }
  const handleMouseLeave = () => {
    setIsMouseOver(false)
  }

  const handlePinClicked = (event: React.MouseEvent) => {
    memo.pinned = !memo.pinned
    updateMemo(memo, () => {
      setMemos({ type: 'update', value: memo })
    })

    // Prevent click events from going to layers below the icon
    event.stopPropagation()
  }

  const handleDeleteButton = () => {
    if (kind === ContentKind.Trash) {
      handleAlertOpen(memo)
    } else {
      memo.removed = true
      updateMemo(memo, () => setMemos({ type: 'remove', value: memo }))
    }
  }

  return (
    <Card
      sx={{
        position: 'relative',
        margin: '1px',
        '&:hover': {
          border: 'solid 1px dimgray',
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CardActionArea
        onClick={handleCardClicked}
        sx={{
          root: {
            '&:hover $focusHighlight': {
              opacity: 0,
            },
          },
          focusHighlight: {
            transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },
        }}>
        <CardContent>
          <Typography display="inline" style={{ whiteSpace: 'pre-line' }}>
            {memo.contents}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isMouseOver ? (
        <div>
          <CardActions>
            <IconButton size="small" onClick={handleDeleteButton}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </CardActions>
          <Fab
            aria-label="delete"
            color="inherit"
            onClick={handlePinClicked}
            size="small"
            sx={{
              position: 'absolute',
              top: (theme) => theme.spacing(0.5),
              right: (theme) => theme.spacing(0.5),
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}>
            <PushPinOutlinedIcon fontSize="small" />
          </Fab>
        </div>
      ) : (
        <></>
      )}
    </Card>
  )
}

export default MemoCard
