import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'], // entry files
  clean: true, // clean dist folder before build
  declaration: true, // generate declaration files
  rollup: {
    emitCJS: true, // generate commonjs bundle
  },
})
