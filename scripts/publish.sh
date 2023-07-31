#!/bin/sh

# 使用说明
# ./publish.sh [type] [version]
# type: 版本类型，可选值：latest、beta、alpha、rc，默认值：latest
# version: 子版本号

# 一旦某个命令执行失败（返回非零值），脚本就会立即退出，不再执行后续命令
set -e

# 在安装依赖时冻结 package-lock.json 或 npm-shrinkwrap.json 文件，即禁止在安装过程中生成或更新这两个文件，以确保依赖版本的一致性
# pnpm i --frozen-lockfile

# 获取当前需要设置的版本类型
type='latest'
if [ $1 ]; then
  type=$1
fi
version=$2

pnpm update:version $type $version

pnpm build

cd dist
npm publish --tag $type
cd - # 切换当前工作目录到之前的目录

echo "✅ Publish Success"