import bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import cookie from 'cookie'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../entity/User'

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, name, password } = req.body
  try {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return res.status(400).json({ msg: 'Email already exists' })
    }
    const user = new User({ email, name, password })
    const errors = await validate(user)
    if (errors.length > 0) return res.status(400).json({ errors })
    await user.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!user || !passwordMatches) {
      return res.status(404).json({ msg: 'Invalid email or password' })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.JWT_SECRET === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    )
    return res.status(200).send(user)
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

export const logout = async (_: Request, res: Response): Promise<Response> => {
  try {
    res.set(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.JWT_SECRET === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      })
    )
    return res.status(200).json({ msg: 'Logged out' })
  } catch (err) {
    return res.status(401).json({ msg: err })
  }
}

export const me = (_: Request, res: Response): Response => {
  return res.status(200).json(res.locals.user)
}
