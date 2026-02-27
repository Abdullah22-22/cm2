const express = require("express");
const { UserLogin, UserRegistery } = require("../controllers/userControllers");

const loginRouter = express.Router();

loginRouter.post("/login", UserLogin);
loginRouter.post("/register", UserRegistery);

module.exports = loginRouter;