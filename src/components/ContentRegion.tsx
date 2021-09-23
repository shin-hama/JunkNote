import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import AddButton from './AddButton'
import AddMemoDialog from './AddMemoDialog'
import { ContentKind, ContentKindContext } from './App'
import Memos from './MemoList'
import { DRAWER_WIDTH, TOKEN_KEY } from '../constants'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'
import { getAccessedTimestamp } from '../utility/AccessedTimestamp'
import { SortRandomly } from '../utility/utility'

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

interface MemoContextProps {
  memo: IMemo | null
  setMemo: React.Dispatch<React.SetStateAction<IMemo | null>>
}
export const MemoContext = React.createContext<MemoContextProps>({
  memo: null,
  setMemo: () => {
    // no run
  },
})

type MemosGroup = {
  common: Array<IMemo>
  latest: Array<IMemo>
  pinned: Array<IMemo>
}
const initialMemosGroup: MemosGroup = {
  common: [],
  latest: [],
  pinned: [],
}
type Action = {
  type: 'pin' | 'remove' | 'add' | 'new'
  newValue?: IMemo
  newState?: MemosGroup
}

const AssignMemos = (state: MemosGroup, action: Action) => {
  if (action.type === 'pin') {
    return state
  } else if (action.type === 'remove') {
    throw new Error('Not implemented error')
  } else if (action.type === 'new') {
    return action.newState ?? initialMemosGroup
  } else {
    throw new Error('Not implemented error')
  }
}

const InitMemosGroup = (memos: IMemo[]): MemosGroup => {
  const _pinned: IMemo[] = []
  const _latest: IMemo[] = []
  const _common: IMemo[] = []
  memos.forEach((memo) => {
    if (memo.pinned) {
      _pinned.push(memo)
    } else if (new Date(Date.parse(memo.created)) > getAccessedTimestamp()) {
      _latest.push(memo)
    } else {
      _common.push(memo)
    }
  })
  return {
    common: _common,
    latest: _latest,
    pinned: _pinned,
  }
}

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

  const { kind } = React.useContext(ContentKindContext)

  const [memosGroup, setMemosGroup] = React.useReducer(AssignMemos, initialMemosGroup)

  const [indexes, setIndexes] = React.useState<IMemo[]>([])

  React.useEffect(() => {
    setIndexes(SortRandomly(memosGroup.common))
  }, [memosGroup.common])

  React.useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      const props: ApiProps<IMemo[]> = {
        method: 'get',
        endpoint: 'memos',
        query: { removed: kind === ContentKind.Trash },
        callback: (data: IMemo[]) => {
          setMemosGroup({ type: 'new', newState: InitMemosGroup(data) })
        },
      }

      ConnectApi(props)
    }
  }, [kind])

  const [memo, setMemo] = React.useState<IMemo | null>(null)
  const value: MemoContextProps = {
    memo: memo,
    setMemo: setMemo,
  }

  const [memos, setMemos] = React.useState<IMemo[]>([])
  const contextValue = {
    memos: memos,
    setMemos: setMemos,
  }

  return (
    <div>
      <MemosContext.Provider value={contextValue}>
        <MemoContext.Provider value={value}>
          <Container
            maxWidth="md"
            className={clsx(classes.content, {
              [classes.contentShift]: isDrawerOpen,
            })}
          >
            <div>
              {memosGroup.pinned.length > 0 ? (
                <div>
                  <Memos title={'Pinned'} items={memosGroup.pinned} />
                </div>
              ) : (
                <></>
              )}
              {memosGroup.latest.length > 0 ? (
                <div>
                  <Memos title={'Latest Added'} items={memosGroup.latest} />
                </div>
              ) : (
                <></>
              )}
              <Memos
                title={memosGroup.latest.length || memosGroup.pinned.length ? 'Common' : null}
                items={indexes}
              />
            </div>{' '}
          </Container>
          {kind === ContentKind.Home ? <AddButton /> : <></>}
          <AddMemoDialog />
        </MemoContext.Provider>
      </MemosContext.Provider>
    </div>
  )
}

export default ContentRegion
