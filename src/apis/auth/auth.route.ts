import { LocalAuthController } from '@/apis/auth/local-auth.controller'
import { AuthController } from './auth.controller'

/** 公共路由 */
const authRoutes: App.Route[] = [
  {
    path: '/login',
    method: 'POST',
    middlewares: [LocalAuthController.login],
    permission: 'public'
  },
  {
    path: '/register',
    method: 'POST',
    middlewares: [LocalAuthController.register],
    permission: 'public'
  },
  {
    path: '/logout',
    method: 'POST',
    middlewares: [LocalAuthController.logout],
    permission: 'public'
  },
  {
    path: '/profile',
    method: 'GET',
    middlewares: [AuthController.getProfile],
    permission: 'user'
  }
]

export { authRoutes }
