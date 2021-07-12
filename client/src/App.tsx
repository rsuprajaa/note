import axios from 'axios'
import React from 'react'
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import './App.css'
import Favorites from './pages/Favorites'
import FolderPage from './pages/Folder'
import Login from './pages/Login'
import NotePage from './pages/Note'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Shared from './pages/Shared'
import Workspace from './pages/Workspace'

axios.defaults.baseURL = process.env.REACT_APP_SERVER
axios.defaults.withCredentials = true

function ProtectedRoute({ ...routeProps }: RouteProps) {
  const authFromStorage = localStorage.getItem('authenticated')
  const isAuth = authFromStorage ? JSON.parse(authFromStorage) : false
  if (isAuth) {
    return <Route {...routeProps} />
  } else {
    return <Redirect to="/login" />
  }
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <ProtectedRoute exact path="/workspace">
          <Workspace />
        </ProtectedRoute>
        <Route exact path="/folder/:id">
          <FolderPage />
        </Route>
        <Route exact path="/notes/:id">
          <NotePage />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/shared-with-me">
          <Shared />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
