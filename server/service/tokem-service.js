const jwt= require('jsonwebtoken')
const { TokenSchema } = require('../models/models')
require('dotenv').config()

class TokenService {
 
 async   generateTokens (payload){
      
const accessToken =  await jwt.sign(payload,process.env.JWT_KEY_ACCESS,{expiresIn:'30m'})
const refreshToken = await jwt.sign(payload,process.env.JWT_KEY_REFRESH,{expiresIn:'30d'})

return {
    accessToken,
    refreshToken
}
 }
 async saveToken (Id,refreshToken){ 
     const tokenData =await TokenSchema.findOne({where:{userId:Id}})
     if (tokenData) {
         tokenData.refreshToken =refreshToken
        return  await tokenData.save()
     }
     const token = await TokenSchema.create ({
         refreshToken:refreshToken,
         userId:Id
     })
     return token

 }
 async removeToken(refreshToken) {
  
     const token = await TokenSchema.destroy({where:{refreshToken}})
     return token
 }
 async validateAccessToken(token) {
     try {
         const userData = await jwt.verify(token,process.env.JWT_KEY_ACCESS);
         return userData
     } catch (error) {
         return null
     }

 }
 async validateRefreshToken(token) {
    try {
  
        const userData =  await jwt.verify(token,process.env.JWT_KEY_REFRESH);
        
        return userData
    } catch (error) {
        
        return null
    }

 }
 async findToken(refreshToken) {
    const tokenData = await TokenSchema.findOne({where:{refreshToken:refreshToken}})
    return tokenData;
}
}

module.exports= new TokenService()