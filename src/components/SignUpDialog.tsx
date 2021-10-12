import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { UserStates } from '../model/User'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

const SignInForm = (props: OutlinedInputProps) => {
  return (
    <FormControl
      sx={{
        marginTop: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
        width: '40ch',
      }}
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
  const [forms, setForms] = React.useState<FormStates>({
    username: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const executeSignUp = (event: React.FormEvent) => {
    event.preventDefault()
    const params = { user: forms }
    const props: ApiProps<UserStates> = {
      method: 'post',
      endpoint: 'users',
      data: params,
      callback: (data: UserStates) => {
        window.localStorage.setItem('myBearerToken', data.access_token)
        window.location.reload()
      },
    }
    ConnectApi(props)
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
        <DialogTitle id="sign-up-title" sx={{ textAlign: 'center' }}>
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
          <Box
            textAlign="center"
            sx={{
              marginTop: (theme) => theme.spacing(1),
              marginBottom: (theme) => theme.spacing(1),
            }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                marginTop: (theme) => theme.spacing(1),
                marginBottom: (theme) => theme.spacing(1),
              }}>
              Sign Up
            </Button>
          </Box>
        </form>
      </Dialog>
    </div>
  )
}

export default SignUpDialog
