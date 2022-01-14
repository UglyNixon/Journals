const jwt= require('jsonwebtoken')
const ApiError = require('../error/ApiError');
const tokemService = require('../service/tokem-service');

module.exports = 
function (req,res,nexts){
 try {
     const authorizationHeader = req.headers.authorization;
     if (!authorizationHeader) {
         return nexts(ApiError.unAuthorized())
     }
     const accessToken = authorizationHeader.split(' ')[1]
     if (!accessToken) {
        return nexts(ApiError.unAuthorized())
     }
     const userData= tokemService.validateAccessToken(accessToken)
     if (!userData) {
        return nexts(ApiError.unAuthorized())
     }
     req.user=userData
     next()
    
 } catch (error) {
     return nexts(ApiError.unAuthorized())
 }
}
