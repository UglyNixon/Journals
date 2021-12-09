const Router = require('express')
const router = new Router()
const userRouter = require('./user')
const makeRouter = require('./make')
const ruchkaRouter = require('./ruchka')
const noticeRouter = require('./notice')

router.use('/user',userRouter)
router.use('/make',makeRouter)
router.use('/ruchka',ruchkaRouter)
router.use('/notice',noticeRouter)



module.exports= router