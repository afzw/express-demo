import * as Auth from '@/apis/auth/local/local-auth.controller'

/** 公共路由 */
const __publicRoutes: App.Route[] = [
  //  获取软件版本
  {
    path: '/VERSION',
    method: 'GET',
    middlewares: [Auth.getVersionInfo]
  }
]

export default __publicRoutes
