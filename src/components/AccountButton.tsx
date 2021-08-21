import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import AccountComponent from './Account'
import { UserStates } from '../model/User'
import { GetMethod } from '../utility/ApiConnection'

const AccountButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [buttonText, setButtonText] = React.useState('')
  const [user, setUser] = React.useState<UserStates | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget)
    }
    setIsOpen(true)
  }

  const getCurrentUser = () => {
    GetMethod('users/me', null, (data: UserStates) => {
      setUser(data)
      // Update stored token to extend the expiration.
      window.localStorage.setItem('myBearerToken', data.access_token)
    })
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
      <AccountComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        anchorEl={anchorEl}
        user={user}
      />
    </div>
  )
}

export default AccountButton
