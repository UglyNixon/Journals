const { User, TokenSchema } = require("../models/models")
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const mailService = require('./mail-service')
const tokemService = require("./tokem-service")
const UserDto = require("../dtos/user-dto")
const apiError = require('../error/ApiError')
const ApiError = require("../error/ApiError")
require('dotenv').config()
class UserService {

     async registration (login,password,role='USER') {
         const candidate = await User.findOne({where:{login}})
         if (candidate) {
             throw apiError.badRequest(`пользователь с таким логином ${login} уже существует`)
         }
         const hashPassword = await bcrypt.hash(password,3)
         const activationLink =uuid.v4()
         let mail =`brokan.as@gmail.com` // УДАЛИТЬ ПОТОМ
         const user = await User.create({
             login:login,
             password:hashPassword,
             role:role,
             activationLink:activationLink

         })
         await mailService.sendActivationMail(mail,`${process.env.API_URL}/api/user/activate/${activationLink}`)
         let userDto = new UserDto(user)
         const tokens= await tokemService.generateTokens({...userDto})
         await tokemService.saveToken(userDto.id,tokens.refreshToken)
         return {
             ...tokens,
             user:userDto
         }
     }
     async activate(activateLink){
         
         const user = await User.findOne({where:{activationLink:activateLink}})
         
         if (!user) {
             throw apiError.badRequest ('некоректная сслыка для активации')
         }
         user.isActivated=true;
         await user.save()

     }
     async login (login,password) {
         const user =await User.findOne({where:{login}})
         
         if (!user) {
             throw ApiError.badRequest('Пользователь не найден')
         }
         const isPassEquals = await bcrypt.compare(password,user.password)
         
         if (!isPassEquals) {
             throw ApiError.badRequest('Неверный пароль')
         }
         const userDto = new UserDto(user)
         const tokens =await tokemService.generateTokens({...userDto})
         
         await tokemService.saveToken(userDto.id,tokens.refreshToken)
         return {...tokens,user:userDto}
     }
     async logout (refreshToken) {
      
         const token = await tokemService.removeToken(refreshToken)
         return token
     }
     async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        
        const userData = await tokemService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokemService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unAuthorized();
        }
        const user = await User.findOne({where:{id:userData.id}})
        const userDto = new UserDto(user)
        const tokens = await tokemService.generateTokens({...userDto}); 
       
        await tokemService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
     }
}

module.exports= new UserService()