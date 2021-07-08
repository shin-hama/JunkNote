import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

type Props = { text: string }
const MemoCard: React.FC<Props> = ({ text }) => {
  return (
    <Card>
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  )
}

export default MemoCard
