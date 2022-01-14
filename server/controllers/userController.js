const { model } = require("../db");
const bcrypt = require('bcrypt')
const {User,Make} = require('../models/models');
const ApiError = require("../error/ApiError");
const JWT= require('jsonwebtoken');
const UserService = require('../service/user-service');
const {validationResult} = require('express-validator');
const userService = require("../service/user-service");



class UserController {
    // POST
    async registration (req,res,next) {
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('ошибка валидации',errors))
            }
            const {login,password}= req.body
            const userData = await UserService.registration(login,password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async login (req,res,next) {
        try {

            const {login,password} = req.body
            const userData = await UserService.login(login,password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout (req,res,next){
        try {
            const {refreshToken} =req.cookies;
            const user = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
    // GET


    async activate(req,res,next){
        try {
            const activationLink=req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }

    async refresh(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken)
            console.log(userData)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async users(req,res,next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
  
}

module.exports = new UserController()