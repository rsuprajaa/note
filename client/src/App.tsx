import axios from 'axios'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

axios.defaults.baseURL = 'http://localhost:5000/api'
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
          <Sidebar />
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
