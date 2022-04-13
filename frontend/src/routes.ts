import React from 'react'
import HelloAlias from './pages/HelloAlias'
import Home from './pages/Home'

export interface routeProps {
  path: string
  element: React.FC
  title: string
}

const routes: routeProps[] = [
  { path: '/', element: Home, title: 'home' },
  { path: '/hello-alias', element: HelloAlias, title: 'hello alias' },
]

export default routes
