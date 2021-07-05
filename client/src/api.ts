import axios from 'axios'
import { Folder } from './types'

export const getFolders = async () => {
  console.log('getting folders')
  return axios
    .get<Folder[]>('/folder')
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
