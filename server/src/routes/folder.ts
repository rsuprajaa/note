import { Router } from 'express'
import {
  addFolder,
  deleteFolder,
  getAllFolders,
  getAllNotesOfFolder,
  getFolder,
  updateFolder,
} from '../controllers/folder'
import auth from '../middleware/auth'

const router = Router()
router.post('/', auth, addFolder)
router.get('/', auth, getAllFolders)
router.get('/:id', auth, getFolder)
router.delete('/:id', auth, deleteFolder)
router.put('/:id', auth, updateFolder)
router.get('/:id/notes', auth, getAllNotesOfFolder)

export default router
