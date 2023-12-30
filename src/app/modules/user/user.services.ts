const getAllUser = async () => {
  console.log('All users')
}
const getSingleUser = async (id: string) => {
  console.log(id)
}
const changeBlockState = async (id: string) => {
  console.log(id)
}

export const userServices = {
  getAllUser,
  getSingleUser,
  changeBlockState,
}
