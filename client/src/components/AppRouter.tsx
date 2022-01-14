import React, { useContext,FC } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publickRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'


const AppRouter:FC = () => {
// const isAuth = true
const {userStore} = useContext(Context)

    return (
     
       <Routes>
{
userStore.isAuth && authRoutes.map(({path,Component})=>
<Route key={path} path={path} element={<Component/>} />
)}
{
publickRoutes.map(({path,Component})=>
<Route key={path} path={path} element={<Component/>} />
)
}
<Route path="*" element={<Navigate to ={LOGIN_ROUTE} />}/>
       </Routes>
    );
};

export default observer(AppRouter);