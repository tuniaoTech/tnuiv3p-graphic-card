import { Transform } from 'stream'
import dotenv from 'dotenv'
import { projRoot } from './paths'
import type { TransformCallback, TransformOptions } from 'stream'
import type Vinyl from 'vinyl'

/**
 * 设置插件的名称
 */
class SetPluginPackageName extends Transform {
  pluginName = ''
  pluginAuthor = ''
  constructor(options?: TransformOptions) {
    super({ ...options, objectMode: true })

    dotenv.config({ path: `${projRoot}/.env` })
    this.pluginName = process.env.PLUGIN_NAME || ''
    this.pluginAuthor = process.env.PLUGIN_AUTHOR || ''
  }

  // 内容处理
  handleContent(content: string): string {
    // 将package.json中的包名设置为插件的名称和修改作者名称
    // 先将读取到的内容转换为JSON对象
    const pkg = JSON.parse(content)
    // 设置包名
    pkg.name = `tnuiv3p-${this.pluginName}`
    // 设置作者
    pkg.author = this.pluginAuthor

    // 将JSON对象转换为字符串,并返回
    return JSON.stringify(pkg, null, 2)
  }

  _transform(
    file: Vinyl,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(
        new Transform({
          transform: (chunk, _, cb) => {
            cb(null, Buffer.from(this.handleContent(chunk.toString())))
          },
        })
      )
    }

    if (file.isBuffer()) {
      file.contents = Buffer.from(this.handleContent(file.contents.toString()))
    }

    callback(null, file)
  }
}

export function setPluginPackageName(
  options?: TransformOptions
): SetPluginPackageName {
  return new SetPluginPackageName(options)
}
