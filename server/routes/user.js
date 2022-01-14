const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')


router.get('/activate/:link',userController.activate)
router.get('/refresh',userController.refresh)
router.get('/users',userController.users)
router.post('/registration',
body('login').isLength({min:3,max:10}),
body('password').isLength({min:3,max:20}),
userController.registration)
router.post('/login',userController.login)
router.post('/logout',userController.logout)





module.exports= router