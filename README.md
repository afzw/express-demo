# Express-Demo

基于 Express.js 框架实现的一个 demo 框架，基础功能齐全，可基于该 demo 快速进行业务开发。

## 项目参数

- Node.js >= v18
- MongoDB >= v4.2

## 快速开始

### 项目开发

```sh
# 在项目根目录下：
npm run prepare # （可选）安装husky
npm run initial     # 项目初始化
npm run dev   # 启动开发环境
```

### 构建上线（通过 github actions 实现 ci）

- 在 github repo 中配置`actions secrets`.
  - DOCKER_REPO - docker 仓库，例如`John/express-demo`.
  - DOCKER_USER - docker 用户, 例如`John`
  - DOCKER_PASS - docker 用户密码.
- 代码提交到 github repo，自动执行 github actions。

## 功能介绍

- RESTFUL API
- 用户登录/注册（本地策略）
- 基于`rbac`的角色权限管理
- 基于`multer`实现文件的上传
- 支持自定义脚本

## 目录结构

- /
  - assets: 静态资源目录
  - public：公开资源目录
  - logs: 系统日志目录
  - uploads：系统文件上传目录
  - node_modules：项目依赖目录
  - src：源代码目录
    - \_config: 项目配置目录
      - config.example.ts：配置文件模板
      - config.ts：配置文件
    - apis：接口路由与 contrller 层代码目录
    - business：商业逻辑目录
    - components: 功能组件目录
    - dao: 数据访问层目录
    - entities：数据模型目录
    - lib: 公共库目录
    - loaders：项目启动程序目录
    - plugins: 插件目录（服务启动时自动加载）（TODO）
    - scripts：脚本目录(服务启动时自动加载，每个同名文件仅会加载一次)
    - types：全局类型声明文件目录
    - index.ts：项目入口文件
  - [……一系列工程配置文件]
