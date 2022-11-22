import * as User from '@/src/modules/user/curd.controller'
import * as UserGetter from '@/src/modules/user/getter.controller'

const userRoutes: App.Route[] = [
  //  新增用户
  {
    path: '/users',
    method: 'POST',
    middlewares: [User.create],
    permission: 'admin'
  },
  //  修改用户
  {
    path: '/users',
    method: 'PUT',
    middlewares: [],
    permission: 'admin'
  },
  //  查询用户
  {
    path: '/users',
    method: 'GET',
    middlewares: [User.retrieve],
    permission: 'admin'
  },
  //  删除用户
  {
    path: '/users',
    method: 'DELETE',
    middlewares: [],
    permission: 'admin'
  },
  //  获取用户信息
  {
    path: '/profile',
    method: 'GET',
    middlewares: [UserGetter.getProfile],
    permission: 'user'
  },
]

export default userRoutes