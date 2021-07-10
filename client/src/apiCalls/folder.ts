import axios from 'axios'
import { Folder, Note } from '../types'

export const getFolders = async () => {
  const res = await axios.get<Folder[]>('/folder')
  return res.data
}

export const createFolder = async () => {
  const res = await axios.post<Folder>('/folder')
  return res.data
}

export const getFolder = async (id: string) => {
  const res = await axios.get<Folder>(`/folder/${id}`)
  return res.data
}

export const updateFolder = async (id: string, name: string | void) => {
  const res = await axios.put<Folder>(`/folder/${id}`, { name })
  return res.data
}

export const deleteFolder = async (id: string) => {
  const res = await axios.delete(`/folder/${id}`)
  return res.data
}

export const getNotesOfFolder = async (id: string) => {
  const res = await axios.get<Note[]>(`/folder/${id}/notes`)
  return res.data
}
