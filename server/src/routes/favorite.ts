import { Router } from 'express'
import { checkFavorite, getAllFavorites, toggleFavorites } from '../controllers/favorite'
import auth from '../middleware/auth'

const router = Router()
router.post('/', auth, toggleFavorites)
router.get('/', auth, getAllFavorites)
// router.delete('/:id', auth, removeFromFavorites)
router.post('/check', auth, checkFavorite)

export default router
