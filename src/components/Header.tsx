import React from 'react'
import { alpha, styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Hidden from '@mui/material/Hidden'
import InputAdornment from '@mui/material/InputAdornment'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import AccountButton from './AccountButton'
import { QueryContext } from '../pages/MainView'

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('md')]: {
    width: '20em',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  position: 'relative',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}))

type Props = {
  handleOpen: React.MouseEventHandler
}
export default function Header({ handleOpen }: Props) {
  const { query, setQuery } = React.useContext(QueryContext)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleClickClear = () => {
    setQuery('')
  }

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Root>
      <AppBar
        elevation={1}
        position="relative"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleOpen}
            sx={{ marginRight: (theme) => theme.spacing(2) }}
            aria-label="menu"
            size="large">
            <MenuIcon />
          </IconButton>
          <Hidden smDown>
            <Typography
              noWrap
              variant="h6"
              component="div"
              sx={{ minWidth: '105px' }}>
              Junk Note
            </Typography>
          </Hidden>
          <Root />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={query}
              onChange={handleSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickClear}
                    onMouseDown={handleMouseDownClear}
                    size="small"
                    sx={query ? {} : { visibility: 'hidden' }}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Search>
          <AccountButton />
        </Toolbar>
      </AppBar>
    </Root>
  )
}
