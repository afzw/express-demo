import * as ftp from 'basic-ftp'
import callAsync from '@/lib/callAsync'
import { Readable, Writable } from 'stream'
import { AppError } from '@/lib/error'

class FTPService {
  /**
   * 建立一个FTP连接：生成FTP客户端，并连接至FTP服务器。
   * @return 已连接至FTP服务器的FTP客户端。
   */
  private static async _establishAnFTPConnection(accessOptions: ftp.AccessOptions): Promise<ftp.Client> {
    const client = new ftp.Client()
    client.ftp.verbose = true

    const [connectErr] = await callAsync(client.access(accessOptions))
    if (connectErr) throw new AppError({ message: `ftp客户端连接ftp服务端失败 => ${connectErr.message}` })

    /** 该客户端已连接至FTP服务器 */
    return client
  }

  /**
   * 关闭FTP连接
   * @param client 已建立连接的FTP客户端
   */
  private static _closeAnFTPConnection(client: ftp.Client): void {
    client.close()
  }

  /**
   * 上传文件到FTP服务器
   * @description 建立连接 => 上传文件 => 关闭连接
   * @param serverInfo FTP服务器信息
   * @param source 源(路径 / 可读流)
   * @param target 目标(路径)
   */
  public static async connectAndUploadFileToFTPServer(
    serverInfo: FTP.ServerInfo,
    source: string | Readable,
    target: string
  ): Promise<void> {
    const [connectErr, client] = await callAsync(this._establishAnFTPConnection(serverInfo))
    if (connectErr) throw new AppError({ message: `建立FTP连接失败 => ${connectErr}` })

    const [uploadErr] = await callAsync(client.uploadFrom(source, target))
    if (uploadErr) throw new AppError({ message: `上传文件到FTP服务器失败 => ${uploadErr}` })

    this._closeAnFTPConnection(client)
  }

  /**
   * 从FTP服务器上下载文件
   * @description 建立连接 => 下载文件 => 关闭连接
   * @param serverInfo FTP服务器信息
   * @param source 源(路径)
   * @param target 目标(路径 | 可写流)
   */
  public static async connectAndDownloadFileFromFTPServer(
    serverInfo: FTP.ServerInfo,
    source: string,
    target: string | Writable
  ): Promise<void> {
    const [connectErr, client] = await callAsync(this._establishAnFTPConnection(serverInfo))
    if (connectErr) throw new AppError({ message: `建立FTP连接失败 => ${connectErr}` })

    const [downloadErr] = await callAsync(client.downloadTo(target, source))
    if (downloadErr) throw new AppError({ message: `下载文件到FTP服务器失败 => ${downloadErr}` })

    this._closeAnFTPConnection(client)
  }
}

export { FTPService }
