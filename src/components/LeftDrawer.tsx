import React from 'react'
import { alpha } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import DeleteIcon from '@mui/icons-material/Delete'
import HomeIcon from '@mui/icons-material/Home'

import {
  ContentKind,
  ContentKindType,
  ContentKindContext,
} from '../pages/MainView'
import { DRAWER_WIDTH } from '../constants'

const DrawerItems = (): React.ReactElement => {
  const { kind, setKind } = React.useContext(ContentKindContext)

  interface IItem {
    name: ContentKindType
    icon: React.ReactElement
    func: React.MouseEventHandler
  }
  const items: Array<IItem> = [
    {
      name: ContentKind.Home,
      icon: <HomeIcon />,
      func: () => {
        setKind(ContentKind.Home)
      },
    },
    {
      name: ContentKind.Trash,
      icon: <DeleteIcon />,
      func: () => {
        setKind(ContentKind.Trash)
      },
    },
  ]

  return (
    <div role="presentation">
      <List>
        {items.map((item) => (
          <ListItem
            button
            key={item.name}
            onClick={item.func}
            sx={
              kind === item.name
                ? {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.secondary.main, 0.35),
                    '&:hover': {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.secondary.main, 0.75),
                    },
                  }
                : {}
            }>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} color="inherit" />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

type Props = {
  open: boolean
}
const LeftDrawer: React.FC<Props> = ({ open }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      elevation={0}
      sx={{
        paper: {
          background: 'transparent',
          borderRight: '0',
          width: DRAWER_WIDTH,
        },
        width: DRAWER_WIDTH,
      }}>
      <Toolbar />
      {DrawerItems()}
    </Drawer>
  )
}

export default LeftDrawer
