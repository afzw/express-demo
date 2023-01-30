# Express-Demo
基于Express.js框架实现，基础功能齐全，简单，快速。

## 项目启动
1. 基于模板生成项目配置文件
```sh
# 在项目根目录执行以下命令：
cp src/config.example.ts src/config.ts
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
1. Http路由监听
2. 用户登录/注册（本地策略）
3. 基于rbac的角色权限管理
4. 基于multer的文件上传
6. 脚本自动化执行