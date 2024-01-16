export type TLoginCredential = {
  email?: string
  phone?: string
  password: string
}

export type TChangePasswordCredential = {
  currentPassword: string
  newPassword: string
}

export type TForgetPassword = {
  email: string
}
