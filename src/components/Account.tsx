import React from 'react'
import Divider from '@mui/material/Divider'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import SignInDialog from './SignInDialog'
import SignUpDialog from './SignUpDialog'
import { UserStates } from '../model/User'

type ContextProps = React.Dispatch<React.SetStateAction<boolean>>
export const SetSignUpDialogOpen = React.createContext<ContextProps>(() => {
  // no run
})

type Props = {
  user: UserStates
  menuProps: MenuProps
}
const AccountMenu = ({ user, menuProps }: Props) => {
  const signOut = () => {
    window.localStorage.removeItem('myBearerToken')
    window.location.reload()
  }

  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiPaper-root': {
          border: '1px solid #d3d4d5',
        },
      }}
      {...menuProps}>
      <MenuItem>
        <Typography>Signed in as {user.username}</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={signOut}>Sign out</MenuItem>
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
  const [signUpDialogOpen, setSignUpDialogOpen] = React.useState<boolean>(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSignUpDialogClose = () => {
    setSignUpDialogOpen(false)
  }

  React.useEffect(() => {
    if (signUpDialogOpen) {
      setIsOpen(false)
    }
  }, [signUpDialogOpen, setIsOpen])

  return (
    <SetSignUpDialogOpen.Provider value={setSignUpDialogOpen}>
      {user ? (
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
      )}
      <SignUpDialog open={signUpDialogOpen} onClose={handleSignUpDialogClose} />
    </SetSignUpDialogOpen.Provider>
  )
}

export default AccountComponent
