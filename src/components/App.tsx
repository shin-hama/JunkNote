import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import MemoCard from './MemoCard'

export default function App() {
  const testMemos = [
    "test hot reload",
    "test memo 1",
    "Frontend for JunkNoteAPI",
  ]
  return (
    <div className="reactApp">
      <Container>
        {testMemos.map((item, i) => (
          <Grid key={i} xs={6} md={4}>
            <MemoCard text={item}/>
          </Grid>
        ))}
      </Container>
    </div>
  )
}
