import axios from 'axios'
import React, { Suspense } from 'react'
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader/Loader'
import { useAuth } from './context/UserContext'

const NotePage = React.lazy(() => import('./pages/Note'))
const FolderPage = React.lazy(() => import('./pages/Folder'))
const Favorites = React.lazy(() => import('./pages/Favorites'))
const Shared = React.lazy(() => import('./pages/Shared'))
const Workspace = React.lazy(() => import('./pages/Workspace'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Home = React.lazy(() => import('./pages/Home'))

axios.defaults.baseURL = process.env.REACT_APP_SERVER
axios.defaults.withCredentials = true

function ProtectedRoute({ ...routeProps }: RouteProps) {
  const { state } = useAuth()
  if (state.loading) {
    return <Loader center={true} />
  } else {
    if (state.authenticated) {
      return <Route {...routeProps} />
    } else {
      return <Redirect to="/login" />
    }
  }
}
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader center={true} />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <ProtectedRoute exact path="/workspace">
            <Workspace />
          </ProtectedRoute>
          <ProtectedRoute exact path="/folder/:id">
            <FolderPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/notes/:id">
            <NotePage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/favorites">
            <Favorites />
          </ProtectedRoute>
          <ProtectedRoute exact path="/shared-with-me">
            <Shared />
          </ProtectedRoute>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
