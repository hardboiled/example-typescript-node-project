import React from 'react'
import { Grid } from '@mui/material'

export const Home: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Welcome to the landlord app</h2>
      </Grid>
      <Grid item xs={12}>
        Use the nav to traverse pages
      </Grid>
    </Grid>
  )
}

export default Home
