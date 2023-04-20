interface PagingOptions {
  /** 每页数据量 */
  limit: number
  /** 跳过的数据量 */
  skip: number
  /** 排序依据 */
  orderField: string | null
  /** 是否倒序 */
  descend: boolean
}

/** 分页器 */
class Paging {
  /**
   * 提取分页参数。
   * @param params 传入的信息
   * @return 分页参数
   */
  public static extractOptions(pojo: Pojo) {
    const { limit, skip, orderField, descend } = pojo

    /** 分页参数，初始化为默认值 */
    const result: PagingOptions = {
      limit: 10,
      skip: 0,
      orderField: null,
      descend: false
    }

    /** 处理各种参数 */
    if (typeof limit === 'number' || typeof Number(limit) === 'number') result.limit = Number(limit)
    if (typeof skip === 'number' || typeof Number(skip) === 'number') result.skip = Number(skip)
    if (orderField && typeof orderField === 'string') result.orderField = orderField
    if (typeof descend === 'boolean') result.descend = descend

    return result
  }
}

export default Paging
