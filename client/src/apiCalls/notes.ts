import axios from 'axios'
import { Note, UserRole } from '../types'

export const addNote = async (folderId: string) => {
  return axios
    .post<Note>(`/notes`, { folderId })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getNote = async (id: string) => {
  return axios
    .get<Note>(`/notes/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateNote = async (id: string, body: string | void, title: string | void) => {
  return axios
    .put<Note>(`/notes/${id}`, { body, title })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteNote = async (id: string) => {
  return axios
    .delete<Note>(`/notes/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const addPermission = async (noteId: string, email: string) => {
  return axios
    .post(`/notes/add-user`, { noteId, email })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const removePermission = async (noteId: string, userId: string) => {
  return axios
    .post(`/notes/remove-user`, { noteId, userId })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const notesShared = async () => {
  return axios
    .get<UserRole[]>(`/notes/filter/shared`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
