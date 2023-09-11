/**
 * 根据提供的文件路径，获取文件名(带有后缀)。
 * @param path 文件路径
 * @returns 文件名称（带有后缀）
 */
export function getFileNameByPath(path: string): string {
  const result = path.slice(path.lastIndexOf('/'))
  return result
}

/**
 * 根据提供的文件路径，获取文件的目录路径。
 * @param path 文件路径
 * @returns 目录路径
 */
export function getDirByPath(path: string): string {
  const result = path.slice(0, path.lastIndexOf('/'))
  return result
}

/**
 * 生成唯一的文件名称
 * @param originName 原文件名
 * @returns 唯一的文件名
 */
export function makeUniqFileName(originName: string): string {
  const barray = originName.split('.')
  barray.splice(-1, 0, String(Math.ceil(Math.random() * 10000)), String(Math.ceil(Math.random() * 1000)))
  const uniqName = barray.join('.').replace(/(\(|\)|\[|\]| )/g, '_')
  return uniqName
}
