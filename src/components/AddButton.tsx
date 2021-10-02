import React from 'react'
import { styled } from '@mui/material/styles'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

import { MemoContext } from './ContentRegion'
import { MemoFactory } from '../model/Memo'

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(5),
  right: theme.spacing(5),
}))

function AddButton() {
  const { setMemo } = React.useContext(MemoContext)
  const handleOpen = () => {
    setMemo(MemoFactory({}))
  }

  return (
    <Root>
      <Fab color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </Root>
  )
}

export default AddButton
