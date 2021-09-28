import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import ContentRegion from '../components/ContentRegion'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import { setAccessedTimestamp } from '../utility/AccessedTimestamp'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
  })
)

export const ContentKind = {
  Home: 0,
  Trash: 1,
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
type ContentKind = typeof ContentKind[keyof typeof ContentKind]

interface ContentKindProps {
  kind: ContentKind
  setKind: React.Dispatch<React.SetStateAction<ContentKind>>
}
export const ContentKindContext = React.createContext<ContentKindProps>({
  kind: ContentKind.Home,
  setKind: () => {
    // no run
  },
})

type Props = { handleTheme: React.MouseEventHandler }
export default function MainView({ handleTheme }: Props) {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true)

  const [kind, setKind] = React.useState<ContentKind>(ContentKind.Home)
  const kindValue: ContentKindProps = {
    kind: kind,
    setKind: setKind,
  }

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  React.useEffect(() => {
    setAccessedTimestamp(new Date())
  }, [])

  return (
    <div className={classes.root}>
      <Header handleOpen={handleOpen} handleTheme={handleTheme} />
      <ContentKindContext.Provider value={kindValue}>
        <LeftDrawer open={isDrawerOpen} />
        <ContentRegion isDrawerOpen={isDrawerOpen} />
      </ContentKindContext.Provider>
    </div>
  )
}
