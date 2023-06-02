import { Schema, model } from 'mongoose'
import { UserMethods, UserModelType, UserProps, UserQueryHelpers, UserVirtuals } from '@/entities/user/user'

/* --------------------------------- Mongoose实现 --------------------------------- */
//  【Mongoose】定义用户Schema
const userSchema = new Schema<UserProps, UserModelType, UserMethods, UserQueryHelpers, UserVirtuals>(
  {
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
      // select: false,
      required: true
    },
    salt: {
      type: String,
      // select: false,
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
  },
  {
    timestamps: true
  }
)

//  定义Schema虚拟值
userSchema.virtual('normal').get(function () {
  return !this.disabled && !this.deleted
})
userSchema.virtual('symbol').get(function () {
  return `${this.username}-${this.email}`
})
//  定义用户集合实例方法
userSchema.method('isRole', function isRole(roleName: string, only = false) {
  return only ? this.roles.includes(roleName) && this.roles.length === 1 : this.roles.includes(roleName)
})
userSchema.method('hasRoles', function hasRoles(roleNames: string[], only = false) {
  if (only) return roleNames.every(roleName => this.roles.includes(roleName)) && roleNames.length === this.roles.length
  else return roleNames.every(roleName => this.roles.includes(roleName))
})
//  定义用户集合查询助手方法
userSchema.query.oneById = function (id: string) {
  return this.findOne({ _id: id })
}
userSchema.query.oneByEmail = function (email: string) {
  return this.findOne({ email })
}
userSchema.query.oneByUsername = function (username: string) {
  return this.findOne({ username })
}
userSchema.query.byNickname = function (nickname: string) {
  return this.find({ nickname })
}

//  【Mongoose】编译用户Model
export const UserModel = model<UserProps, UserModelType>('user', userSchema)

export default UserModel
