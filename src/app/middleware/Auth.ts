import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'

import { AuthError } from '../errors/AuthError'
import { catchAsync } from '../utilitis/catchAsync'
import { config } from '../config/config'
import { User } from '../modules/user/user.model'
import { isPasswordExpaired } from '../utilitis/checkPasswordExpire'

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    let decoded
    try {
      decoded = jwt.verify(token, config.ac_token as string) as JwtPayload
    } catch (err) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    const { _id, role, iat } = decoded as JwtPayload

    const loginUser = await User.findById(_id)

    if (!loginUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    if (
      loginUser.passwordChangeAT &&
      isPasswordExpaired(loginUser.passwordChangeAT, iat as number)
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Login Expired!. Please login again.',
      )
    }

    if (loginUser.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are blocked by admin')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
