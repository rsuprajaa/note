import { Request, Response } from 'express'
import Folder from '../entity/Folder'

export const addFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body
    const { user } = res.locals
    const folder = new Folder({ name, user })
    await folder.save()
    return res.status(200).json(folder)
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export const getAllFolders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user } = res.locals
    const folders = await Folder.find({ user })
    return res.status(200).json(folders)
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export const getFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const folder = await Folder.findOne({ id })
    if (!folder) return res.status(400).json('Folder not found')
    if (folder.user.id !== user.id) return res.status(400).json('Unauthorized access')

    return res.status(200).json(folder)
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export const updateFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const { name } = req.body
    const folder = await Folder.findOne({ id })

    if (!folder) return res.status(400).json('Folder not found')
    if (folder.user.id !== user.id) return res.status(400).json('Unauthorized access')

    folder.name = name

    await Folder.save(folder)
    return res.status(200).json(folder)
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export const deleteFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { user } = res.locals
    const folder = await Folder.findOne({ id })

    if (!folder) return res.status(400).json('Folder not found')
    if (folder.user.id !== user.id) return res.status(400).json('Unauthorized access')
    await Folder.delete({ id })
    return res.status(200).json('Folder deleted')
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}
