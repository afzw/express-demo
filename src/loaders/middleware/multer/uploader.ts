// 配置multer，生成文件上传器
// 使用到的中间件 - multer：https://github.com/expressjs/multer

import path from 'path'
import multer from 'multer'
import config from '@/_config/config'

/** 使用multer上传文件的路径 */
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
