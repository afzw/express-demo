// 配置multer，生成文件上传器
// 使用到的中间件 - multer：https://github.com/expressjs/multer

import path from 'path'
import multer from 'multer'
import config from '@/_config/config'

/**
 * 使用multer上传文件的路径
 * 这是一个临时上传目录，目录中的内容会定时清理，如果需要长时间保存，请使用saveFile方法将其移动到不会自动清理的目录。
 */
const DESTPATH = path.join(config.uploadDir, 'temp')

/**
 * multer配置
 * - 目标路径
 */
const multerOpts: multer.Options = {
  dest: DESTPATH
}

const multerUploader = multer(multerOpts)

export { multerUploader }
