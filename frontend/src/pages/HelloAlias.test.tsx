import React from 'react'
import { fireEvent, getByLabelText, getByText, getByRole, waitFor, render } from '@testing-library/react'
import HelloAlias from './HelloAlias'

describe('HelloAlias', () => {
  afterEach(() => {
    // @ts-ignore
    global.fetch.mockClear()
  })
  it('shows 404', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return new Promise<Response>((resolve) => {
        setTimeout(() => {
          resolve({ status: 404 } as unknown as Response)
        })
      })
    })

    const instance = render(<HelloAlias />)
    const fieldInput = getByLabelText(instance.baseElement, 'field name')
    fireEvent.change(fieldInput, { target: { value: 'not empty' } })
    fireEvent.click(getByRole(instance.baseElement, 'button'))
    await waitFor(() => {
      expect(getByText(instance.baseElement, /name not found/)).not.toBe(null)
    })
  })
  it('shows generic error', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return new Promise<Response>((_resolve, reject) => {
        setTimeout(() => {
          reject(new Error('some error'))
        })
      })
    })

    const instance = render(<HelloAlias />)
    const fieldInput = getByLabelText(instance.baseElement, 'field name')
    fireEvent.change(fieldInput, { target: { value: 'not empty' } })
    fireEvent.click(getByRole(instance.baseElement, 'button'))
    await waitFor(() => {
      expect(getByText(instance.baseElement, /error making request/)).not.toBe(null)
    })
  })
  it('prints result', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return new Promise<Response>((resolve) => {
        setTimeout(() => {
          const json = () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ alias: 'alias' })
              })
            })
          }
          resolve({ status: 200, json } as unknown as Response)
        })
      })
    })

    const instance = render(<HelloAlias />)
    const fieldInput = getByLabelText(instance.baseElement, 'field name')
    fireEvent.change(fieldInput, { target: { value: 'not empty' } })
    fireEvent.click(getByRole(instance.baseElement, 'button'))
    await waitFor(() => {
      expect(getByText(instance.baseElement, /Result is/)).not.toBe(null)
    })
  })
})
