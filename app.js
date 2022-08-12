const express = require("express")
const router = express.Router()
const morgan = require("morgan")
const path = require("path")
const songRoute = require("./route/songsRoute")
const userRoute = require("./route/usersRoute")
const globalErrorHandler = require("./Controller/errorController")

const AppError = require("./utils/appError")
const viewsRoute = require("./route/viewsRoute")
const logoutRoute = require("./route/logoutRoute")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

//middlewares
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.use((req, res, next) => {
  console.log("Hello from the server side!😎")
  next()
})

//routes
app.use("/", viewsRoute)
app.use("/api/v1/songs", songRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/logout", logoutRoute)

//errorhandling for unhandled routes.
//here, we create an error using the error class.
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
  // err.status = "fail"
  // err.statusCode = 404
  next(
    new AppError(
      `Can't find the resource: ${req.originalUrl} on this server!`,
      404
    )
  )
  // whenever an argument is passed in to the next function, it treats it like an error
  //bypassing all other functions in the middleware stack and skipping to the global handling middleware
})
//global error handling middleware. error handling middlewares in express accept four parameters.
//always, in error handling middlwares, the error comes first. (error first functions)
app.use(globalErrorHandler)

module.exports = app
