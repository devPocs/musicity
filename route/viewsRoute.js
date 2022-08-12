const express = require("express")
const router = express.Router()
const viewsController = require("./../Controller/viewsController")
const authController = require("./../Controller/authController")

router.use("/", authController.isLoggedIn)

router.get("/", viewsController.getOverview)

router.get("/songs/:slug", authController.protectRoute, viewsController.getSong)

router.get("/login", viewsController.getLoginForm)

router.get("/signup", viewsController.getSignUpForm)

module.exports = router
