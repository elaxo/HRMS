require('dotenv').config({path:'./.env'})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const {Info} = require('./service/debug')
const router = require('./routes')
const botRoute = require('./routes/botRoutes')
const path = require('path')
const app = express()
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))        // helmet middleware 
app.use(compression())   // compression middle
app.use(cors({
    origin:"*"
}))          ///cors middleware
app.use(bodyParser.urlencoded({ extended: false }))  //body parser
app.use(bodyParser.json())                           //body parser
app.disable('x-powered-by')
app.use(router)
app.use(botRoute)
app.use(express.static(path.join(__dirname,'uploads/avatars')))
app.get('/avatars',(req,res)=>{
    let  file = req.query.file;
    if(file == null)
    res.status(400).send("Unknown file")
    else
    res.sendFile(path.join(__dirname,'uploads/avatars',file))
})
app.use(express.static(path.join(__dirname,'uploads/documents')))
app.get('/documents',(req,res)=>{
    let  file = req.query.file;
    if(file == null)
    res.status(400).send("Unknown file")
    else
    res.sendFile(path.join(__dirname,'uploads/documents',file))
})


app.listen(process.env.PORT,()=>{Info("Server is running on port "+process.env.PORT)})
