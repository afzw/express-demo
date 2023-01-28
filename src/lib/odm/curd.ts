import {
  Model,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  HydratedDocument,
  QueryWithHelpers
} from "mongoose";
import mongodb from "mongodb";

const Curd = {
  /* -------------------- 新建 -------------------- */
  /**
   * 新建文档
   * @param model mongoose文档模型（Model）
   * @param createDoc 新建文档对象
   * @returns 新创建的文档
   */
  create<D>(model: Model<D>, createDoc: D): Promise<HydratedDocument<D>> {
    return model.create(createDoc)
  },

  /**
   * 新建多个文档
   * @param model mongoose文档模型（Model）
   * @param createDoc 新建文档对象
   * @returns 新建结果
   */
  insertMany<D>(
    model: Model<D>,
    newDocs: D[]
  ): Promise<Array<HydratedDocument<D>>> {
    return model.insertMany(newDocs);
  },

  /* -------------------- 查询并更新 -------------------- */
  /**
   * 更新某文档，返回更新（前/后，由`options`中的`new`选项确定）结果。
   * 也常用于`判断是否存在，不存在就创建`的情况。
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @param update 更新(的)文档
   * @param options 选项
   * @returns 更新（前/后）的文档
   */
  findOneAndUpdate<D>(
    model: Model<D>,
    filter: FilterQuery<D>,
    update: UpdateQuery<D>,
    options?: QueryOptions
  ): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
    return model.findOneAndUpdate(filter, update, options);
  },

  /**
   * 更新某些文档
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @param update 更新(的)文档
   * @param options 选项
   * @returns 更新操作结果
   */
  updateMany<D>(
    model: Model<D>,
    filter: FilterQuery<D>,
    update: UpdateQuery<D>,
    options?: QueryOptions
  ): QueryWithHelpers<mongodb.UpdateResult, HydratedDocument<D>> {
    return model.updateMany(filter, update, options);
  },

  /* -------------------- 查询并删除 -------------------- */
  /**
   * 删除某文档
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @returns 被删除的文档
   */
  findOneAndDelete<D>(
    model: Model<D>,
    filter: FilterQuery<D>,
    options?: QueryOptions
  ): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
    return model.findOneAndDelete(filter, options);
  },

  /**
   * 删除某文档
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @returns 删除操作结果
   */
  deleteMany<D>(
    model: Model<D>,
    filter: FilterQuery<D>
  ): QueryWithHelpers<mongodb.DeleteResult, HydratedDocument<D>> {
    return model.deleteMany(filter);
  },

  /* -------------------- 查询 -------------------- */
  /**
   * 筛选查找某些文档
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 查询选项
   * @returns 筛选查询后的文档数组
   */
  find<D>(
    model: Model<D>,
    filter: FilterQuery<D>,
    projection?: unknown | null,
    options?: QueryOptions
  ): QueryWithHelpers<Array<HydratedDocument<D>>, HydratedDocument<D>> {
    return model.find(filter, projection, options);
  },

  /**
   * 筛选查找某文档
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 查询选项
   * @returns 筛选查询后的文档
   */
  findOne<D>(
    model: Model<D>,
    filter: FilterQuery<D>,
    projection?: unknown | null,
    options?: QueryOptions
  ): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
    return model.findOne(filter, projection, options);
  },

  /**
   * 统计文档数量
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @returns 文档数量
   */
  countDocuments<D>(
    model: Model<D>,
    filter: FilterQuery<D>
  ): QueryWithHelpers<number, HydratedDocument<D>> {
    return model.countDocuments(filter);
  },

  /**
   * 筛选查找某文档
   * @param model mongoose文档模型（Model）
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 查询选项
   * @returns 筛选查询后的文档
   */
  distinct<D>(
    model: Model<D>,
    filed: string,
    filter: FilterQuery<D>
  ): QueryWithHelpers<Array<string>, HydratedDocument<D>> {
    return model.distinct(filed as string, filter);
  }
}

export default Curd
