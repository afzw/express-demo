# Express-Demo

基于 Express.js 框架实现，基础功能齐全，简单，快速。

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
