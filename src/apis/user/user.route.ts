import * as User from '@/apis/user/curd.controller'
import * as UserGetter from '@/apis/user/getter.controller'
import { API_USER_SEARCH, API_PROFILE } from './user.api'

/** 用户模块路由 */
const UserRoutes: App.Route[] = [
  {
    path: API_USER_SEARCH,
    method: 'GET',
    middlewares: [User.search],
    permission: 'admin'
  },
  {
    path: API_PROFILE,
    method: 'GET',
    middlewares: [UserGetter.getProfile],
    permission: 'user'
  }
]

export default UserRoutes
