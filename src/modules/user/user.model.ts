import { Schema, model, Model, Query, HydratedDocument } from 'mongoose'
import { UserProps } from '@/modules/user/user'

/* --------------------------------- 接口定义 --------------------------------- */
//  【Mongoose】用户实例方法接口：定义用户集合文档实例的方法
interface UserMethods {
  /**
   * 判断用户是否为某种角色
   * @param roleName 所判断的角色名称
   * @param only 默认`false`，若置为`true`，则判断用户是否**仅仅**为某种角色
   */
  isRole(roleName: string, only?: boolean): boolean
  /**
   * 判断用户是否拥有某些角色
   * @param roleNames 所判断的角色名称数组
   * @param only 默认`false`，若置为`true`，则判断用户是否**仅仅**拥有某些角色
   */
  hasRoles(roleNames: string[], only?: boolean): boolean
}

type UserModelQuery = Query<any, HydratedDocument<UserProps>, UserQueryHelpers> & UserQueryHelpers

interface UserQueryHelpers {
  oneById(this: UserModelQuery, id: string): UserModelQuery
  oneByEmail(this: UserModelQuery, email: string): UserModelQuery
  oneByUsername(this: UserModelQuery, username: string): UserModelQuery
  byNickname(this: UserModelQuery, nickname: string): UserModelQuery
}

interface UserVirtuals {
  normal: boolean
  symbol: string
}

//  【Mongoose】定义用户Model类型
type UserModelType = Model<UserProps, UserQueryHelpers, UserMethods, UserVirtuals>

//  【Mongoose】定义用户Model扩展类型，可以为扩展的Model添加静态方法
//  一般情况下用不到，若有需要，可以进行拓展，注意将下文中的UserModelType改为extendedUserModelType
//  文档请见：https://mongoosejs.com/docs/typescript/statics-and-methods.html#statics
// interface extendedUserModelType extends UserModelType {}

/* --------------------------------- Mongoose实现 --------------------------------- */
//  【Mongoose】定义用户Schema
const userSchema = new Schema<UserProps, UserModelType, UserMethods, UserQueryHelpers, UserVirtuals>({
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  username: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  roles: [String],
  disabled: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  nickname: String,
  avatar: String,
  activedAt: String,
  deletedAt: Date
}, {
  timestamps: true
})

//  定义Schema虚拟值
userSchema.virtual('normal').get(function() {
  return !this.disabled && !this.deleted
})
userSchema.virtual('symbol').get(function() {
  return `${this.username}-${this.email}`
})
//  定义用户集合实例方法
userSchema.method('isRole', function isRole(roleName: string, only = false) {
  return only ? (this.roles.includes(roleName) && this.roles.length === 1) : (this.roles.includes(roleName))
})
userSchema.method('hasRoles', function hasRoles(roleNames: string[], only = false) {
  if (only) return roleNames.every(roleName => this.roles.includes(roleName)) && roleNames.length === this.roles.length
  else return roleNames.every(roleName => this.roles.includes(roleName))
})
//  定义用户集合查询助手方法
userSchema.query.oneById = function(id: string) {
  return this.findOne({ _id: id })
}
userSchema.query.oneByEmail = function(email: string) {
  return this.findOne({ email })
}
userSchema.query.oneByUsername = function(username: string) {
  return this.findOne({ username })
}
userSchema.query.byNickname = function(nickname: string) {
  return this.find({ nickname })
}

//  【Mongoose】编译用户Model
const UserModel = model<UserProps, UserModelType>("user", userSchema)

export {
  UserMethods,
  UserQueryHelpers,
  UserVirtuals,
  UserModel
}