import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'

export default function LeftDrawer() {
  return (
    <Drawer variant="persistent" anchor="left" open={true}>
      <Toolbar />
      <List>
        <ListItem>
          <Button>test</Button>
        </ListItem>
      </List>
    </Drawer>
  )
}
