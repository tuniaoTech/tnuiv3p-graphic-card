import process from 'process'
import consola from 'consola'

/**
 * 输出错误信息并退出进程
 * @param err 错误信息
 */
export function errorAndExit(err: Error): never {
  consola.error(err)
  process.exit(1)
}
