const Router = require('express')

const router = new Router()
const makeController = require('../controllers/makeContorller')

router.get('/make',makeController.get)
router.post('/make',makeController.post)

module.exports= router