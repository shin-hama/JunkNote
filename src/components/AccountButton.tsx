import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SignInDialog from './SignInDialog'
import Typography from '@material-ui/core/Typography'

import { GetMethod } from '../utility/ApiConnection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      '& .MuiPaper-root': {
        border: '1px solid #d3d4d5',
      },
    },
  })
)

type UserStates = {
  username: string
  email: string
  created: string
}

const AccountButton = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [buttonText, setButtonText] = React.useState('')
  const [user, setUser] = React.useState<UserStates | null>(null)
  const [isOpenMenu, setIsOpenMenu] = React.useState(false)
  const [isOpenSignIn, setIsOpenSignIn] = React.useState(false)
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget)
      setIsOpenMenu(true)
    } else {
      setIsOpenSignIn(true)
    }
  }

  const handleClose = () => {
    setIsOpenMenu(false)
  }

  const getCurrentUser = () => {
    GetMethod('users/me', null, (data: UserStates) => {
      setUser(data)
      // TODO: Save new token
    })
  }

  const signOut = () => {
    window.localStorage.removeItem('myBearerToken')
    window.location.reload()
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('myBearerToken')
    if (token) {
      getCurrentUser()
    }
  }, [])

  React.useEffect(() => {
    setButtonText(user ? user.username : 'Sign in')
  }, [user])

  return (
    <div>
      <Button onClick={handleButtonClick} variant="contained">
        <Typography variant="button">{buttonText}</Typography>
      </Button>
      <SignInDialog isOpen={isOpenSignIn} setIsOpen={setIsOpenSignIn} />
      <Menu
        open={isOpenMenu}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        elevation={0}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.menu}>
        <MenuItem button={false}>
          <Typography>Signed in as {user?.username}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem button onClick={signOut}>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AccountButton
