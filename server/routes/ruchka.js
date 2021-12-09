const Router = require('express')
const router = new Router()
const ruchkaController = require('../controllers/ruchkaController')

router.get('/',ruchkaController.get)
router.post('/',ruchkaController.post)
router.get('/FS',ruchkaController.getFS)
router.post('/FS',ruchkaController.postFS)



module.exports= router