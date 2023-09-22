import path from 'path'
import callAsync from '@/lib/utils/callAsync'
import { moveFile, createDirRecursively, deleteFile, readFile, appendFile } from '@/lib/fs/base'
import { getFileNameByPath } from '@/lib/fs/utils'
import AppError from '../error'

/** 保存文件的选项 */
interface SaveOptions {
  /** 指定保存后的文件名 */
  name: string
}

/**
 * 保存文件
 * @description 保存源文件到目标目录下。（源文件的名称会添加后缀成为唯一命名）
 * @param {string} sourcePath 源文件路径（绝对路径）
 * @param {string} destDir 目标目录路径（绝对路径）
 * @paran {Object} [options] 保存文件的选项
 * @param {string} [options.name] 指定保存后的文件名
 * @returns 保存后的文件路径（绝对路径）
 */
export async function saveFile(sourcePath: string, destDir: string, options?: SaveOptions): Promise<string> {
  const [createDirErr] = await callAsync(createDirRecursively(destDir))
  if (createDirErr) throw new AppError({ message: `生成目标目录失败 => ${createDirErr}` })

  const savedfileName = options?.name ? options.name : getFileNameByPath(sourcePath)
  const destPath = path.join(destDir, savedfileName)
  const [moveFileErr] = await callAsync(moveFile(sourcePath, destPath))
  if (moveFileErr) {
    deleteFile(sourcePath).catch(err => console.log(`移动文件失败后，删除源文件失败 => ${err}`))
    throw new AppError({ message: `移动源文件到目标目录下失败 => ${moveFileErr}` })
  }

  return destPath
}

/**
 * 合并文件
 * @description 将源文件追写到目标文件中
 * @param {string} sourcePath 源文件路径
 * @param {string} targetPath 目标文件
 */
export async function mergeFile(sourcePath: string, targetPath: string): Promise<void> {
  const [readErr, fileData] = await callAsync(readFile(sourcePath))
  if (readErr) throw new AppError({ message: `合并文件时，读取源文件内容失败 => ${readErr}` })

  const [appendErr] = await callAsync(appendFile(targetPath, fileData))
  if (appendErr) throw new AppError({ message: `合并文件内容失败 => ${appendErr}` })

  const [deleteErr] = await callAsync(deleteFile(sourcePath))
  if (deleteErr) console.log(`合并文件成后，删除原文件失败 => ${deleteErr}`)
}
