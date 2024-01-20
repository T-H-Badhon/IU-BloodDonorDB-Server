import httpStatus from 'http-status'
import { catchAsync } from '../../utilitis/catchAsync'
import response from '../../utilitis/response'
import { userServices } from './user.services'

const getAllDonors = catchAsync(async (req, res) => {
  const donors = await userServices.getAllDonors(req.query)
  response(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Donors fetch Successfully!',
    data: donors,
  })
})
const changeBlockState = catchAsync(async (req, res) => {
  const id = req.params.userId
  const { isBlocked } = req.body
  const donor = await userServices.changeBlockState(id, isBlocked)
  response(res, {
    statusCode: 201,
    success: true,
    message: 'Block Sate Change Successfully!',
    data: donor,
  })
})

export const userControllers = {
  getAllDonors,
  changeBlockState,
}
