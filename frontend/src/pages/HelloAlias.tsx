import React, { useState } from 'react'
import { Alert, Button, Grid, TextField } from '@mui/material'
import { getApiBasePath } from '../config'

export const HelloAlias: React.FC = () => {
  const [fieldName, setFieldName] = useState('')
  const [fieldAlias, setFieldAlias] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${getApiBasePath()}/hello-alias?name=${fieldName}`)
      if (res.status === 404) {
        setFieldAlias('')
        setErrorMsg('name not found')
        return
      }

      const { alias } = await res.json()
      setFieldAlias(alias)
      setErrorMsg('')
    } catch (e) {
      console.error(e)
      setFieldAlias('')
      setErrorMsg('error making request')
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <p>Type in the field name and submit to get the alias</p>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="field name"
                variant="outlined"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" value="Submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <p>
          {fieldAlias && <span>Result is: {fieldAlias}</span>}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </p>
      </Grid>
    </Grid>
  )
}

export default HelloAlias
