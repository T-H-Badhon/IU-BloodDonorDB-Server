import { TBloodRequest } from './bloodRequest.interface'

const createRequest = async (requestData: TBloodRequest) => {
  console.log(requestData)
}

const getAllRequest = async () => {
  console.log('all request')
}

const getRequestDetails = async (id: string) => {
  console.log(id)
}

const myRequests = async (id: string) => {
  console.log(id)
}

const updateRequest = async (id: string) => {
  console.log(id)
}

const deleteRequest = async (id: string) => {
  console.log(id)
}

export const bloodRequestServices = {
  createRequest,
  getAllRequest,
  getRequestDetails,
  myRequests,
  updateRequest,
  deleteRequest,
}
