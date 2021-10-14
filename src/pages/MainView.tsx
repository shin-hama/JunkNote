import React from 'react'
import { styled } from '@mui/material/styles'

import ContentRegion from '../components/ContentRegion'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import { setAccessedTimestamp } from '../utility/AccessedTimestamp'

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

type Props = { handleTheme: React.MouseEventHandler }
export default function MainView({ handleTheme }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true)

  const [kind, setKind] = React.useState<ContentKindType>(ContentKind.Home)
  const kindValue: ContentKindProps = {
    kind: kind,
    setKind: setKind,
  }

  const [query, setQuery] = React.useState('')

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  React.useEffect(() => {
    setAccessedTimestamp(new Date())
  }, [])

  return (
    <Root>
      <QueryContext.Provider value={{ query, setQuery }}>
        <Header handleOpen={handleOpen} handleTheme={handleTheme} />
        <ContentKindContext.Provider value={kindValue}>
          <LeftDrawer open={isDrawerOpen} />
          <ContentRegion isDrawerOpen={isDrawerOpen} />
        </ContentKindContext.Provider>
      </QueryContext.Provider>
    </Root>
  )
}
