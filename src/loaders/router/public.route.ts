/**
 * @fileoverview 公共路由
 */
import * as Auth from '@/loaders/auth/local_auth/local_auth.controller'

const publicRoutes: App.Route[] = [
  //  登录
  {
    path: '/sign-in',
    method: 'POST',
    middlewares: [Auth.signIn]
  },
  //  注册
  {
    path: '/sign-up',
    method: 'POST',
    middlewares: [Auth.signUp]
  },
  //  登出
  {
    path: '/sign-out',
    method: 'POST',
    middlewares: [Auth.signOut]
  },
  //  获取软件版本
  {
    path: '/VERSION',
    method: 'GET',
    middlewares: [Auth.getVersionInfo]
  }
]

export default publicRoutes
