import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { IsDialogOpen } from './App'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
  })
)

type Props = { text: string }
const MemoCard: React.FC<Props> = ({ text }) => {
  const classes = useStyles()
  const { isDialogOpen, setIsDialogOpen } = React.useContext(IsDialogOpen)
  const handleOpen = () => {
    setIsDialogOpen(!isDialogOpen)
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
