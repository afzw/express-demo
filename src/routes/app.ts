import { getHello } from "../handlers/app"

interface Route {
    path: string
    method: string
    middlewares: any[]
}

const AppRoutes: Route[] = [
    {
        path: '/',
        method: 'GET',
        middlewares: [getHello]
    }
]

export { Route, AppRoutes }