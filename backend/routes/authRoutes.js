const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser); // register route
router.post("/login", loginUser); // login route

module.exports = router;
