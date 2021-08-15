import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { IsDialogOpen } from './App'
import { MemoFactory } from '../model/Memo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
  })
)

type Props = { text: string; id: number; }
const MemoCard: React.FC<Props> = ({ text, id }) => {
  const classes = useStyles()
  const { setMemo } = React.useContext(IsDialogOpen)
  const handleOpen = () => {
    setMemo(MemoFactory({id: id, text: text}))
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MemoCard
