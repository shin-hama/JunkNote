import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import SignInDialog from './SignInDialog'
import { UserStates } from '../model/User'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      '& .MuiPaper-root': {
        border: '1px solid #d3d4d5',
      },
    },
  })
)

type Props = {
  user: UserStates
  menuProps: MenuProps
}
const AccountMenu = ({ user, menuProps }: Props) => {
  const classes = useStyles()

  const signOut = () => {
    window.localStorage.removeItem('myBearerToken')
    window.location.reload()
  }

  return (
    <Menu
      getContentAnchorEl={null}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.menu}
      {...menuProps}>
      <MenuItem button={false}>
        <Typography>Signed in as {user?.username}</Typography>
      </MenuItem>
      <Divider />
      <MenuItem button onClick={signOut}>
        Sign out
      </MenuItem>
    </Menu>
  )
}

type AccountProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  anchorEl: HTMLButtonElement | null
  user: UserStates | null
}
const AccountComponent = ({
  isOpen,
  setIsOpen,
  anchorEl,
  user,
}: AccountProps) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  return user ? (
    <AccountMenu
      user={user}
      menuProps={{
        open: isOpen,
        onClose: handleClose,
        anchorEl: anchorEl,
      }}
    />
  ) : (
    <SignInDialog open={isOpen} onClose={handleClose} />
  )
}

export default AccountComponent
