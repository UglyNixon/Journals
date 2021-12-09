const express= require('express')
const models = require('./models/models')
require('dotenv').config()
const cors = require('cors')
const sequelize= require('./db')
const router = require('./routes/index')
const PORT = process.env.PORT||5000
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const app = express()


app.use(cors())
app.use(express.json())
app.use('/api',router)

app.use(errorHandler)

const start = async ()=>{

try {
   await sequelize.authenticate()
   await sequelize.sync()
   app.listen(PORT,()=> console.log('****Server start on port****',PORT))
} catch (error) {
    
}

}

start()
