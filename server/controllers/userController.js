const { model } = require("../db");
const bcrypt = require('bcrypt')
const {User,Make} = require('../models/models');
const ApiError = require("../error/ApiError");
const JWT= require('jsonwebtoken');



class UserController {

    async registration (req,res,next){
            const {login,password,role,code} = req.body
            if (!login ||!password) {
                return next(ApiError.badRequest('Некоректный логин или пароль'))
            }
            const candidate = await User.findOne({where:{login}})
            if (candidate) {
                return next(ApiError.badRequest('Такой пользователь существует'))
            }
            const hashPassword = await bcrypt.hash(password,5)
            const user = await User.create({login,password:hashPassword,role,code})
            const make = await Make.create({code,userId:user.id})
            const jwt = JWT.sign({id:user.id,login,role,code},process.env.KEY,{expiresIn:'600h'})
            return res.json({jwt})
    }


    async login (req,res,next){
        const {login,password} = req.body
        const user = await User.findOne({where:{login}})
        if (!login) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const jwt = JWT.sign({id:user.id,login:user.login,role:user.role,code:user.code},process.env.KEY,{expiresIn:'600h'})
        return res.json({jwt})
    }
    async auth (req,res,next){
        res.json({message:'works'})
    }
}

module.exports = new UserController()