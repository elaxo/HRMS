require('dotenv').config({path:'./.env'})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const {Info} = require('./service/debug')
const router = require('./routes')
const app = express()
app.use(helmet())        // helmet middleware 
app.use(compression())   // compression middle
app.use(cors())          ///cors middleware
app.use(bodyParser.urlencoded({ extended: false }))  //body parser
app.use(bodyParser.json())                           //body parser
app.disable('x-powered-by')
app.use(router)


app.listen(process.env.PORT,()=>{Info("Server is running on port "+process.env.PORT)})
