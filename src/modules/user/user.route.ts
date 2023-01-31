import * as User from '@/modules/user/curd.controller'
import * as UserGetter from '@/modules/user/getter.controller'

const userRoutes: App.Route[] = [
  //  查询用户
  {
    path: '/users',
    method: 'GET',
    middlewares: [User.search],
    permission: 'admin'
  },
  //  获取用户个人简介
  {
    path: '/profile',
    method: 'GET',
    middlewares: [UserGetter.getProfile],
    permission: 'user'
  }
]

export default userRoutes
