import React from 'react'
import { useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'

import { ContentKind, ContentKindContext } from '../pages/MainView'
import { MemoContext, MemosContext } from './ContentRegion'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'
import useLongPress from '../hooks/useLongPress'

const updateMemo = (updated: IMemo, callback?: () => void) => {
  const props: ApiProps = {
    endpoint: `/memos/${updated.id}`,
    method: 'put',
    data: { memo: updated },
    callback: callback,
  }
  ConnectApi(props)
}

type Props = {
  memo: IMemo
  handleAlertOpen: (memo: IMemo) => void
  setSelectedMemos: React.Dispatch<React.SetStateAction<IMemo[]>>
}
const MemoCard: React.FC<Props> = ({
  memo,
  handleAlertOpen,
  setSelectedMemos,
}) => {
  const theme = useTheme()
  const [isMouseOver, setIsMouseOver] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
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

  const onLongPress = () => {
    setSelected(!selected)
    console.log('long press is triggered')
  }
  React.useEffect(() => {
    if (selected) {
      setSelectedMemos((prev) => Array.from(new Set([...prev, memo])))
    } else {
      setSelectedMemos((prev) => prev.filter((item) => item !== memo))
    }
  }, [setSelectedMemos, memo, selected])
  const onClick = () => {
    handleCardClicked()
    console.log('click is triggered')
  }
  const longPressEvent = useLongPress(onLongPress, onClick, {
    shouldPreventDefault: true,
    delay: 400,
  })
  // const handleDeleteButton = () => {
  //   if (kind === ContentKind.Trash) {
  //     handleAlertOpen(memo)
  //   } else {
  //     memo.removed = true
  //     updateMemo(memo, () => setMemos({ type: 'remove', value: memo }))
  //   }
  // }

  return (
    <Card
      sx={{
        position: 'relative',
        border: selected
          ? `solid 2px ${theme.palette.primary.main}`
          : 'solid 2px transparent',
        '&:hover': {
          border: selected ? '' : 'solid 2px dimgray',
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CardActionArea
        {...longPressEvent}
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
      <Fab
        aria-label="delete"
        color="inherit"
        onClick={handlePinClicked}
        size="small"
        disabled={!isMouseOver}
        sx={{
          position: 'absolute',
          top: (theme) => theme.spacing(0.5),
          right: (theme) => theme.spacing(0.5),
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(1, 0, 0, 0.1)',
          },
          '&.Mui-disabled': {
            display: 'none',
          },
        }}>
        <PushPinOutlinedIcon fontSize="small" />
      </Fab>
    </Card>
  )
}

export default MemoCard
