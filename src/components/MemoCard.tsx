import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
  })
)

type Props = { text: string }
const MemoCard: React.FC<Props> = ({ text }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  )
}

export default MemoCard
