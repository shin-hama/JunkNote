import React from 'react'
import { styled } from '@mui/material/styles'

import ContentRegion from '../components/ContentRegion'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import { IMemo } from '../model/Memo'
import { setAccessedTimestamp } from '../utility/AccessedTimestamp'
import { IsDesktop } from '../utility/utility'

const Root = styled('div')(({ theme }) => ({
  height: '100vh',
}))

export const ContentKind = {
  Home: 'Home',
  Trash: 'Trash',
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ContentKindType = typeof ContentKind[keyof typeof ContentKind]

interface ContentKindProps {
  kind: ContentKindType
  setKind: React.Dispatch<React.SetStateAction<ContentKindType>>
}
export const ContentKindContext = React.createContext<ContentKindProps>({
  kind: ContentKind.Home,
  setKind: () => {
    // no run
  },
})

type QueryProps = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}
export const QueryContext = React.createContext<QueryProps>({
  query: '',
  setQuery: () => {
    // no run
  },
})

type SelectedMemosProps = {
  selectedMemos: IMemo[]
  setSelectedMemos: React.Dispatch<React.SetStateAction<IMemo[]>>
}
export const SelectedMemosContext = React.createContext<SelectedMemosProps>({
  selectedMemos: [],
  setSelectedMemos: () => {
    // no run
  },
})

export default function MainView() {
  const matches = IsDesktop()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(matches)

  const [kind, setKind] = React.useState<ContentKindType>(ContentKind.Home)
  const kindValue: ContentKindProps = {
    kind: kind,
    setKind: setKind,
  }

  const [query, setQuery] = React.useState('')
  const [selectedMemos, setSelectedMemos] = React.useState<IMemo[]>([])

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  React.useEffect(() => {
    setAccessedTimestamp(new Date())
  }, [])

  React.useEffect(() => {
    setIsDrawerOpen(matches)
  }, [matches])

  return (
    <Root>
      <QueryContext.Provider value={{ query, setQuery }}>
        <SelectedMemosContext.Provider
          value={{
            selectedMemos,
            setSelectedMemos,
          }}>
          <Header handleOpen={handleOpen} />
          <ContentKindContext.Provider value={kindValue}>
            <LeftDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} />
            <ContentRegion isDrawerOpen={isDrawerOpen} />
          </ContentKindContext.Provider>
        </SelectedMemosContext.Provider>
      </QueryContext.Provider>
    </Root>
  )
}
