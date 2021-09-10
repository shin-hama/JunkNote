import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import AccountComponent from './Account'
import { UserStates } from '../model/User'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'
import { TOKEN_KEY } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: '80px',
    },
  })
)

const AccountButton = () => {
  const classes = useStyles()

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
    const props: ApiProps = {
      method: 'get',
      endpoint: 'users/me',
      callback: (data: UserStates) => {
        setUser(data)
        // Update stored token to extend the expiration.
        window.localStorage.setItem('myBearerToken', data.access_token)
      },
      errorCallback: () => window.localStorage.removeItem(TOKEN_KEY),
    }
    ConnectApi(props)
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      getCurrentUser()
    }
  }, [])

  React.useEffect(() => {
    setButtonText(user ? user.username : 'Sign in')
  }, [user])

  return (
    <div>
      <Button
        color="primary"
        onClick={handleButtonClick}
        variant="contained"
        className={classes.button}>
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
