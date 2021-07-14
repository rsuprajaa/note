import { Router } from 'express'
import {
  addTagToNote,
  createTag,
  deleteTag,
  filterNotesByTags,
  getAllTags,
  removeTagFromNote,
} from '../controllers/tag'
import auth from '../middleware/auth'

const router = Router()
router.get('/', auth, getAllTags)
router.post('/', auth, createTag)
router.delete('/:id', auth, deleteTag)
router.post('/add', auth, addTagToNote)
router.post('/remove', auth, removeTagFromNote)
router.post('/filter-by-tags', auth, filterNotesByTags)

export default router
