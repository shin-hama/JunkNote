import PropTypes from 'prop-types'
import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

type MemoCardProps = { text: string };
const MemoCard = ({ text }: MemoCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          {text}test
        </Typography>
      </CardContent>
    </Card>
  )
}
MemoCard.propTypes = {
  text: PropTypes.string
}

export default MemoCard
