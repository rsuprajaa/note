import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import authRoutes from './routes/auth'
import favoriteRoutes from './routes/favorite'
import folderRoutes from './routes/folder'
import noteRoutes from './routes/note'
import tagRoutes from './routes/tag'

dotenv.config()

const app = express()
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/folder', folderRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/tags', tagRoutes)

// eslint-disable-next-line no-unused-vars
app.use((err, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})

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
