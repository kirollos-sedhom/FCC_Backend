let express = require('express');
let bodyParser = require("body-parser")
require("dotenv").config()
let app = express();
let myHtml = __dirname + "/views/index.html"



app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.get("/", (req,res)=>{
    res.sendFile(myHtml)
})
let publicFolder = __dirname + "/public"
app.use("/public", express.static(publicFolder))

app.get("/json", (req,res)=>{
    let message = "Hello json"
    if (process.env.MESSAGE_STYLE === "uppercase"){
        message = "HELLO JSON"
    }   
    res.json({
        "message":message,
        
    })
})

app.get("/now", (req,res,next)=>{
    req.time = new Date().toString()
    next()
}, function(req,res){
    res.json({
        "time":req.time
    })
})

app.get("/:word/echo", (req,res,next)=>{
    let userWord = req.params.word
    res.json({
        "echo": userWord
    })
    next()
})

app.get("/name", (req,res,next)=>{
    const fname = req.query.first
    const lname = req.query.last
    res.json({
        name: `${fname} ${lname}`
    })

})

app.post("/name", (req,res,next)=>{
    res.json({
        name: `${req.body.first} ${req.body.last}`
    })
})

































 module.exports = app;
