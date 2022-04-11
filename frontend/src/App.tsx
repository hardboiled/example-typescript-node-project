import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} element={<route.element />} />
        })}
      </Routes>
    </div>
  )
}

export default App
