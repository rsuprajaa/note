import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../entity/User'

export default async function name(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).json({ msg: 'Unauthenticated access' })
    }
    const { id }: any = jwt.verify(token, process.env.JWT_SECRET)
    if (!id) {
      return res.status(401).json({ msg: 'Unauthenticated access' })
    }
    const user = await User.findOne({ id })
    res.locals.user = user
    return next()
  } catch (err) {
    return res.status(401).json({ msg: err })
  }
}
