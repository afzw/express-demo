import * as AuthController from '@/apis/auth/auth.controller'
import { API_AUTH_SIGN_IN, API_AUTH_SIGN_OUT, API_AUTH_SIGN_UP } from './auth.api'

/** 身份认证路由 */
const AuthRoutes: App.Route[] = [
  //  登录
  {
    path: API_AUTH_SIGN_IN,
    method: 'POST',
    middlewares: [AuthController.signIn],
    permission: 'public'
  },
  //  注册
  {
    path: API_AUTH_SIGN_UP,
    method: 'POST',
    middlewares: [AuthController.signUp],
    permission: 'public'
  },
  //  登出
  {
    path: API_AUTH_SIGN_OUT,
    method: 'POST',
    middlewares: [AuthController.signOut],
    permission: 'user'
  }
]

export default AuthRoutes
