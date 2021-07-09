import axios from 'axios'
import { Folder, Note } from '../types'

export const getFolders = async () => {
  return axios
    .get<Folder[]>('/folder')
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const createFolder = async () => {
  return axios
    .post<Folder>('/folder')
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getFolder = async (id: string) => {
  return axios
    .get<Folder>(`/folder/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateFolder = async (id: string, name: string | void) => {
  return axios
    .put<Folder>(`/folder/${id}`, { name })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteFolder = async (id: string) => {
  return axios
    .delete(`/folder/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getNotesOfFolder = async (id: string) => {
  return axios
    .get<Note[]>(`/folder/${id}/notes`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
