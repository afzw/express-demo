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
