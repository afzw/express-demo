/** 分页器 */
class Paging {
  /** 每页数据量 */
  public limit = 10
  /** 跳过的数据量 */
  public skip = 0
  /** 排序依据 */
  public orderField: string | null = null
  /** 是否倒序 */
  public descend = false

  constructor(pojo: Pojo) {
    const { limit, skip, orderField, descend } = pojo

    if (typeof limit === 'number' || typeof Number(limit) === 'number') this.limit = Number(limit)
    if (typeof skip === 'number' || typeof Number(skip) === 'number') this.skip = Number(skip)
    if (orderField && typeof orderField === 'string') this.orderField = orderField
    if (typeof descend === 'boolean') this.descend = descend
  }
}

export default Paging
