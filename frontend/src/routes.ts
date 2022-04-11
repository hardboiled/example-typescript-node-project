import React from 'react'
import HelloAlias from './pages/HelloAlias'

interface routeProps {
  path: string
  element: React.FC
}

const routes: routeProps[] = [
  { path: '/hello-alias', element: HelloAlias },
  { path: '/', element: HelloAlias },
]

export default routes
