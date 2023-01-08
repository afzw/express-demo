import fsc from 'fs'
import fsp from 'fs/promises'

/**
 * Reads the contents of a directory.
 * @param dirPath 目录路径
 */
export async function readdirp(dirPath: fsc.PathLike, options?: (fsc.ObjectEncodingOptions & { withFileTypes?: false }) | BufferEncoding) {
  return fsp.readdir(dirPath)
}
