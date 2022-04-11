import React, { useState } from 'react'
import { Alert } from '@mui/material'

export const HelloAlias: React.FC = () => {
  const [fieldName, setFieldName] = useState('')
  const [fieldAlias, setFieldAlias] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    fetch(`http://localhost:9999/dev/hello-alias?name=${fieldName}`)
      .then((res) => {
        res
          .json()
          .then(({ alias }) => {
            setFieldAlias(alias)
          })
          .catch(() => setErrorMsg('unparsable json'))
      })
      .catch(() => setErrorMsg('not found'))
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
