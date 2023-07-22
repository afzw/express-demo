import { UserProps, UserModel } from '@/entities/user.model'
import { MongooseBase } from '@/dao/utils'

class UserDao extends MongooseBase<UserProps> {}

const userDao = new UserDao(UserModel)

export default userDao
