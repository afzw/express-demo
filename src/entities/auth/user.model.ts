import { Schema, model, FilterQuery, HydratedDocument, UpdateQuery, Model, Query, LeanDocument } from 'mongoose'

export interface UserProps extends App.User {
  /**
   * 邮箱
   */
  email: string
  /**
   * 用户名
   */
  //username: string
  /**
   * 用户昵称
   */
  //nickname?: string
  /**
   * 用户头像保存路径
   */
  //avatar?: string
  /**
   * 密码
   */
  password: string
  /**
   * 盐
   */
  salt: string
  /**
   * 数据库文档创建时间，不应与业务耦合。
   */
  createdAt?: Date
  /**
   * 数据库文档更新时间，不应与业务耦合。
   */
  updatedAt?: Date
}

/**
 * 业务属性名。
 */
export type UserKey = keyof UserProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type UserDoc = HydratedDocument<UserProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type UserDocPojo = LeanDocument<UserDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type UserDocPojoKey = keyof UserDocPojo
/**
 * mongoose 查询对象
 */
export type UserFilter = FilterQuery<UserProps>
/**
 * mongoose 更新对象
 */
export type UserUpdate = UpdateQuery<UserProps>
/* --------------------------------- 接口定义 --------------------------------- */
//  【Mongoose】用户实例方法接口：定义用户集合文档实例的方法
interface UserMethods {
  /**
   * 判断用户是否为某种角色
   * @param roleName 所判断的角色名称
   * @param only 默认`false`，若置为`true`，则判断用户是否**仅仅**为某种角色
   */
  isRole(roleName: string, only?: boolean): boolean
}

type UserModelQuery = Query<unknown, HydratedDocument<UserProps>, UserQueryHelpers> & UserQueryHelpers

interface UserQueryHelpers {
  oneById(this: UserModelQuery, id: string): UserModelQuery
  oneByEmail(this: UserModelQuery, email: string): UserModelQuery
}

//interface UserVirtuals {
//  symbol: string
//}

//  【Mongoose】定义用户Model类型
type UserModelType = Model<UserProps, UserQueryHelpers, UserMethods>

//  【Mongoose】定义用户Model扩展类型，可以为扩展的Model添加静态方法
//  一般情况下用不到，若有需要，可以进行拓展，注意将下文中的UserModelType改为extendedUserModelType
//  文档请见：https://mongoosejs.com/docs/typescript/statics-and-methods.html#statics
// interface extendedUserModelType extends UserModelType {}

/* --------------------------------- Mongoose实现 --------------------------------- */
//  【Mongoose】定义用户Schema
const userSchema = new Schema<UserProps, UserModelType, UserMethods, UserQueryHelpers>(
  {
    email: {
      type: String,
      index: true,
      required: true,
      unique: true
    },
    // username: {
    //   type: String,
    //   index: true,
    //   required: true,
    //   unique: true
    // },
    // nickname: String,
    // avatar: String,
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    // status: {
    //   type: Number,
    //   default: 1
    // },
    activeAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
)

// 虚拟值
// userSchema.virtual('symbol').get(function () {
//   return `${this.username}-${this.email}`
// })
//  定义用户集合查询助手方法
userSchema.query.oneById = function (id: string) {
  return this.findOne({ _id: id })
}
userSchema.query.oneByEmail = function (email: string) {
  return this.findOne({ email })
}

//  【Mongoose】编译用户Model
export const UserModel = model<UserProps, UserModelType>('user', userSchema)

export default UserModel
