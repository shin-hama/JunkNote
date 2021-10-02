import React from 'react'
import Container from '@mui/material/Container'

import AddButton from './AddButton'
import AddMemoDialog from './AddMemoDialog'
import { ContentKind, ContentKindContext } from '../pages/MainView'
import Memos from './MemoList'
import { DRAWER_WIDTH, TOKEN_KEY } from '../constants'
import { IMemo } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'
import { getAccessedTimestamp } from '../utility/AccessedTimestamp'
import { SortRandomly } from '../utility/utility'

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
const initMemosGroup = (): MemosGroup => {
  return {
    common: [],
    latest: [],
    pinned: [],
  }
}
const cloneMemosGroup = (org: MemosGroup): MemosGroup => {
  return {
    common: Array.from(org.common),
    latest: Array.from(org.latest),
    pinned: Array.from(org.pinned),
  }
}

type Action =
  | {
      type: 'add' | 'update' | 'remove'
      value: IMemo
    }
  | {
      type: 'new'
      newState: MemosGroup
    }

const AddMemo = (memosGroup: MemosGroup, newMemo: IMemo) => {
  if (newMemo.pinned) {
    memosGroup.pinned.push(newMemo)
  } else if (new Date(Date.parse(newMemo.created)) > getAccessedTimestamp()) {
    memosGroup.latest.push(newMemo)
  } else {
    memosGroup.common.push(newMemo)
  }
}

const RemoveMemo = (memosGroup: MemosGroup, target: IMemo): MemosGroup => {
  const result = Object.fromEntries(
    Object.entries(memosGroup).map(([key, val]) => [
      key,
      val.filter((item) => item.id !== target.id),
    ])
  ) as MemosGroup
  return result
}

const AssignMemos = (state: MemosGroup, action: Action) => {
  if (action.type === 'add') {
    const result = cloneMemosGroup(state)
    AddMemo(result, action.value)
    return result
  } else if (action.type === 'remove') {
    return RemoveMemo(state, action.value)
  } else if (action.type === 'update') {
    const result = RemoveMemo(state, action.value)
    AddMemo(result, action.value)
    return result
  } else if (action.type === 'new') {
    return action.newState
  } else {
    throw new Error('Not implemented error')
  }
}

const InitMemosGroup = (memos: IMemo[]): MemosGroup => {
  const initialValues = initMemosGroup()
  memos.forEach((memo) => {
    AddMemo(initialValues, memo)
  })
  return initialValues
}

interface MemosContextProps {
  memos: MemosGroup
  setMemos: React.Dispatch<Action>
}
export const MemosContext = React.createContext<MemosContextProps>({
  memos: initMemosGroup(),
  setMemos: () => {
    // no run
  },
})

type Props = {
  isDrawerOpen: boolean
}
const ContentRegion: React.FC<Props> = ({ isDrawerOpen }) => {
  const { kind } = React.useContext(ContentKindContext)

  const [memosGroup, setMemosGroup] = React.useReducer(
    AssignMemos,
    initMemosGroup()
  )

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

  const memosContextValue: MemosContextProps = {
    memos: memosGroup,
    setMemos: setMemosGroup,
  }

  return (
    <div>
      <MemosContext.Provider value={memosContextValue}>
        <MemoContext.Provider value={value}>
          <Container
            maxWidth="md"
            sx={
              isDrawerOpen
                ? {
                    width: 'auto',
                    flexGrow: 1,
                    paddingTop: (theme) => theme.spacing(3),
                    paddingBottom: (theme) => theme.spacing(3),
                    transition: (theme) =>
                      theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                      }),
                    '& .MuiContainer-maxWidthMd': {
                      maxWidth: '960px',
                    },
                  }
                : {
                    transition: (theme) =>
                      theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                      }),
                    paddingLeft: DRAWER_WIDTH,
                  }
            }>
            {kind === ContentKind.Home ? (
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
                  title={
                    memosGroup.latest.length || memosGroup.pinned.length
                      ? 'Common'
                      : ''
                  }
                  items={SortRandomly(memosGroup.common)}
                />
              </div>
            ) : (
              <div>
                <Memos
                  items={memosGroup.common.concat(
                    memosGroup.latest.concat(memosGroup.pinned)
                  )}
                />
              </div>
            )}
          </Container>
          {kind === ContentKind.Home ? <AddButton /> : <></>}
          <AddMemoDialog />
        </MemoContext.Provider>
      </MemosContext.Provider>
    </div>
  )
}

export default ContentRegion
