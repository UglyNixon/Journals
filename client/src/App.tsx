import { FC, useContext, useEffect } from 'react';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from 'mobx-react-lite'
import { Context } from '.';


const App :FC =()=>{
  const {userStore} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth()
    }
   
  }, [])
  return (
   <BrowserRouter>
   <NavBar/>
   <AppRouter/>
   </BrowserRouter>
  );
}

export default observer(App);
