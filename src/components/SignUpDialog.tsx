import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput, {
  OutlinedInputProps,
} from '@material-ui/core/OutlinedInput'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { UserStates } from '../model/User'
import { PostMethod } from '../utility/ApiConnection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    textField: {
      width: '40ch',
    },
    title: {
      textAlign: 'center',
    },
  })
)

const SignInForm = (props: OutlinedInputProps) => {
  const classes = useStyles()

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      margin="dense"
      required
      variant="outlined">
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput {...props} />
    </FormControl>
  )
}

type FormStates = {
  username: string
  email: string
  password: string
}

const SignUpDialog = (props: DialogProps) => {
  const classes = useStyles()
  const [forms, setForms] = React.useState<FormStates>({
    username: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const executeSignUp = (event: React.FormEvent) => {
    event.preventDefault()
    const params = { user: forms }
    PostMethod('users', null, params, (data: UserStates) => {
      window.localStorage.setItem('myBearerToken', data.access_token)
      window.location.reload()
    })
  }

  const handleChange =
    (prop: keyof FormStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForms({ ...forms, [prop]: event.target.value })
    }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
  }

  return (
    <div>
      <Dialog id="sign-up" maxWidth="xs" fullWidth {...props}>
        <DialogTitle id="sign-up-title" className={classes.title}>
          Join Junk Notes
        </DialogTitle>
        <form onSubmit={executeSignUp}>
          <Box textAlign="center">
            <SignInForm
              autoFocus
              id="username"
              label="Username"
              type="text"
              onChange={handleChange('username')}
              value={forms.username}
            />
            <SignInForm
              id="email"
              label="Email"
              type="email"
              onChange={handleChange('email')}
              value={forms.email}
            />
            <SignInForm
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              value={forms.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box textAlign="center" className={classes.margin}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.margin}>
              Sign Up
            </Button>
          </Box>
        </form>
      </Dialog>
    </div>
  )
}

export default SignUpDialog
