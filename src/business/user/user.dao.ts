import { UserProps } from '../../modules/user/user'
import { UserModel } from '../../modules/user/user.model'
import { MongooseBase } from '@/components/mongoose'

class UserDao extends MongooseBase<UserProps> {}

const userDao = new UserDao(UserModel)

export default userDao
