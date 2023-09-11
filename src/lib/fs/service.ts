import path from 'path'
import callAsync from '@/lib/utils/callAsync'
import { moveFile, createDirRecursively, deleteFile } from '@/lib/fs/base'
import { getFileNameByPath } from '@/lib/fs/utils'
import AppError from '../error'

/**
 * 保存文件
 * @description 保存源文件到目标目录下。（源文件的名称会添加后缀成为唯一命名）
 * @param sourcePath 源文件路径（绝对路径）
 * @param destDir 目标目录路径（绝对路径）
 * @returns 保存后的文件路径（绝对路径）
 */
export async function saveFile(sourcePath: string, destDir: string): Promise<string> {
  const [createDirErr] = await callAsync(createDirRecursively(destDir))
  if (createDirErr) throw new AppError({ message: `生成目标目录失败 => ${createDirErr}` })

  const savedfileName = getFileNameByPath(sourcePath)
  const destPath = path.join(destDir, savedfileName)
  const [moveFileErr] = await callAsync(moveFile(sourcePath, destPath))
  if (moveFileErr) {
    deleteFile(sourcePath).catch(err => console.log(`移动文件失败后，删除源文件失败 => ${err}`))
    throw new AppError({ message: `移动源文件到目标目录下失败 => ${moveFileErr}` })
  }

  return destPath
}
