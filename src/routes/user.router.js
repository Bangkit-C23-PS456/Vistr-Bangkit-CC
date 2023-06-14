const { signIn } = require('../controller/signin.controller');
const { signUp } = require('../controller/signup.controller');
const {userPreference,userIternary} = require('../controller/user.controller');
const userRouter = require('express').Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/prefrence',userPreference)
userRouter.get('/iternary', userIternary)




module.exports = userRouter;
