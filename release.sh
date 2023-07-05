#!/bin/bash

# 如果以下任意命令执行失败直接退出
set -e

# 获取软件版本号（手动更新） & 提交记录（自动获取）
VERSION=1.0.0
COMMITS=`git log | grep ^commit | wc -l | xargs`

if [! -z "$DOCKER_REPO" -a ! -z "$DOCKER_USER" -a ! -z "$DOCKER_PASS"]; then
  echo "登录docker hub"
  docker login "$DOCKER_REPO" -u "$DOCKER_USER" -p "$DOCKER_PASS"

  BRANCH=`git branch | grep ^\* | cut -d ' ' -f 2`
  TAG="$VERSION.$COMMITS"

  if [$BRANCH = "master"]; then
    echo "制作并发布镜像$DOCKER_REPO:$TAG"
    docker build -t "$DOCKER_REPO:$TAG"
    docker push "$DOCKER_REPO:$TAG"

else
  echo "未配置镜像仓库身份认证信息, 无法发布镜像。"

exit 0