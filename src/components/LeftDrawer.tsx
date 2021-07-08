import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import DeleteIcon from '@material-ui/icons/Delete'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.primary.main,
    },
    list: {
      width: 200,
    },
  })
)

const DrawerItems = (): React.ReactElement => {
  const classes = useStyles()
  const items: { [s: string]: React.ReactElement } = {
    Home: <HomeIcon />,
    Trash: <DeleteIcon />,
  }

  return (
    <div className={classes.list} role="presentation">
      <List>
        {Object.entries(items).map(([name, icon]) => (
          <ListItem button key={name}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} color="inherit" />
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
      classes={{ paper: classes.paper }}>
      <Toolbar />
      {DrawerItems()}
    </Drawer>
  )
}

export default LeftDrawer
