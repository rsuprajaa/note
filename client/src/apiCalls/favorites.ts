import axios from 'axios'
import { Favorite } from '../types'

export const toggleFavorite = async (noteId: string) => {
  return axios
    .post<Favorite | string>('/favorites', { noteId })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getFavorites = async () => {
  return axios
    .get<Favorite[]>(`/favorites`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const checkFavorite = async (noteId: string) => {
  return axios
    .post<boolean>(`/favorites/check`, { noteId })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
