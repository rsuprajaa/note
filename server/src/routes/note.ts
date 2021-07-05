import { Router } from 'express'
import {
  addNote,
  addPermission,
  deleteNote,
  getNote,
  removePermission,
  sharedWithUser,
  updateNote,
} from '../controllers/note'
import auth from '../middleware/auth'

const router = Router()
router.get('/:id', auth, getNote)
router.put('/:id', auth, updateNote)
router.delete('/:id', auth, deleteNote)
router.post('/', auth, addNote)
router.post('/add-user/:id', auth, addPermission)
router.post('/remove-user/:id', auth, removePermission)
router.get('/filter/shared', auth, sharedWithUser)

export default router
