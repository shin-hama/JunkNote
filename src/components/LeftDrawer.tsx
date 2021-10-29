import React from 'react'
import { alpha } from '@mui/material/styles'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import DeleteIcon from '@mui/icons-material/Delete'
import HomeIcon from '@mui/icons-material/Home'

import { IsMobile } from '../utility/utility'

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

type ResponsiveDrawerProps = DrawerProps
const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({ ...props }) => {
  const matches = IsMobile()
  return (
    <Drawer
      {...props}
      variant={matches ? 'persistent' : 'temporary'}
      anchor="left"
      elevation={0}
      sx={{
        '& .MuiDrawer-paper': {
          borderRight: 'none',
          width: DRAWER_WIDTH,
        },
        width: DRAWER_WIDTH,
      }}></Drawer>
  )
}

type Props = {
  open: boolean
}
const LeftDrawer: React.FC<Props> = ({ open }) => {
  return (
    <ResponsiveDrawer open={open}>
      <Toolbar />
      {DrawerItems()}
    </ResponsiveDrawer>
  )
}

export default LeftDrawer
