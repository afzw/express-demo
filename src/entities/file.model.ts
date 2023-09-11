import path from 'path'
import { Schema, model, FilterQuery, HydratedDocument, LeanDocument, UpdateQuery } from 'mongoose'

/* --------------------------- 业务属性  --------------------------- */
/**
 * 属性
 */
export interface FileProps {
  /** 文件名称(用户上传文件时文件的名称) */
  name: string
  /** 文件的保存路径 */
  path: string
  /** 文件大小 */
  size: number
  /** 数据库文档创建时间，不应与业务耦合。 */
  createdAt?: Date
  /** 数据库文档更新时间，不应与业务耦合。 */
  updatedAt?: Date
}

/* --------------------------- odm (mongoose) 相关  --------------------------- */
/**
 * 业务属性名。
 */
export type FileKey = keyof FileProps
/**
 * mongoose文档，包含mongoose内置操作，不能直接更改内部的属性。
 */
export type FileDoc = HydratedDocument<FileProps>
/**
 * mongoose文档的Pojo格式，可以直接操作。
 * 若您想修改数据库中查询出的文档，您应该使用该种类型。
 */
export type FileDocPojo = LeanDocument<FileDoc>
/**
 * mongoose文档的Pojo格式的属性名。
 */
export type FileDocPojoKey = keyof FileDocPojo
/**
 * mongoose 查询对象
 */
export type FileFilter = FilterQuery<FileProps>
/**
 * mongoose 更新对象
 */
export type FileUpdate = UpdateQuery<FileProps>

export const fileSchema = new Schema<FileProps>(
  {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

fileSchema.virtual('ext').get(function () {
  return this.name.substring(this.name.lastIndexOf('.') + 1)
})

const FileModel = model<FileProps>('file', fileSchema)

export default FileModel
