import bcrypt from 'bcryptjs'
import { config } from '../config/config'

export const hashedPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, Number(config.salt_round))

  return hash
}
