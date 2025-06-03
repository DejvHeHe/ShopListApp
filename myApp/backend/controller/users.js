const express = require("express");
const router = express.Router();

const Register = require("../abl/Users/register");
const Login=require("../abl/Users/login")

router.post("/register", Register);
router.post("/login",Login)

module.exports = router;