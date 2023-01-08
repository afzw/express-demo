import {
  Model,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  HydratedDocument,
  UpdateWriteOpResult,
  QueryWithHelpers,
  PopulateOptions,
  Types,
} from "mongoose";
import mongodb from "mongodb";
/* -------------------- 新建 -------------------- */
/**
 * 新建文档
 * @param model mongoose文档模型（Model）
 * @param createDoc 新建文档对象
 * @returns 新创建的文档
 */
export function create<D>(
  model: Model<D>,
  createDoc: D
): Promise<HydratedDocument<D>> {
  return model.create(createDoc);
}
/**
 * 新建多个文档
 * @param model mongoose文档模型（Model）
 * @param createDocs 新建文档对象
 * @returns 新创建的文档
 */
export function createDocs<D>(
  model: Model<D>,
  createDocs: D[]
): Promise<HydratedDocument<D>[]> {
  return model.create(createDocs);
}
/* -------------------- 统计 -------------------- */
/**
 * 统计文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @returns 文档数量
 */
export function countDocuments<D>(
  model: Model<D>,
  filter: FilterQuery<D>
): QueryWithHelpers<number, HydratedDocument<D>> {
  return model.countDocuments(filter);
}

/**
 * 新建多个文档
 * @param model mongoose文档模型（Model）
 * @param createDoc 新建文档对象
 * @returns 新建结果
 */
export function insertMany<D>(
  model: Model<D>,
  newDocs: D[]
): Promise<Array<HydratedDocument<D>>> {
  return model.insertMany(newDocs);
}

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
export function findOneAndUpdate<D>(
  model: Model<D>,
  filter: FilterQuery<D>,
  update: UpdateQuery<D>,
  options?: QueryOptions
): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
  return model.findOneAndUpdate(filter, update, options);
}

/**
 * 更新某文档，返回更新（前/后，由`options`中的`new`选项确定）结果。
 * 也常用于`判断是否存在，不存在就创建`的情况。
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param update 更新(的)文档
 * @param options 选项
 * @returns 更新（前/后）的文档
 */
export function findByIdAndUpdate<D>(
  model: Model<D>,
  _id: mongodb.ObjectId | any,
  update: UpdateQuery<D>,
  options?: QueryOptions
): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
  return model.findByIdAndUpdate(_id, update, options);
}

/**
 * 更新某文档，返回操作结果
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param update 更新(的)文档
 * @param options 选项
 * @returns 更新操作结果
 */
export function updateOne<D>(
  model: Model<D>,
  filter: FilterQuery<D>,
  update: UpdateQuery<D>,
  options?: QueryOptions
) {
  return model.updateOne(filter, update, options);
}

/**
 * 更新某些文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param update 更新(的)文档
 * @param options 选项
 * @returns 更新操作结果
 */
export function updateMany<D>(
  model: Model<D>,
  filter: FilterQuery<D>,
  update: UpdateQuery<D>,
  options?: QueryOptions
): QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<D>> {
  return model.updateMany(filter, update, options);
}

/* -------------------- 查询 -------------------- */
/**
 * 筛选查找某些文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param projection 映射字段
 * @param options 查询选项
 * @returns 筛选查询后的文档数组
 */
export function find<D>(
  model: Model<D>,
  filter: FilterQuery<D>,
  projection?: unknown | null,
  options?: QueryOptions
): QueryWithHelpers<Array<HydratedDocument<D>>, HydratedDocument<D>> {
  return model.find(filter, projection, options);
}

/**
 * 筛选查找某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param projection 映射字段
 * @param options 查询选项
 * @returns 筛选查询后的文档
 */
export function findOne<D>(
  model: Model<D>,
  filter: FilterQuery<D>,
  projection?: unknown | null,
  options?: QueryOptions
): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
  return model.findOne(filter, projection, options);
}

/**
 * 通过ID查找某文档
 * @param model mongoose文档模型（Model）
 * @param id 文档ID
 * @param projection 映射字段
 * @param options 查询选项
 * @returns 筛选查询后的文档
 */
export function findById<D>(
  model: Model<D>,
  id: string | Types.ObjectId,
  projection?: unknown | null,
  options?: QueryOptions
): QueryWithHelpers<HydratedDocument<D>, HydratedDocument<D>> {
  return model.findById(id, projection, options);
}

/**
 * 筛选查找某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param projection 映射字段
 * @param options 查询选项
 * @returns 筛选查询后的文档
 */
export function distinct<D>(
  model: Model<D>,
  filed: string,
  filter: FilterQuery<D>
): QueryWithHelpers<Array<string>, HydratedDocument<D>> {
  return model.distinct(filed as string, filter);
}

/* -------------------- 查询并删除 -------------------- */
/**
 * 删除某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @returns 被删除的文档
 */
export function findOneAndDelete<D>(
  model: Model<D>,
  filter: FilterQuery<D>
) {
  return model.findOneAndDelete(filter);
}

/**
 * 删除某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @returns 删除操作结果
 */
export function deleteOne<D>(
  model: Model<D>,
  filter: FilterQuery<D>
): QueryWithHelpers<mongodb.DeleteResult, HydratedDocument<D>> {
  return model.deleteOne(filter);
}

/**
 * 删除某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @returns 删除操作结果
 */
export function deleteMany<D>(
  model: Model<D>,
  filter: FilterQuery<D>
): QueryWithHelpers<mongodb.DeleteResult, HydratedDocument<D>> {
  return model.deleteMany(filter);
}

/* -------------------- 关联文档 -------------------- */
/**
 * 关联某些文档
 * @param model mongoose文档模型（Model）
 * @param docs 需要关联的文档
 * @param options 查询选项
 * @returns 关联之后的文档数组
 */
export function populateDocs<D>(
  model: Model<D>,
  docs: Array<unknown>,
  options: string | PopulateOptions | PopulateOptions[]
): Promise<Array<HydratedDocument<D>>> {
  return model.populate(docs, options);
}
/**
 * 关联某文档
 * @param model mongoose文档模型（Model）
 * @param docs 需要关联的文档
 * @param options 查询选项
 * @returns 关联之后的文档数组
 */
export function populateDoc<D>(
  model: Model<D>,
  doc: unknown,
  options: string | PopulateOptions | PopulateOptions[]
): Promise<HydratedDocument<D>> {
  return model.populate(doc, options);
}