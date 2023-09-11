// 配置multer，生成文件上传器
// 使用到的中间件 - multer：https://github.com/expressjs/multer

import path from 'path'
import multer from 'multer'
import config from '@/_config/config'

/**
 * multer配置
 * - 目标路径
 */
const multerOpts: multer.Options = {
  dest: config.uploadDir
}

const multerUploader = multer(multerOpts)

export { multerUploader }
