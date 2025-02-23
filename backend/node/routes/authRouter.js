const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/signin", AuthController.signIn);
router.patch("/change-password", AuthController.changePassword);
router.post("/signup", AuthController.signUp);

module.exports = router;
