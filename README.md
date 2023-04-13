# Express-Demo

基于 Express.js 框架实现，基础功能齐全，简单，快速。

## 分支简介

之前我做过一个 express 项目，敏捷开发，逐步迭代。
刚上来这个项目只有一个版本，后来这个项目卖给了越来越多的客户，而且每个客户都有其定制化的需求。
于是，这个项目多出了很多的分支，每次更新通用功能都要更新所有分支，直接无法维护。

后面我接手这个项目，我在想，有没有办法能够在一个版本中区分开各种定制化需求，形成一条条逻辑清晰且互不干扰的业务线呢？

其实做面向对象开发的朋友可能很熟悉，基于依赖注入的控制反转方案是一个经典的方案。
于是我在 ts+node 的世界中找寻这种办法，后来就发现了`inversifyJS`这个项目。

经过了一系列的调研，我最终确定了技术方案：`inversifyJS` + `inversify-express-utils` + `mongoose discriminator(鉴别器)`.

本分支提供了一个使用这种技术方案的 demo，提供给那些想要在 express 项目中运用基于依赖注入实现控制反转的朋友。

- [InversifyJS 官网](https://inversify.io/)
- [InversifyJS GitHub](https://github.com/inversify/InversifyJS)
- [InversifyJS npm](https://www.npmjs.com/package/inversify)
- [适用于 express 应用的 InversifyJS 插件`inversify-express-utils`](https://www.npmjs.com/package/inversify-express-utils)
- [推荐阅读](https://chinabigpan.github.io/inversifyjs_docs_cn/routes/ecosystem/utilities/utilities.html)
- [mongoose 鉴别器](https://mongoosejs.com/docs/discriminators.html)

## 项目启动

1. 基于模板生成项目配置文件

```sh
# 在项目根目录执行以下命令：
cp src/config/config.example.ts src/config/config.ts
```

2. 项目依赖安装

```sh
npm i
```

3. 项目启动

```sh
npm run dev
```

## 项目参数

- Node.js >= v14
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
