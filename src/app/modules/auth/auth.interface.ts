export type TLoginCredential = {
  email?: string
  phone?: string
  password: string
}

export type TChangePasswordCredential = {
  currentPassword: string
  newpassword: string
}
