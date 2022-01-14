import { observer } from 'mobx-react-lite';
import React, { FC, useContext,  useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import {NavLink, useLocation, } from 'react-router-dom'
import { Context } from '..';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';



const Auth:FC = observer(() => {
   const {userStore} = useContext(Context)
    const location = useLocation()
    const isLogin= location.pathname===LOGIN_ROUTE
    const [login,setLogin] = useState('')
    const [pass,setPass] = useState('')
    
    const loginF = ()=>{
       userStore.login(login,pass)
       console.log(userStore.isAuth)
    }
    const registrationF = ()=>{
        userStore.registration(login,pass)
        
    }

    return (
        
<Container className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>

           <Card style={{width:600,borderRadius:'1.2rem'}} className='p-5'>
               <h2 className='m-auto'>{isLogin?'Авторизация':'Регистрация'}</h2>
            <Form className='d-flex flex-column'
> 
<Form.Control 
className='mt-3' 
placeholder='Введите Логин' 
onChange={e=>setLogin(e.target.value)}
/>

<Form.Control 
className='mt-3' 
placeholder='Введите Пароль' 
type="password" 
onChange={e=>setPass(e.target.value)}
/>
<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
{isLogin?

    <div> 
        Нет аккаунта ? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь</NavLink>
    </div>
            :
        <div> 
        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
    </div>

}
    <Button 
    style={{marginTop:12}}
    variant='outline-primary'
    onClick={()=>{isLogin?loginF():registrationF()}}
    > 
    {isLogin ? 'Войти':'Зарегестрироваться'}
    </Button>
</Row>
            </Form>
           </Card>
        </Container>
        
    );
})

export default Auth;