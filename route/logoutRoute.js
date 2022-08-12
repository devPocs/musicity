const express = require("express")
const authController = require("../Controller/authController")
const router = express.Router()

router.get("/", authController.logout)

module.exports = router
