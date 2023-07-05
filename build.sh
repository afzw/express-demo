#!/bin/bash

echo "你好1"
# 如果以下任意命令执行失败直接退出
set -e

echo "你好"

# 生成项目配置
cp config/config.example.ts config/config.ts

# 安装项目依赖
npm i

exit 0