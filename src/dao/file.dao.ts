import FileModel from '@/entities/file.model'
import { MongooseBase } from '@/dao/utils'
import { FileProps } from '@/entities/file.model'

class FileDao extends MongooseBase<FileProps> {}

const fileDao = new FileDao(FileModel)

export default fileDao
