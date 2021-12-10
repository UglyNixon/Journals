import Admin from './pages/Admin'
import Auth from './pages/Auth'
import CreateWorker from './pages/CreateWorker'
import Menu from './pages/Menu'
import { ADMIN_ROUTE, LOGIN_ROUTE, MENU_ROUTE, REGISTRATION_ROUTE } from './utils/consts'
export const authRoutes = [
 {
     path:ADMIN_ROUTE,
     Component:Admin
 },
 {
     path:REGISTRATION_ROUTE,
     Component:CreateWorker
 }
 ,
 {
     path:MENU_ROUTE,
     Component:Menu
 }

]

export const publickRoutes = [

    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
]