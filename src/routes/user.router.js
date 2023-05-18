const { signUp } = require('../controller/registration.controller')
const userRouter = require('express').Router()

userRouter.post('/signup', signUp)


module.exports = userRouter