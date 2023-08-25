import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'play', 'src', 'packages')
export const tnuiVue3UniappPluginRoot = resolve(
  pkgRoot,
  'tnui-vue3-uniapp-plugin'
)

export const buildRoot = resolve(projRoot, 'internal', 'build')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

export const tnuiVue3UniappPluginPackage = resolve(
  tnuiVue3UniappPluginRoot,
  'package.json'
)
