import axios from 'axios'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Favorites from './pages/Favorites'
import Folder from './pages/Folder'
import Home from './pages/Home'
import Login from './pages/Login'
import Note from './pages/Note'
import Register from './pages/Register'
import Shared from './pages/Shared'

axios.defaults.baseURL = process.env.REACT_APP_SERVER
axios.defaults.withCredentials = true

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
        <Route exact path="/workspace">
          <Home />
        </Route>
        <Route exact path="/folder/:id">
          <Folder />
        </Route>
        <Route exact path="/notes/:id">
          <Note />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/shared-with-me">
          <Shared />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
