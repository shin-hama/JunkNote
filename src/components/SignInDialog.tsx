import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { SetSignUpDialogOpen } from './Account'
import { UserStates } from '../model/User'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

const MarginedBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}))

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

type FormStates = Record<string, string> & {
  username: string
  password: string
}

function SignInDialog(props: DialogProps) {
  const setSignUpDialogOpen = React.useContext(SetSignUpDialogOpen)
  const [forms, setForms] = React.useState<FormStates>({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const executeSignIn = (event: React.FormEvent) => {
    event.preventDefault()
    setIsProcessing(true)
    const params = new URLSearchParams(forms)
    const props: ApiProps<UserStates> = {
      method: 'post',
      endpoint: 'users/token',
      data: params,
      callback: (data: UserStates) => {
        window.localStorage.setItem('myBearerToken', data.access_token)
        window.location.reload()
      },
      errorCallback: () => {
        setIsProcessing(false)
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

  const handleSignUpOpen = () => {
    setSignUpDialogOpen(true)
  }

  return (
    <div>
      <Dialog id="sign-in-title" maxWidth="xs" fullWidth {...props}>
        <DialogTitle sx={{ textAlign: 'center' }}>Sign in</DialogTitle>
        <form onSubmit={executeSignIn}>
          <Box textAlign="center">
            <SignInForm
              autoFocus
              id="email"
              label="Email"
              type="email"
              onChange={handleChange('username')}
              value={forms.username}
            />
            <SignInForm
              id="password"
              label="Password"
              onChange={handleChange('password')}
              type={showPassword ? 'text' : 'password'}
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
          <MarginedBox textAlign="center">
            {isProcessing ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: (theme) => theme.spacing(1),
                  marginBottom: (theme) => theme.spacing(1),
                }}>
                Sign in
              </Button>
            )}
          </MarginedBox>
        </form>
        <MarginedBox textAlign="center">
          <Typography>Forgot password?</Typography>
        </MarginedBox>
        <MarginedBox textAlign="center">
          <Typography>
            {" Don't have an account? "}
            <Link component="button" variant="body1" onClick={handleSignUpOpen}>
              Sign up
            </Link>
          </Typography>
        </MarginedBox>
      </Dialog>
    </div>
  )
}

export default SignInDialog
