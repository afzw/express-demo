import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from "mongoose";
import { UserModel } from "./user.model";
import { UserDoc, UserProps } from "./user";
import * as Curd from '@/lib/odm/curd'

const UserDao = {
  /**
   * 新建用户文档
   * @param createDoc 用户文档
   * @returns 新建的用户文档
   */
  async create(userInfo: UserProps): Promise<UserDoc> {
    return Curd.create(UserModel, userInfo)
  },

  /**
 * 查找用户文档并更新
 * @param filter 筛选条件
 * @param update 更新(的)文档
 * @param options 选项
 * @returns 更新（前/后）的用户文档
 */
  async findUserAndUpdate(filter: FilterQuery<UserProps>, updateDoc: UpdateQuery<UserProps>, options?: QueryOptions<UserProps>) {
    return Curd.findOneAndUpdate(UserModel, filter, updateDoc, options)
  },

  /**
   * 查找某用户文档
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 选项
   * @returns 查找的某个用户文档
   */
  async findUserByFilter(filter: FilterQuery<UserProps>, projection?: ProjectionType<UserProps>, options?: QueryOptions<UserProps>) {
    return Curd.findOne(UserModel, filter, projection, options)
  },

  /**
   * 查找某些用户文档
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 选项
   * @returns 查找的某些用户文档
   */
  async findUsersByFilter(filter: FilterQuery<UserProps>, projection?: ProjectionType<UserProps>, options?: QueryOptions<UserProps>) {
    return Curd.find(UserModel, filter, projection, options)
  }
}

export default UserDao
