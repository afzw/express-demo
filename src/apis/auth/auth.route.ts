import * as Auth from '@/apis/auth/local/local-auth.controller'

/** 公共路由 */
const AuthRoutes: App.Route[] = [
  //  登录
  {
    path: '/auth/sign-in',
    method: 'POST',
    middlewares: [Auth.signIn],
    permission: 'public'
  },
  //  注册
  {
    path: '/auth/sign-up',
    method: 'POST',
    middlewares: [Auth.signUp],
    permission: 'public'
  },
  //  登出
  {
    path: '/auth/sign-out',
    method: 'POST',
    middlewares: [Auth.signOut],
    permission: 'public'
  }
]

export { AuthRoutes }
