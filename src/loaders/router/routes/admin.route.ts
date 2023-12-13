import userRoutes from '@/apis/user/user.route'
import { addRoutes } from './util'

const __adminRoutes: App.Route[] = []

addRoutes(__adminRoutes, userRoutes)

export { __adminRoutes }
