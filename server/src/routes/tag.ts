import { Router } from 'express'
import { addTagToNote, createTag, getAllTags, getNotesWithTags, removeTagFromNote } from '../controllers/tag'
import auth from '../middleware/auth'

const router = Router()
router.get('/', auth, getAllTags)
router.post('/', auth, createTag)
router.post('/add', auth, addTagToNote)
router.delete('/remove', auth, removeTagFromNote)
router.post('/get-notes', auth, getNotesWithTags)

export default router
