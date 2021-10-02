import React from 'react'
import { alpha, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import DeleteIcon from '@mui/icons-material/Delete'
import HomeIcon from '@mui/icons-material/Home'

import { ContentKind, ContentKindContext } from '../pages/MainView'
import { DRAWER_WIDTH } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: 'transparent',
      borderRight: '0',
      width: DRAWER_WIDTH,
    },
    drawer: {
      width: DRAWER_WIDTH,
    },
    selectedDrawerItem: {
      backgroundColor: alpha(theme.palette.secondary.main, 0.35),
      '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.75),
      },
    },
  })
)

const DrawerItems = (): React.ReactElement => {
  const classes = useStyles()
  const { kind, setKind } = React.useContext(ContentKindContext)

  interface IItem {
    name: string
    icon: React.ReactElement
    class: string
    func: React.MouseEventHandler
  }
  const items: Array<IItem> = [
    {
      name: 'Home',
      icon: <HomeIcon />,
      class: kind === ContentKind.Home ? classes.selectedDrawerItem : '',
      func: () => {
        setKind(ContentKind.Home)
      },
    },
    {
      name: 'Trash',
      icon: <DeleteIcon />,
      class: kind === ContentKind.Trash ? classes.selectedDrawerItem : '',
      func: () => {
        setKind(ContentKind.Trash)
      },
    },
  ]

  return (
    <div role="presentation">
      <List>
        {items.map((item) => (
          <ListItem button key={item.name} onClick={item.func} className={item.class}>
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
  const classes = useStyles()

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      elevation={0}
      classes={{ paper: classes.paper }}
      className={classes.drawer}
    >
      <Toolbar />
      {DrawerItems()}
    </Drawer>
  )
}

export default LeftDrawer
