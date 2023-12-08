/** 分页参数 */
interface PagingParams {
  /** 每页数据量 */
  limit?: number
  /** 跳过的数据量 */
  skip?: number
  /** 排序依据字段 */
  orderField?: string
  /** 是否倒序 */
  descend?: boolean
}

const defaultPagingParams: PagingParams = {
  limit: 10,
  skip: 0
}

/**
 * 获取分页选项
 */
function getPagingOptions(query: Partial<PagingParams>) {
  const { limit, skip, orderField, descend } = query

  const options = Object.assign({}, defaultPagingParams)

  if (typeof limit === 'number' || typeof Number(limit) === 'number') options.limit = Number(limit)
  if (typeof skip === 'number' || typeof Number(skip) === 'number') options.skip = Number(skip)
  if (orderField && typeof orderField === 'string') options.orderField = orderField
  if (typeof descend === 'boolean') options.descend = descend

  return options
}

export { getPagingOptions }
