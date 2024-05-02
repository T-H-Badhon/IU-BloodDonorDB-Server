import { TUser } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'
import { hashedPassword } from './hashedPassword'

export const seedSuperAdmin = async () => {
  const isExsist = await User.find({ role: 'super-admin' })

  if (!isExsist.length) {
    const superAdminData: TUser = {
      email: 'thbadhons@gmail.com',
      password: await hashedPassword('super1234'),
      role: 'super-admin',
    }

    const seed = await User.create(superAdminData)

    console.log(seed)
  }
}
