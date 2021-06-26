import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)

const port = process.env.PORT || 5000
createConnection()
  // eslint-disable-next-line no-unused-vars
  .then(async _ => {
    console.log('Database connected')
    app.listen(port, () => {
      console.log(`Server up on port ${port}`)
    })
  })
  .catch(error => {
    throw new Error(error)
  })
