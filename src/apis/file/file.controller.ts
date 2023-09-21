import callAsync from '@/lib/utils/callAsync'
import config from '@/_config/config'
import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { createDirRecursively } from '@/lib/fs/base'
import { mergeFile } from '@/lib/fs/service'
import AppError from '@/lib/error'

class FileController {
  /**
   * 上传文件（分片）
   * @description 分片上传文件（前端多次请求上传分片，上传后分片会立即被合并）。返回文件路径和当前分片编号。
   */
  public static async uploadFilePart(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const file = req.file
    const md5 = req.body.md5

    /** 文件存储目录 */
    const destDir = path.join(config.uploadDir, md5)
    /** 最终文件（合并后的文件）的路径 */
    const targetPath = path.resolve(destDir, 'target.zip')

    const [mkdirErr] = await callAsync(createDirRecursively(destDir))
    if (mkdirErr) return next(new AppError({ message: `创建目录失败 => ${mkdirErr}` }))

    const [mergeErr] = await callAsync<AppError>(mergeFile(file.path, targetPath))
    if (mergeErr) return next(mergeErr)

    const result = {
      path: targetPath,
      no: Number(file.originalname)
    }

    return res.json(result)
  }
}

export { FileController }
