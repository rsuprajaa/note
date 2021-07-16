import axios from 'axios'
import * as React from 'react'
import { useEffect, useReducer } from 'react'
import { User } from '../types'

interface Action {
  type: string
  payload: User | null
}

interface UserState {
  authenticated: boolean
  user: User | null
  loading: boolean
  error: string
}

type Dispatch = (action: Action) => void
type UserContextProviderProps = { children: React.ReactNode }

const UserContext = React.createContext<{ state: UserState; dispatch: Dispatch } | undefined>(undefined)

function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'LOGIN': {
      return { loading: false, authenticated: true, user: action.payload, error: '' }
    }
    case 'LOGOUT': {
      return { loading: false, authenticated: false, user: null, error: '' }
    }
    case 'LOADING': {
      return { loading: true, authenticated: false, user: null, error: '' }
    }
    default: {
      return { loading: false, authenticated: false, user: null, error: 'Login error' }
    }
  }
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    authenticated: false,
    loading: true,
    error: '',
  })

  async function loadUser() {
    try {
      dispatch({ type: 'LOADING', payload: null })
      const res = await axios.get<User>('/auth')
      dispatch({ type: 'LOGIN', payload: res.data })
    } catch (err) {
      dispatch({ type: 'LOGOUT', payload: null })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const value = { state, dispatch }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useAuth() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('The component is not wrapped with UserContextProvider')
  }
  return context
}

export { UserContextProvider, useAuth }
