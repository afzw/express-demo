import * as UserController from '@/apis/user/user.controller'

const userRoutes: App.Route[] = [
  //  查询用户
  {
    path: '/users',
    method: 'GET',
    middlewares: [UserController.search],
    permission: 'admin'
  }
]

export default userRoutes
