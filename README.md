# Express-Demo

基于 Express.js 框架实现，基础功能齐全，简单，快速。

## 分支介绍

本分支是一个简单的 express 项目的最佳实践。

我们不以技术角色（`route`, `controller`, `service`, `model`等）进行分类，而是把每一种模型相关的全部内容都放在同一个目录（modules）下。
同时，我们也提供了难免会出现的子模块（理解为业务概念上的父子类）的写法，基于该种框架，子模块的写法非常随意，在这种模式下，类与行为委托几乎实现的作用一模一样。

如果你只需要开发非常简单的业务，业务概念之间没有很强的关联，那么这个框架将是你非常好的选择。
如果你的项目未来会有进一步的业务拓展，建议使用使用面向对象的编程思想，采用进一步的框架实现。

## 项目启动

```sh
# 在项目根目录执行以下命令：
./init.sh

# 启动开发环境
npm run dev
```

## 项目参数

- Node.js >= v16
- MongoDB >= v4.2

## 功能介绍

1. Http 路由监听
2. 用户登录/注册（本地策略）
3. 基于 rbac 的角色权限管理
4. 基于 multer 的文件上传
5. 脚本自动化执行

## 目录结构

- /root
  - [……一系列工程配置文件]
  - public：公共访问目录
  - node_modules：项目依赖
  - test：测试代码目录
  - uploads：文件上传目录
  - src 目录：源代码目录
    - assets：静态文件目录
    - [apis]：接口路由与 contrller 层代码目录（可选，业务复杂推荐启用）
    - [business]：商业逻辑目录（可选，业务复杂推荐启用）
    - config：配置文件目录
      - config.example.ts：配置文件模板
      - config.ts：配置文件
    - lib：功能方法库目录
    - loaders：项目启动程序目录
    - modules：业务数据模型目录
    - scripts：脚本目录
    - types：类型声明文件目录
    - app.ts：项目入口文件
