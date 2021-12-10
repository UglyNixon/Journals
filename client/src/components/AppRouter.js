import React, { useContext } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publickRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
const AppRouter = () => {
// const isAuth = true
const {user} = useContext(Context)
console.log(user.isAuth)
    return (
     
       <Routes>
{
user.isAuth && authRoutes.map(({path,Component})=>
<Route key={path} path={path} element={<Component/>} exact/>
)}
{
publickRoutes.map(({path,Component})=>
<Route key={path} path={path} element={<Component/>} exact/>
)
}
<Route path="*" element={<Navigate to ={LOGIN_ROUTE} />}/>
       </Routes>
    );
};

export default AppRouter;