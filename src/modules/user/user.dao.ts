import { UserProps } from './user'
import { UserModel } from './user.model'
import { MongooseBase } from '@/components/mongoose'

class UserDao extends MongooseBase<UserProps> {}

const userDao = new UserDao(UserModel)

export default userDao
