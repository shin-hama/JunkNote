import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SignInDialog from './SignInDialog'

import { GetMethod } from '../utility/ApiConnection'

type UserStates = {
  username: string
  email: string
  created: string
}

const AccountButton = () => {
  const [buttonText, setButtonText] = React.useState('')
  const [user, setUser] = React.useState<UserStates | null>(null)
  const [isOpenSignIn, setIsOpenSignIn] = React.useState(false)
  const handleSignInOpen = () => {
    setIsOpenSignIn(true)
  }

  const getCurrentUser = () => {
    GetMethod('users/me', null, (data: UserStates) => {
      setUser(data)
      // TODO: Save new token
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
      <Button onClick={handleSignInOpen} variant="contained">
        <Typography variant="button">{buttonText}</Typography>
      </Button>
      <SignInDialog isOpen={isOpenSignIn} setIsOpen={setIsOpenSignIn} />
    </div>
  )
}

export default AccountButton
