const { signIn } = require("../controller/signin.controller");
const { signUp } = require("../controller/signup.controller");
const {
    userPreference,
    userIternary,
    getAllUser,
    userPrefInput,
    editUserProfile,
    editUserPreference,
    getUserProfile,
} = require("../controller/user.controller");
const { verifyToken } = require("../middleware/verifyToken");
const userRouter = require("express").Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/prefrence", userPreference);
userRouter.get("/iternary", userIternary);
userRouter.get("/get-all-user", getAllUser);
userRouter.get("/get-user-profile", verifyToken, getUserProfile)
userRouter.post("/post-pref-user", verifyToken, userPrefInput);
userRouter.put('/edit-profile', verifyToken, editUserProfile);
userRouter.put('/edit-pref-user', verifyToken, editUserPreference);


module.exports = userRouter;
