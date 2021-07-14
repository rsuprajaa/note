import axios from 'axios'
import React, { Suspense } from 'react'
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader/Loader'

const NotePage = React.lazy(() => import('./pages/Note'))
const FolderPage = React.lazy(() => import('./pages/Folder'))
const Favorites = React.lazy(() => import('./pages/Favorites'))
const Shared = React.lazy(() => import('./pages/Shared'))
const Workspace = React.lazy(() => import('./pages/Workspace'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

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
          <Suspense fallback={<Loader center={true} />}>
            <Login />
          </Suspense>
        </Route>
        <Route exact path="/register">
          <Suspense fallback={<Loader center={true} />}>
            <Register />
          </Suspense>
        </Route>
        <ProtectedRoute exact path="/workspace">
          <Suspense fallback={<Loader center={true} />}>
            <Workspace />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute exact path="/folder/:id">
          <Suspense fallback={<Loader center={true} />}>
            <FolderPage />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute exact path="/notes/:id">
          <Suspense fallback={<Loader center={true} />}>
            <NotePage />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute exact path="/favorites">
          <Suspense fallback={<Loader center={true} />}>
            <Favorites />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute exact path="/shared-with-me">
          <Suspense fallback={<Loader center={true} />}>
            <Shared />
          </Suspense>
        </ProtectedRoute>
        <Route exact path="*">
          <Suspense fallback={<Loader center={true} />}>
            <NotFound />
          </Suspense>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
