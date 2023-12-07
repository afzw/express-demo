import { LocalAuthController } from '@/apis/auth/local-auth.controller'

/** 公共路由 */
const AuthRoutes: App.Route[] = [
  //  登录
  {
    path: '/login',
    method: 'POST',
    middlewares: [LocalAuthController.login],
    permission: 'public'
  },
  //  注册
  {
    path: '/register',
    method: 'POST',
    middlewares: [LocalAuthController.register],
    permission: 'public'
  },
  //  登出
  {
    path: '/logout',
    method: 'POST',
    middlewares: [LocalAuthController.register],
    permission: 'public'
  }
]

export { AuthRoutes }
