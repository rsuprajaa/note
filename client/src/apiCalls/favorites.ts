import axios from 'axios'
import { Favorite } from '../types'

export const toggleFavorite = async (noteId: string) => {
  return await axios.post<Favorite | string>('/favorites', { noteId })
}

export const getFavorites = async () => {
  const res = await axios.get<void | Favorite[]>('/favorites')
  return res.data
}

export const checkFavorite = async (noteId: string) => {
  const res = await axios.post<boolean>('/favorites/check', { noteId })
  return res.data
}
