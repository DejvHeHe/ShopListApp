const express = require("express");
const router = express.Router();

const Register = require("../abl/Users/register");

router.post("/register", Register);

module.exports = router;