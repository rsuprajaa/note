import axios from 'axios'
import { User } from '../types'

export const login = async (email: string, password: string) => {
  const res = await axios.post<User>('/auth/login', { email, password })
  return res
}

export const register = async (name: string, email: string, password: string) => {
  const res = await axios.post<User>('/auth/register', { name, email, password })
  return res
}

export const logout = async () => {
  const res = await axios.get<string>('/auth/logout')
  return res
}
