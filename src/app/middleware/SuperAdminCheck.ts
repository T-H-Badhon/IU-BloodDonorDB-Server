import { NextFunction, Request, Response } from 'express'
import { config } from '../config/config'
import { AppError } from '../errors/AppError'
import httpStatus from 'http-status'

export const checkSuperAdminCode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { superKey } = req.body

  const superAdminKey = config.super_key
  if (superAdminKey !== superKey) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Your Super Admin key is not valid!',
    )
  }

  next()
}
