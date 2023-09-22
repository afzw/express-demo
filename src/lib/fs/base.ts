import fsp, { FileHandle, FlagAndOpenMode } from 'fs/promises'
import { ObjectEncodingOptions, OpenMode, PathLike } from 'fs'
import { Stream } from 'node:stream'
import { Abortable } from 'events'

/**
 * 创建目录（递归）
 * @description 根据给定的目录路径*递归*创建目录。目录已存在的话，不会报错。
 * @param dirPath 待创建的目录路径
 * @returns 新目录路径
 */
export async function createDirRecursively(dirPath: string): Promise<string | undefined> {
  return fsp.mkdir(dirPath, { recursive: true })
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
 * 删除目录（递归，暴力）
 * @description 同`rm -rf`，*强制递归*删除目录，也能直接删除文件。目录不存在不会报错。
 * @param dirPath 待强制删除的目录路径
 */
export async function deleteDir(dirPath: string): Promise<void> {
  return fsp.rm(dirPath, { recursive: true, force: true })
}

/**
 * 复制文件
 * @description 将文件复制到新位置。
 * @param sourcePath 源路径
 * @param targetPath 目标路径
 * @returns void
 */
export async function copyFile(sourcePath: string, targetPath: string): Promise<void> {
  return fsp.copyFile(sourcePath, targetPath)
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
 * 读取文件内容
 * @description 读取文件的全部内容到内存中。
 */
export async function readFile(
  path: PathLike | FileHandle,
  options?:
    | ({
        encoding?: null | undefined
        flag?: OpenMode | undefined
      } & Abortable)
    | null
): Promise<Buffer> {
  return fsp.readFile(path, options)
}

/**
 * 追加写入文件（创建、追加写入）
 */
export async function appendFile(
  path: PathLike | FileHandle,
  data: string | Uint8Array,
  options?: (ObjectEncodingOptions & FlagAndOpenMode) | BufferEncoding | null
): Promise<void> {
  return fsp.appendFile(path, data, options)
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
