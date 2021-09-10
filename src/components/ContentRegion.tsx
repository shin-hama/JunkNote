import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import AddButton from './AddButton'
import AddMemoDialog from './AddMemoDialog'
import { ContentKind, ContentKindContext } from './App'
import MemoList from './MemoList'
import { DRAWER_WIDTH, TOKEN_KEY } from '../constants'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

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

interface MemosProps {
  memos: IMemo[]
  setMemos: React.Dispatch<React.SetStateAction<IMemo[]>>
}
export const MemosContext = React.createContext<MemosProps>({
  memos: [],
  setMemos: () => {
    // no run
  },
})

type Props = {
  isDrawerOpen: boolean
}
const ContentRegion: React.FC<Props> = ({ isDrawerOpen }) => {
  const classes = useStyles()

  const [memos, setMemos] = React.useState<IMemo[]>([])
  const contextValue = {
    memos: memos,
    setMemos: setMemos,
  }

  const { kind } = React.useContext(ContentKindContext)

  React.useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      const props: ApiProps = {
        method: 'get',
        endpoint: 'memos',
        query: { removed: kind === ContentKind.Trash },
        callback: (data: IMemo[]) => {
          setMemos(data)
        },
      }
      ConnectApi(props)
    }
  }, [kind])

  return (
    <div>
      <MemosContext.Provider value={contextValue}>
        <Container
          maxWidth="md"
          className={clsx(classes.content, {
            [classes.contentShift]: isDrawerOpen,
          })}>
          {memos.length > 0 ? <MemoList /> : <></>}
        </Container>
        <AddButton />
        <AddMemoDialog />
      </MemosContext.Provider>
    </div>
  )
}

export default ContentRegion
