import { Router } from 'express'
import { login, logout, me, register } from '../controllers/auth'
import auth from '../middleware/auth'

const router = Router()
router.post('/register', register)
router.post('/login', login)
router.get('/', auth, me)
router.get('/logout', auth, logout)

export default router
