import * as UserController from '@/apis/user/user.controller'

const userRoutes: App.Route[] = [
  //  查询用户
  {
    path: '/users',
    method: 'GET',
    middlewares: [UserController.search],
    permission: 'admin'
  },
  //  获取用户个人简介
  {
    path: '/profile',
    method: 'GET',
    middlewares: [UserController.getProfile],
    permission: 'user'
  }
]

export default userRoutes
