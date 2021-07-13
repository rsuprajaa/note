import axios from 'axios'
import { Tag } from '../types'

export const createTag = async (name: string) => {
  const { data } = await axios.post<Tag>(`/tags`, { name })
  return data
}

export const getAllTags = async () => {
  const { data } = await axios.get<Tag[]>('/tags')
  return data
}

export const addTagsToNote = async (noteId: string, tagId: string) => {
  const { data } = await axios.post<Tag>('/tags/add', { noteId, tagId })
  return data
}

export const removeTagFromNote = async (noteId: string, tagId: string) => {
  const { data } = await axios.post('/tags/remove', { noteId, tagId })
  return data
}

export const deleteTag = async (tagId: string) => {
  const { data } = await axios.delete(`/tags/${tagId}`)
  return data
}
