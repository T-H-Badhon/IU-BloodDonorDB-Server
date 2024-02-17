import { Types } from 'mongoose'
import { TBloodRequest } from './bloodRequest.interface'
import { BloodRequest } from './bloodRequest.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const createRequest = async (
  requestData: TBloodRequest,
  _id: Types.ObjectId,
) => {
  requestData.createdBy = _id
  const request = await BloodRequest.create(requestData)

  return request
}

const getAllRequest = async () => {
  const requests = await BloodRequest.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: 'donor',
        localField: 'createdBy',
        foreignField: 'userId',
        as: 'author',
      },
    },
  ])

  return requests
}

const myRequests = async (id: string) => {
  const requests = await BloodRequest.find({ createdBy: id })

  return requests
}

const updateRequest = async (
  updateData: Partial<TBloodRequest>,
  requestId: string,
  id: Types.ObjectId,
) => {
  const checkRequest = await BloodRequest.findById(requestId)

  if (checkRequest?.createdBy !== id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update!!',
    )
  }

  const request = await BloodRequest.findByIdAndUpdate(requestId, updateData, {
    new: true,
  })

  return request
}

const deleteRequest = async (
  id: Types.ObjectId,

  requestId: string,
) => {
  const checkRequest = await BloodRequest.findById(requestId)

  if (checkRequest?.createdBy != id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete!!',
    )
  }

  const deleteInfo = await BloodRequest.deleteOne({ _id: requestId })

  return deleteInfo
}

const deleteRequestByAdmin = async (id: string) => {
  const deleteInfo = await BloodRequest.deleteOne({ _id: id })

  return deleteInfo
}

export const bloodRequestServices = {
  createRequest,
  getAllRequest,
  myRequests,
  updateRequest,
  deleteRequest,
  deleteRequestByAdmin,
}
