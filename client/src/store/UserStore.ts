import { IUser } from "../http/models/IUser";
import axios from 'axios'
import {API_URL} from '../utils/consts'
import {makeAutoObservable} from 'mobx'
import AuthService from "../http/service/AuthService";
import { AuthResponse } from "../http/models/response/AuthResponse";

export default class UserStore {
    user= {} as IUser
    isAuth = false as boolean
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool:boolean) {
        this.isAuth=bool
    }
    setUser(user:IUser){
        this.user=user
    }
    async login(login:string,pass:string){
        try {
            const response = await AuthService.login(login,pass)
            localStorage.setItem('token',response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }
    async registration(login:string,pass:string){
        try {
            const response = await AuthService.registration(login,pass)
            localStorage.setItem('token',response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }
    async logout(){
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
            return response
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth(){
            try {
                const response = await axios.get<AuthResponse>(`/user/refresh`,{
                    withCredentials:true,
                    baseURL:process.env.REACT_APP_API_URL
                })
                console.log(response.data.user)
                localStorage.setItem('token',response.data.accessToken)
                this.setAuth(true)
                this.setUser(response.data.user)
                
            } catch (e:any) {
                console.log(e.response?.data?.message)
            }

    }
}