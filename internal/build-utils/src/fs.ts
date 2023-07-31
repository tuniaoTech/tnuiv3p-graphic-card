import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'

/**
 * 将json数据写入文件
 * @param path 写入文件路径
 * @param data 数据
 * @param space 缩进字符
 */
export const writeJson = (path: string, data: any, space = 0) => {
  writeFile(path, JSON.stringify(data, undefined, space), 'utf-8')
}

/**
 * 确保文件夹存在
 * @param path 文件夹路径
 */
export const ensureDir = async (path: string) => {
  if (!existsSync(path)) await mkdir(path, { recursive: true })
}
