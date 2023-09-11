import express from 'express'
import { multerUploader } from './uploader'

/**
 * 上传单个文件
 * req.file is the <filedName> file
 * req.body will hold the text fields, if there were any
 *
 * @param filedName 上传文件的字段名
 */
const uploadSingleFile = (filedName: string): express.RequestHandler => {
  return multerUploader.single(filedName)
}

/**
 * 上传多个文件
 * req.files is array of <filedName> files
 * req.body will contain the text fields, if there were any
 *
 * @param filedName 上传文件的字段名
 * @param maxCount 最大上传数量
 */
const uploadMultiFiles = (filedName: string, maxCount?: number): express.RequestHandler => {
  return multerUploader.array(filedName, maxCount)
}

/**
 * 类型定义：自定义上传多个文件的参数（单个）
 */
interface uploadCustomFilesParam {
  /** 上传文件的字段名 */
  name: string
  /** 某字段名的文件的最大上传数量 */
  maxCount: number
}

/**
 * 自定义上传多个文件
 * req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
 *
 * e.g.
 *  req.files['avatar'][0] -> File
 *  req.files['gallery'] -> Array
 *
 * req.body will contain the text fields, if there were any
 *
 * @param params 自定义上传多个文件的参数
 */
const uploadCustomFiles = (params: uploadCustomFilesParam[]): express.RequestHandler => {
  return multerUploader.fields(params)
}

export { uploadSingleFile, uploadMultiFiles, uploadCustomFiles }
