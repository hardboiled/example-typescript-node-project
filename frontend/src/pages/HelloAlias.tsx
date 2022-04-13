import React, { useState } from 'react'
import { Alert } from '@mui/material'
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
    <form onSubmit={submitHandler}>
      <label htmlFor="field-name-query">Name</label>
      <input id="field-name-query" type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
      <input type="submit" value="Submit" />
      {fieldAlias && <p>result: {fieldAlias}</p>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
    </form>
  )
}

export default HelloAlias
