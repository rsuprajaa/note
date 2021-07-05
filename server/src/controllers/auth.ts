/* eslint-disable consistent-return */
import bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import cookie from 'cookie'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../entity/User'

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { email, name, password } = req.body
  try {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
      res.status(400)
      throw new Error('Email already exists')
    }
    const user = new User({ email, name, password })
    const errors = await validate(user)
    if (errors.length > 0) return res.status(400).json({ errors })
    await user.save()
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400)
      throw new Error('Invalid email or password')
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    )
    return res.status(200).send(user)
  } catch (err) {
    next(err)
  }
}

export const logout = async (_: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    res.set(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      })
    )
    return res.status(200).json({ msg: 'Logged out' })
  } catch (err) {
    next(err)
  }
}

export const me = (_: Request, res: Response): Response => {
  return res.status(200).json(res.locals.user)
}
