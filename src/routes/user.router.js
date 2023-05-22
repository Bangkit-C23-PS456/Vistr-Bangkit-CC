const { signIn } = require('../controller/signin.controller');
const { signUp } = require('../controller/signup.controller');
const userRouter = require('express').Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);

module.exports = userRouter;
