/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express'
import Folder from '../entity/Folder'
import Note from '../entity/Note'

export const addFolder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { name } = req.body
    const { user } = res.locals
    const folder = new Folder({ name, user })
    await folder.save()
    return res.status(200).json(folder)
  } catch (err) {
    next(err)
  }
}

export const getAllFolders = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const folders = await Folder.find({ user })
    return res.status(200).json(folders)
  } catch (err) {
    next(err)
  }
}

export const getFolder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const folder = await Folder.findOne({ id })
    if (!folder) {
      res.status(404)
      throw new Error('Folder not found')
    }
    if (folder.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized access')
    }
    return res.status(200).json(folder)
  } catch (err) {
    next(err)
  }
}

export const updateFolder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const { name } = req.body
    const folder = await Folder.findOne({ id })
    if (!folder) {
      res.status(404)
      throw new Error('Folder not found')
    }
    if (folder.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized access')
    }
    folder.name = name
    await Folder.save(folder)
    return res.status(200).json(folder)
  } catch (err) {
    next(err)
  }
}

export const deleteFolder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const folder = await Folder.findOne({ id })
    if (!folder) {
      res.status(404)
      throw new Error('Folder not found')
    }
    if (folder.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized access')
    }
    await Folder.delete({ id })
    return res.status(200).json('Folder deleted')
  } catch (err) {
    next(err)
  }
}

export const getAllNotesOfFolder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const folderId = req.params.id
    const { user } = res.locals
    const folder = await Folder.findOne({ id: folderId })
    if (!folder) {
      res.status(404)
      throw new Error('Folder not found')
    }
    if (folder.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized access')
    }
    const notes = await Note.find({ folder })
    return res.status(200).json(notes)
  } catch (err) {
    next(err)
  }
}
