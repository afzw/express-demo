import { uploadSingleFile } from '@/loaders/middleware/multer'
import { FileController } from './file.controller'

const FileRoutes: App.Route[] = [
  // 分片上传文件（前端多次请求上传分片，上传后分片会立即被合并）
  {
    path: '/files/partly',
    method: 'POST',
    middlewares: [uploadSingleFile('file'), FileController.uploadFilePart],
    permission: 'public'
  }
]

export { FileRoutes }
