import React from 'react'
import ReactDOM from 'react-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import App from './App'
import { UserContextProvider } from './context/UserContext'
import './index.css'

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
)
