import Admin from './pages/Admin'
import Auth from './pages/Auth'
import CreateWorker from './pages/CreateWorker'
import Journals from './pages/Journals'
import Pribory from './pages/journals/Pribory'
import Menu from './pages/Menu'
import Reports from './pages/Reports'
import { ADMIN_ROUTE, JOURNAL_ROUTE, LOGIN_ROUTE, MENU_ROUTE, PRIBORY_FORM_ROUTE, REGISTRATION_ROUTE, REPORT_ROUTE } from './utils/consts'
export const authRoutes = [
 {
     path:ADMIN_ROUTE,
     Component:Admin
 }
 ,
 {
     path:MENU_ROUTE,
     Component:Menu
 },
 {
     path:JOURNAL_ROUTE,
     Component:Journals
 },
 {
     path:REPORT_ROUTE,
     Component:Reports
 },
 {
     path:PRIBORY_FORM_ROUTE,
     Component:Pribory
 }

]

export const publickRoutes = [

    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    
 {
     path:REGISTRATION_ROUTE,
     Component:Auth
 }
]