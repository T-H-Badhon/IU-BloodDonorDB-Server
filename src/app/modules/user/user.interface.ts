export type TPasswordHistory = {
  password: string
  usedAt: Date
}

export type TUser = {
  email: string
  password: string
  role: 'admin' | 'donor' | 'super-admin'

  passwordChangeAT?: Date
  passwordHistory?: [TPasswordHistory]
  isBlocked?: boolean
}
