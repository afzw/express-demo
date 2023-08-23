#!/bin/bash

# 运行结果前，执行运行的命令，有利于复杂脚本调试
# 脚本只要发生错误，就终止执行（包括管道命令）
set -euxo pipefail

# 获取软件版本号（手动更新） & 提交记录（自动获取）
VERSION=1.0.0
COMMITS=$(git log | grep ^commit | wc -l | xargs)

# 记录版本号
echo "$VERSION.$COMMITS" >./public/VERSION

if [ ! -z "$DOCKER_REPO" -a ! -z "$DOCKER_USER" -a ! -z "$DOCKER_PASS" ]; then
	echo "登录docker hub"
	docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"

	BRANCH=$(git branch | grep ^\* | cut -d ' ' -f 2)
	TAG="$VERSION.$COMMITS"

	if [ $BRANCH = "master" ]; then
		echo "制作并发布镜像$DOCKER_REPO:$TAG"
		docker build -t "$DOCKER_REPO:$TAG" .
		docker push "$DOCKER_REPO:$TAG"
	fi

else
	echo "未配置镜像仓库身份认证信息, 无法发布镜像。"
fi

exit 0
