import React, { useContext,FC} from 'react';
import {Navbar,Form,Nav, Button} from "react-bootstrap"
import {NavLink,Link,  useNavigate} from 'react-router-dom'
import styles from '../styles/mystyle.module.css';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

import { ADMIN_ROUTE, JOURNAL_ROUTE, LOGIN_ROUTE, MENU_ROUTE, REPORT_ROUTE } from '../utils/consts';
import { IUser } from '../http/models/IUser';

const NavBar:FC = observer(() => {
    const navigate=useNavigate()
    const {userStore} = useContext(Context);
    const outFunc= ()=>{
     userStore.setUser({} as IUser);
     userStore.setAuth(false);
     localStorage.removeItem('token')
    }
    return (
    
    <Navbar className={styles.NavBar}>

    <Link to={MENU_ROUTE} className={styles.links}>HOME</Link>
    <Nav   className="mr-auto ml-5">
    <NavLink to={JOURNAL_ROUTE} className={[styles.links,styles.text].join(' ')}>Журналы</NavLink>
    <NavLink to={REPORT_ROUTE} className={[styles.links,styles.text].join(' ')}>Отчеты</NavLink>

    </Nav>
    <Form  className={styles.nav}> 
    {/* FORM inline error */}
     {userStore.isAuth ?
                <Nav >
                <Button variant="outline-light" className={styles.text} style={{marginLeft:6}} onClick={()=>navigate(ADMIN_ROUTE)}>Админ панель</Button>
                <Button variant="outline-light" className={styles.text} style={{marginLeft:6}} onClick={()=>outFunc()}>Выход</Button>
                </Nav>
                :
                <Nav>
               
                <Button variant="outline-light" className={styles.text}  onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
     }
    </Form>
  </Navbar>
    
    );
})

export default NavBar;