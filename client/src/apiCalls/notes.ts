import axios from 'axios'
import { Note, UserRole } from '../types'

export const addNote = async (folderId: string) => {
  const res = await axios.post<Note>(`/notes`, { folderId })
  return res.data
}

export const getNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`)
  return res.data
}

export const updateNote = async (id: string, body: string, title: string) => {
  const { data } = await axios.put<Note>(`/notes/${id}`, { body, title })
  return data
}

export const deleteNote = async (id: string) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`)
  return data
}

export const addPermission = async (noteId: string, email: string) => {
  const res = await axios.post(`/notes/add-user`, { noteId, email })
  return res.data
}

export const removePermission = async (noteId: string, userId: string) => {
  const { data } = await axios.post(`/notes/remove-user`, { noteId, userId })
  return data
}

export const notesShared = async () => {
  const { data } = await axios.get<UserRole[]>(`/notes/filter/shared`)
  return data
}
