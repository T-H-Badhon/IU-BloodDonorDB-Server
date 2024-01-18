export type TPasswordHistory = {
  password: string
  usedAt: Date
}

export type TUser = {
  email: string
  password: string
  role: 'admin' | 'donor'

  passwordChangeAT: Date
  passwordHistory?: [TPasswordHistory]
  isBlocked: boolean
}
