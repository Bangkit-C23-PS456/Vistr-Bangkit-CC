const { signIn } = require('../controller/signin.controller');
const { signUp } = require('../controller/signup.controller');
const {userPreference,userIternary, getAllUser, userPrefInput} = require('../controller/user.controller');
const userRouter = require('express').Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/prefrence',userPreference)
userRouter.get('/iternary', userIternary)
userRouter.get('/get-all-user', getAllUser)
userRouter.post('/post-pref-user', userPrefInput)





module.exports = userRouter;
