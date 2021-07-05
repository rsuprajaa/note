/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express'
import Favorite from '../entity/Favorite'
import Note from '../entity/Note'

export const addToFavorites = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { noteId } = req.body
    const { user } = res.locals
    const note = await Note.findOne({ id: noteId })
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    const favorite = new Favorite({ note, user })
    await favorite.save()
    return res.status(200).json(favorite)
  } catch (err) {
    next(err)
  }
}

export const getAllFavorites = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const favorites = await Favorite.find({ user })
    return res.status(200).json(favorites)
  } catch (err) {
    next(err)
  }
}

export const removeFromFavorites = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const favorite = await Favorite.findOne({ id })

    if (!favorite) {
      res.status(404)
      throw new Error('Not found')
    }
    if (favorite.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized access')
    }
    await Favorite.delete({ id })
    return res.status(200).json('Deleted from favorites')
  } catch (err) {
    next(err)
  }
}
