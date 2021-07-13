/* eslint-disable consistent-return */

import { NextFunction, Request, Response } from 'express'
import Note from '../entity/Note'
import NoteTag from '../entity/Note_Tag'
import Tag from '../entity/Tag'
import UserRole from '../entity/UserRole'

export const getAllTags = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { user } = res.locals
    const tags = await Tag.find({ user })
    return res.status(200).json(tags)
  } catch (err) {
    next(err)
  }
}

export const createTag = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { name } = req.body
    const { user } = res.locals
    const tagExists = await Tag.findOne({ name, user })
    if (tagExists) {
      res.status(400)
      throw new Error('Duplicate tags not allowed')
    }
    const tag = new Tag({ name, user })
    await tag.save()
    return res.status(200).json(tag)
  } catch (err) {
    next(err)
  }
}

export const deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const tagId = req.params.id
    const { user } = res.locals
    const tag = await Tag.findOne({ id: tagId })
    if (!tag) {
      res.status(404)
      throw new Error('Tag not found')
    }
    if (tag.user.id !== user.id) {
      res.status(401)
      throw new Error('Unauthorized access')
    }
    await Tag.delete({ id: tagId })
    return res.status(200).json('Tag deleted')
  } catch (err) {
    next(err)
  }
}

export const addTagToNote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { noteId, tagId } = req.body
    const { user } = res.locals
    const tag = await Tag.findOne({ id: tagId })
    if (!tag) {
      res.status(404)
      throw new Error('Tag not found')
    }
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
    const tagExists = await NoteTag.findOne({ tag, note })
    if (tagExists) {
      res.status(404)
      throw new Error('Same tag exists for the note')
    }
    const newTag = new NoteTag({ tag, note })
    await newTag.save()
    return res.status(200).json(newTag)
  } catch (err) {
    next(err)
  }
}

export const removeTagFromNote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { noteId, tagId } = req.body
    const { user } = res.locals
    const tag = await Tag.findOne({ id: tagId })
    if (!tag) {
      res.status(404)
      throw new Error('Tag not found')
    }
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
    await NoteTag.delete({ tag, note })
    return res.status(200).json('Tag deleted')
  } catch (err) {
    next(err)
  }
}
