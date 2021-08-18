import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
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

import { GetMethod } from '../utility/ApiConnection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
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

interface FormsState {
  email: string
  password: string
}

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SignInDialog({ isOpen, setIsOpen }: Props) {
  const classes = useStyles()
  const [forms, setForms] = React.useState<FormsState>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  const executeSignIn = () => {
    console.log(forms)
    GetMethod('users/token', null, console.log)
    setIsOpen(false)
  }

  const handleChange =
    (prop: keyof FormsState) =>
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
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent>
          <form onSubmit={executeSignIn}>
            <DialogTitle className={classes.title}>Sign in</DialogTitle>
            <Box textAlign="center">
              <SignInForm
                autoFocus
                id="email"
                label="Email"
                type="email"
                onChange={handleChange('email')}
                value={forms.email}
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.margin}>
                Sign in
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SignInDialog
