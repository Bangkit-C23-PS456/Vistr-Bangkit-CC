const { signIn } = require('../controller/signin.controller');
const userRouter = require('express').Router();

// userRouter.post('/signup', signUp); Ganti controller
userRouter.post('/signin', signIn);

module.exports = userRouter;
