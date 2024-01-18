import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export const config = {
  db_url: process.env.DB_URL,
  port: process.env.PORT,
  ac_token: process.env.ACCESS_SECRATE,
  salt_round: process.env.SALT_ROUND,
  super_key: process.env.SUPER_KEY,
}
