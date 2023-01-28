import { FilterQuery, HydratedDocument, Types, UpdateQuery, Model, Query } from "mongoose"

export interface UserProps {
    /**
     * 数据库唯一标识
     */
    _id?: Types.ObjectId
    /**
     * 邮箱
     */
    email: string
    /**
     * 用户名
     */
    username: string
    /**
     * 密码
     */
    password: string
    /**
     * 盐
     */
    salt?: string
    /**
     * 角色名数组
     */
    roles?: string[]
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 是否删除
     */
    deleted?: boolean
    /**
     * 用户昵称
     */
    nickname?: string
    /**
     * 用户头像保存路径
     */
    avatar?: string
    /**
     * 上次活跃时间
     */
    activedAt?: Date
    /**
     * 删除时间
     */
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
}

export type UserFilter = FilterQuery<UserProps>
export type UserUpdate = UpdateQuery<UserProps>
export type UserDoc = HydratedDocument<UserProps>
export type UserKey = keyof UserProps
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
