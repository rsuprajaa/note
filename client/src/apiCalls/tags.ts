import axios from 'axios'
import { Tag } from '../types'

export const createTag = async (name: string) => {
  return axios
    .post<Tag>(`/tags`, { name })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAllTags = async () => {
  return axios
    .get<Tag[]>('/tags')
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const addTagsToNote = async (noteId: string, tagId: string) => {
  return axios
    .post<Tag>('/add', { noteId, tagId })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
