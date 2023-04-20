import { UserModel } from './user.model'
import { MongooseBase } from '@/components/mongoose'

class UserDao extends MongooseBase {}

const userDao = new UserDao(UserModel)

export default userDao
