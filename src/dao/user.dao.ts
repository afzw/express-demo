import { UserProps } from '../entities/user/user'
import { UserModel } from '../entities/user/user.model'
import { MongooseBase } from '@/components/mongoose'

class UserDao extends MongooseBase<UserProps> {}

const userDao = new UserDao(UserModel)

export default userDao
