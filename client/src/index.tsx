import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import UserStore from './store/UserStore';
interface State {
  userStore:UserStore
}
export const userStore = new UserStore()
export const Context= createContext<State>({userStore})
document.body.style.background='linear-gradient(132.88deg,#ececec 29.77%,#91d6dd 91.7%)'
// document.body.style.height='100VH'
ReactDOM.render(
<Context.Provider value={{
  userStore
}}>
<App/>
</Context.Provider>,
  document.getElementById('root')
);

