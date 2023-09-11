import fsp from 'fs/promises'
import fs from 'fs'
import { Stream } from 'node:stream'

/**
 * 递归创建目录
 * @description 根据给定的目录路径*递归*创建目录。目录已存在的话，不会报错。
 * @param dirPath 待创建的目录路径
 * @returns 新目录路径
 */
export async function createDirRecursively(dirPath: string): Promise<string | undefined> {
  return fsp.mkdir(dirPath, { recursive: true })
}

/**
 * 移动文件（重命名文件）。
 * @description 将旧位置的文件移动到新位置。
 * @param oldPath 旧路径
 * @param newPath 新路径
 * @returns void
 */
export async function moveFile(oldPath: string, newPath: string): Promise<void> {
  return fsp.rename(oldPath, newPath)
}

/**
 * 删除文件
 * @param filePath 待删除的文件路径
 * @returns void
 */
export async function deleteFile(filePath: string): Promise<void> {
  return fsp.unlink(filePath)
}

/**
 * 删除目录
 * @description 同`rm -rf`，*强制递归*删除目录，也能直接删除文件。目录不存在不会报错。
 * @param dirPath 待强制删除的目录路径
 */
export async function deleteDir(dirPath: string): Promise<void> {
  return fsp.rm(dirPath, { recursive: true, force: true })
}

/**
 * 同步检查给定路径是否存在文件或者文件夹
 * @param path 需要检查的路径
 * @returns
 */
export function existsSync(path: string): boolean {
  return fs.existsSync(path)
}

/**
 * 移动文件（重命名文件）。
 * @description 将文件复制到新位置。
 * @param sourcePath 源路径
 * @param targetPath 目标路径
 * @returns void
 */
export async function copyFile(sourcePath: string, targetPath: string): Promise<void> {
  return fsp.copyFile(sourcePath, targetPath)
}

/**
 * 创建文件
 * @param path 文件路径
 * @param data 需要写入的内容
 * @returns void
 */
export async function writeFile(
  path: string,
  data:
    | string
    | NodeJS.ArrayBufferView
    | Iterable<string | NodeJS.ArrayBufferView>
    | AsyncIterable<string | NodeJS.ArrayBufferView>
    | Stream
): Promise<void> {
  return fsp.writeFile(path, data)
}
