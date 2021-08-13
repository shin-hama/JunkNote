import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Create from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import HomeIcon from '@material-ui/icons/Home'

import { DRAWER_WIDTH } from '../constants'
import { IsDialogOpen } from './App'

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
    drawerItem: {},
  })
)

const DrawerItems = (): React.ReactElement => {
  const { isDialogOpen, setIsDialogOpen } = React.useContext(IsDialogOpen)
  const handleOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  interface IItem {
    name: string
    icon: React.ReactElement
    func: React.MouseEventHandler
  }
  const items: Array<IItem> = [
    {
      name: 'Add Memo',
      icon: <Create />,
      func: handleOpen,
    },
    {
      name: 'Home',
      icon: <HomeIcon />,
      func: () => {
        /* not implemented */
      },
    },
    {
      name: 'Trash',
      icon: <DeleteIcon />,
      func: () => {
        /* not implemented */
      },
    },
  ]

  return (
    <div role="presentation">
      <List>
        {items.map((item) => (
          <ListItem button key={item.name} onClick={item.func}>
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
      className={classes.drawer}>
      <Toolbar />
      {DrawerItems()}
    </Drawer>
  )
}

export default LeftDrawer
