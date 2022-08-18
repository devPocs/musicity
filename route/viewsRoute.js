const express = require("express")
const router = express.Router()
const viewsController = require("./../Controller/viewsController")
const authController = require("./../Controller/authController")

router.use("/", authController.isLoggedIn)

router.get("/", viewsController.getOverview)

router.get("/songs/../", viewsController.getOverview) // this line looks a little bit weird to me at this time of writing
//but compare it with this with line 5 0f _song-header.pug. Why the descrepancy? one sends to './' the other which is this
//one here says '../'

router.get("/songs/login", viewsController.getLoginForm)
router.get("/songs/signup", viewsController.getSignUpForm)

router.get("/songs/:slug", authController.protectRoute, viewsController.getSong)

router.get("/login", viewsController.getLoginForm)

router.get("/signup", viewsController.getSignUpForm)

module.exports = router
