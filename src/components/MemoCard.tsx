import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import PushPinOutlinedIcon from '@material-ui/icons/PushPinOutlined'

import { IsDialogOpen } from './App'
import { MemoFactory } from '../model/Memo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
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

type Props = { text: string; id: number }
const MemoCard: React.FC<Props> = ({ text, id }) => {
  const classes = useStyles()
  const [isOver, setIsOver] = React.useState(false)
  const { setMemo } = React.useContext(IsDialogOpen)
  const handleOpen = () => {
    setMemo(MemoFactory({ id: id, text: text }))
  }

  const handleMouseEnter = () => {
    setIsOver(true)
  }
  const handleMouseLeave = () => {
    setIsOver(false)
  }

  const handleDelete = (event: React.MouseEvent) => {
    console.log('Push pin is clicked')
    event.stopPropagation()
  }

  return (
    <Card
      className={classes.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
      </CardActionArea>
      <Fab
        aria-label="delete"
        color="inherit"
        onClick={handleDelete}
        size="small"
        className={clsx(classes.fab, {
          [classes.hidden]: !isOver,
        })}>
        <PushPinOutlinedIcon fontSize="small" />
      </Fab>
    </Card>
  )
}

export default MemoCard
