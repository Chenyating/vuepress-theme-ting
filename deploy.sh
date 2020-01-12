#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git config user.name "Chenyating"
git config user.email "924471303@qq.com"

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:Chenyating/Chenyating.github.io.git master

cd -