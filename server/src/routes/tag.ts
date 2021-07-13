import { Router } from 'express'
import { addTagToNote, createTag, deleteTag, getAllTags, removeTagFromNote } from '../controllers/tag'
import auth from '../middleware/auth'

const router = Router()
router.get('/', auth, getAllTags)
router.post('/', auth, createTag)
router.delete('/:id', auth, deleteTag)
router.post('/add', auth, addTagToNote)
router.post('/remove', auth, removeTagFromNote)

export default router
