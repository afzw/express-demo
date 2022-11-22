import { Model, FilterQuery, QueryOptions, UpdateQuery, ProjectionType } from "mongoose"
/* -------------------- 新建 -------------------- */
/**
 * 新建文档
 * @param model mongoose文档模型（Model）
 * @param createDoc 新建文档对象
 * @returns 新创建的文档
 */
export async function create<D>(model: Model<D>, createDoc: D) {
  return model.create(createDoc)
}

/**
 * 新建一系列文档
 * @param model mongoose文档模型（Model）
 * @param createDoc 新建文档对象
 * @returns 新建结果
 */
export async function insertmany<D>(model: Model<D>, newDocs: D[]) {
  return model.insertMany(newDocs)
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
export async function findOneAndUpdate<D>(model: Model<D>, filter: FilterQuery<D>, update: UpdateQuery<D>, options?: QueryOptions<D>) {
  return model.findOneAndUpdate(filter, update, options)
}

/**
 * 更新某文档，返回操作结果
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param update 更新(的)文档
 * @param options 选项
 * @returns 更新操作结果
 */
export async function updateOne<D>(model: Model<D>, filter: FilterQuery<D>, update: UpdateQuery<D>, options?: QueryOptions<D>) {
  return model.updateOne(filter, update, options)
}

/**
 * 更新某些文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param update 更新(的)文档
 * @param options 选项
 * @returns 更新操作结果
 */
export async function updateMany<D>(model: Model<D>, filter: FilterQuery<D>, update: UpdateQuery<D>, options?: QueryOptions<D>) {
  return model.updateMany(filter, update, options)
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
export async function find<D>(model: Model<D>, filter: FilterQuery<D>, projection?: ProjectionType<D>, options?: QueryOptions<D>) {
  return model.find(filter, projection, options)
}

/**
 * 筛选查找某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param projection 映射字段
 * @param options 查询选项
 * @returns 筛选查询后的文档
 */
export async function findOne<D>(model: Model<D>, filter: FilterQuery<D>, projection?: ProjectionType<D>, options?: QueryOptions<D>) {
  return model.findOne(filter, projection, options)
}

/**
 * 筛选查找某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param projection 映射字段
 * @param options 查询选项
 * @returns 筛选查询后的文档
 */
export async function distinct<D>(model: Model<D>, filed: keyof D & '_id', filter: FilterQuery<D>) {
  return model.distinct(filed as string, filter)
}

/* -------------------- 查询并删除 -------------------- */
/**
 * 删除某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @returns 被删除的文档
 */
export async function findOneAndDelete<D>(model: Model<D>, filter: FilterQuery<D>) {
  return model.deleteOne(filter)
}
/**
 * 删除某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @returns 删除操作结果
 */
export async function deleteOne<D>(model: Model<D>, filter: FilterQuery<D>) {
  return model.deleteOne(filter)
}

/**
 * 删除某文档
 * @param model mongoose文档模型（Model）
 * @param filter 筛选条件
 * @param cb 回调函数
 * @returns 删除操作结果
 */
export async function deleteMany<D>(model: Model<D>, filter: FilterQuery<D>, cb?: (err: any) => void) {
  if (cb) model.deleteMany(filter, cb)
  else return model.deleteMany(filter)
}