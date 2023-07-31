import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import {
  buildOutput,
  pkgRoot,
  projRoot,
  setPluginPackageName,
  tnuiVue3UniappPluginPackage,
} from '@tuniao-plugin/build-utils'
import { dest, parallel, series, src } from 'gulp'
import { run, withTaskName } from './src'

import type { TaskFunction } from 'gulp'

// 复制插件基础文件
export const copyPluginBaseFiles = () =>
  Promise.all([
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(buildOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'LICENSE'),
      path.resolve(buildOutput, 'LICENSE')
    ),
    copyFile(
      path.resolve(projRoot, 'CHANGELOG.md'),
      path.resolve(buildOutput, 'CHANGELOG.md')
    ),
  ])

// 复制源代码文件
export const copyPluginSourceFiles = () => {
  return src(`${pkgRoot}/src/**`).pipe(dest(`${buildOutput}`))
}

// 处理插件的 package.json
export const handlePackageJson = () => {
  return src(`${tnuiVue3UniappPluginPackage}`)
    .pipe(setPluginPackageName())
    .pipe(dest(`${buildOutput}`))
}

export const build: TaskFunction = series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(buildOutput, { recursive: true })),
  parallel(copyPluginBaseFiles, copyPluginSourceFiles),
  handlePackageJson
)

export default build

export * from './src'
