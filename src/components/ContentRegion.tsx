import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import AddButton from './AddButton'
import MemoList from './MemoList'
import { DRAWER_WIDTH, TOKEN_KEY } from '../constants'
import { IMemos } from '../model/Memo'
import { GetMethod } from '../utility/ApiConnection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: 'auto',
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      '& .MuiContainer-maxWidthMd': {
        maxWidth: '960px',
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      paddingLeft: DRAWER_WIDTH,
    },
  })
)

type Props = {
  isDrawerOpen: boolean
}
const ContentRegion: React.FC<Props> = ({ isDrawerOpen }) => {
  const classes = useStyles()

  const [memos, setMemos] = React.useState<IMemos[]>([])

  React.useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      GetMethod('memos', null, (data: IMemos[]) => {
        setMemos(data)
      })
    }
  }, [])

  return (
    <div>
      <Container
        maxWidth="md"
        className={clsx(classes.content, {
          [classes.contentShift]: isDrawerOpen,
        })}>
        <MemoList memos={memos} />
      </Container>
      <AddButton />
    </div>
  )
}

export default ContentRegion
