import $api from '../index'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'


export default class AuthService {
    static async login (login:string,password:string) :Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/login',{login,password})
        
    }
    static async registration (login:string,password:string) :Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/registration',{login,password})
        
    }
    static async logout () :Promise<void> {
        return $api.post('/user/logout')
        
    }
}