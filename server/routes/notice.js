const Router = require('express')
const router = new Router()
const noticeController = require('../controllers/noticeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
router.get('/',checkRoleMiddleware("ADMIN"),noticeController.get)
router.post('/',noticeController.post)




module.exports= router