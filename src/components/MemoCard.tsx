import React from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

import AlertDialog from './AlertDialog'
import { ContentKind, ContentKindContext } from '../pages/MainView'
import { MemoContext, MemosContext } from './ContentRegion'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
      '&:hover': {
        border: 'solid 1px dimgray',
        margin: '-1px',
      },
    },
    actionArea: {
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
    focusHighlight: {
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    fab: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    hidden: {
      display: 'none',
    },
  })
)

const updateMemo = (updated: IMemo, callback?: () => void) => {
  const props: ApiProps = {
    endpoint: `/memos/${updated.id}`,
    method: 'put',
    data: { memo: updated },
    callback: callback,
  }
  ConnectApi(props)
}

type Props = { memo: IMemo }
const MemoCard: React.FC<Props> = ({ memo }) => {
  const classes = useStyles()
  const [isMouseOver, setIsMouseOver] = React.useState(false)
  const [alertOpen, setAlertOpen] = React.useState(false)
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
      setAlertOpen(true)
    } else {
      memo.removed = true
      updateMemo(memo, () => setMemos({ type: 'remove', value: memo }))
    }
  }

  const handleAlertOk = () => {
    const props: ApiProps = {
      endpoint: `/memos/${memo.id}`,
      method: 'delete',
      callback: () => setMemos({ type: 'remove', value: memo }),
    }
    ConnectApi(props)
    setAlertOpen(false)
  }

  const handleAlertCancel = () => {
    setAlertOpen(false)
  }

  return (
    <div>
      <Card
        className={classes.card}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardActionArea
          onClick={handleCardClicked}
          classes={{
            root: classes.actionArea,
            focusHighlight: classes.focusHighlight,
          }}
        >
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
              className={classes.fab}
            >
              <PushPinOutlinedIcon fontSize="small" />
            </Fab>
          </div>
        ) : (
          <></>
        )}
      </Card>
      <AlertDialog
        open={alertOpen}
        message="Do you want to delete the note completely?"
        okCallback={handleAlertOk}
        cancelCallback={handleAlertCancel}
      />
    </div>
  )
}

export default MemoCard
