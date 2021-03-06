/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express'
import { getManager } from 'typeorm'
import Folder from '../entity/Folder'
import Note from '../entity/Note'
import User from '../entity/User'
import UserRole from '../entity/UserRole'

export const addNote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { title, body, folderId } = req.body
    const { user } = res.locals
    const folder = await Folder.findOne({ id: folderId })
    if (!folder) {
      res.status(404)
      throw new Error('Folder not found')
    }
    if (folder.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    const note = new Note({ title, body, folder })
    await note.save()
    const role = new UserRole({ user, permission: 'owner', resource: note })
    await role.save()
    return res.status(200).json(note)
  } catch (err) {
    next(err)
  }
}

export const getNote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const noteId = req.params.id
    const note = await Note.findOne({ id: noteId }, { relations: ['userRole', 'noteTag', 'favorites'] })
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    const hasAccess = await UserRole.findOne({ user, resource: note })
    if (!hasAccess) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    return res.status(200).json(note)
  } catch (err) {
    next(err)
  }
}

export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const { title, body, subject } = req.body
    const noteId = req.params.id
    const note = await Note.findOne({ id: noteId })
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    const hasAccess = await UserRole.findOne({ user, resource: note })
    if (!hasAccess) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    note.body = body || ''
    note.title = title || note.title
    note.subject = subject || note.subject
    await note.save()
    return res.status(200).json(note)
  } catch (err) {
    next(err)
  }
}

export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const noteId = req.params.id
    const { user } = res.locals
    const note = await Note.findOne({ id: noteId })
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    const isOwner = await UserRole.findOne({ user, resource: note, permission: 'owner' })
    if (!isOwner) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    await UserRole.delete({ resource: note })
    await note.remove()
    return res.status(200).json('Note deleted')
  } catch (err) {
    next(err)
  }
}

export const addPermission = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { noteId, email } = req.body
    const { user } = res.locals
    const note = await Note.findOne({ id: noteId })
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    const userToBeAdded = await User.findOne({ email })
    if (!userToBeAdded) {
      res.status(404)
      throw new Error('User not found')
    }
    const isOwner = await UserRole.findOne({ user, resource: note, permission: 'owner' })
    if (!isOwner) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    const hasAccess = await UserRole.findOne({ user: userToBeAdded, resource: note, permission: 'member' })
    if (hasAccess) {
      res.status(401)
      throw new Error(`User already has access`)
    }
    const role = new UserRole({ user: userToBeAdded, permission: 'member', resource: note })
    await role.save()
    return res.status(200).json(role)
  } catch (err) {
    next(err)
  }
}

export const removePermission = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { noteId, userId } = req.body
    const { user } = res.locals
    const note = await Note.findOne({ id: noteId })
    if (!note) {
      res.status(404)
      throw new Error('Note not found')
    }
    const userToBeRemoved = await User.findOne({ id: userId })
    if (!userToBeRemoved) {
      res.status(404)
      throw new Error('User not found')
    }
    const isOwner = await UserRole.findOne({ user, resource: note, permission: 'owner' })
    if (!isOwner) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    const hasAccess = await UserRole.findOne({ user: userToBeRemoved, resource: note, permission: 'member' })
    if (!hasAccess) {
      res.status(401)
      throw new Error(`User doesn't have access`)
    }
    await UserRole.delete({ user: userToBeRemoved, resource: note, permission: 'member' })
    return res.status(200).json('User removed')
  } catch (err) {
    next(err)
  }
}

export const sharedWithUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const notesShared = await UserRole.find({ user, permission: 'member' })
    return res.status(200).json(notesShared)
  } catch (err) {
    next(err)
  }
}

export const searchByTitle = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const { query } = req.body
    const entityManager = await getManager()
    const notes = await entityManager.query(
      `SELECT title, notes.id FROM notes join user_roles on user_roles.resource_id = notes.id left join users on user_roles.user_id = users.id WHERE users.id = $1 AND notes.title like $2 GROUP BY notes.id`,
      [user.id, `%${query.toLowerCase()}%`]
    )
    return res.status(200).json(notes)
  } catch (err) {
    next(err)
  }
}
