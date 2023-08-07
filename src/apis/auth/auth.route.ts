import * as Auth from '@/apis/auth/local/local-auth.controller'

/** 公共路由 */
const AuthRoutes: App.Route[] = [
  //  登录
  {
    path: '/login',
    method: 'POST',
    middlewares: [Auth.signIn],
    permission: 'public'
  },
  //  注册
  {
    path: '/register',
    method: 'POST',
    middlewares: [Auth.signUp],
    permission: 'public'
  },
  //  登出
  {
    path: '/logout',
    method: 'POST',
    middlewares: [Auth.signOut],
    permission: 'public'
  }
]

export { AuthRoutes }
