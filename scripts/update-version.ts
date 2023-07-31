import consola from 'consola'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { errorAndExit, getPlayPackages } from '@tuniao-plugin/build-utils'
import type { Project } from '@pnpm/find-workspace-packages'

async function main() {
  dotenv.config()
  consola.log(chalk.cyan('Start loading env...'))
  const tagVersion = process.env.TAG_VERSION
  const gitHead = process.env?.GIT_HEAD || ''

  if (tagVersion === undefined || gitHead === undefined) {
    errorAndExit(
      new Error(
        'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n'
      )
    )
  }

  const args = process.argv.slice(2)
  const updateType = args?.[0] ?? 'latest' // latest | beta | alpha | rc
  // alpha版：内部测试版。α是希腊字母的第一个，表示最早的版本，一般用户不要下载这个版本，这个版本包含很多BUG，功能也不全，主要是给开发人员和 测试人员测试和找BUG用的
  // beta版：公开测试版。β是希腊字母的第二个，一般公开测试版会在α版之后发布，一般情况下，α版测试没有问题了，就会发布β版，这个版本主要是给一般用户测试和提出意见的，这个版本也可能有BUG，但是和最终版本相比，BUG应该会少一些
  // rc版：候选版本。rc是英文单词release candidate的缩写，意思是候选版本。这个版本已经相当成熟了，基本上不存在BUG，除非有重大问题需要修改。这个版本主要是给程序员和开发商测试和提bug用的，如果这个版本没有问题，就可以发布正式版本了
  // latest版：最终版本。这个版本就是最终发布给用户的版本，前面的版本都是给程序员和测试人员测试用的，这个版本就是给最终用户使用的，所以也叫最终版
  const updateNumber = args?.[1]

  consola.log(chalk.cyan('Start updating version...'))
  consola.log(chalk.cyan(`$TAG_VERSION: ${tagVersion}`))
  consola.log(chalk.cyan(`$GIT_HEAD: ${gitHead}`))
  consola.log(chalk.cyan(`$UPDATE_TYPE: ${updateType}`))
  consola.log(chalk.cyan(`$UPDATE_NUMBER: ${updateNumber}`))

  consola.debug(chalk.yellow('Updating package.json from tuniao'))

  // const pkgs = Object.fromEntries(
  //   (await getWorkspacePackages()).map((pkg) => [pkg.manifest.name!, pkg])
  // )

  const playPkgs = Object.fromEntries(
    (await getPlayPackages()).map((pkg) => [pkg.manifest.name!, pkg])
  )
  const tuniaoUIVue3UniappPlugin = playPkgs['tnuiv3p-plugin']

  // 生成最终的版本号
  let packageVersion = ''
  // 获取当前版本号
  const currentVersion = tuniaoUIVue3UniappPlugin.manifest.version || ''
  // const currentVersion = '1.0.0'
  // 通过正则表达式获取版本号的相关信息
  const versionReg = /^([\d+.]+)(-(\w+)\.(\d+))*$/
  const versionInfo = versionReg.exec(currentVersion)
  // const mainVersion = versionInfo?.[1] || ''
  let versionType = ''
  let versionNumber = 0
  if (versionInfo?.[2]) {
    versionType = versionInfo[3]
    versionNumber = Number(versionInfo[4])
  }
  // 判断当前需要更新的版本类型
  // 如果是latest版本只改变主版本号
  if (updateType === 'latest') {
    packageVersion = tagVersion
  } else {
    if (updateType === versionType && !updateNumber) {
      versionNumber++
      packageVersion = `${tagVersion}-${updateType}.${versionNumber}`
    } else {
      packageVersion = `${tagVersion}-${updateType}.${updateNumber ?? 1}`
    }
  }
  consola.log(chalk.gray(`Package Version: ${packageVersion}`))

  const writeVersion = async (project: Project) => {
    if (!project) return
    await project.writeProjectManifest({
      ...project.manifest,
      version: packageVersion,
      gitHead,
    } as any)
  }

  try {
    await writeVersion(tuniaoUIVue3UniappPlugin)
  } catch (err: any) {
    errorAndExit(err)
  }

  consola.debug(chalk.green(`$GIT_HEAD: ${gitHead}`))
  consola.success(chalk.green(`Git head updated to ${gitHead}`))
}

main()
