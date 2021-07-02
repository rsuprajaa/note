import { Router } from 'express'
import { addToFavorites, getAllFavorites, removeFromFavorites } from '../controllers/favorite'
import auth from '../middleware/auth'

const router = Router()
router.post('/', auth, addToFavorites)
router.get('/', auth, getAllFavorites)
router.delete('/:id', auth, removeFromFavorites)

export default router
