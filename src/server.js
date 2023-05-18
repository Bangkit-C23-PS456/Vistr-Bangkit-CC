const express = require('express')
const { route } = require('./routes/user.router')
var bodyParser = require('body-parser')
const userRouter = require('./routes/user.router')
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})