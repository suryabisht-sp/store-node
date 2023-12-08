var express = require('express');
const { userLogin, userRegister, currentUser, userProfile, resetPassword, verifyUser } = require('../controller/userAuth');
const { validateToken } = require('../middleware/validateToken');
var user = express.Router()


user.post("/login", userLogin )
user.post("/register", userRegister)
user.post("/reset", resetPassword)
// authicated user will be able to perform the task
user.get("/current", validateToken, currentUser)
user.post("/verifyemail", verifyUser )
user.patch("/profile", userProfile )

module.exports = user;
