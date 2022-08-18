const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const app = require("./app")
dotenv.config({ path: "./config.env" })
const PORT = process.env.PORT || 4040

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

//connect database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database is up and running!")
  })
  .catch((err) => {
    console.log(err)
  })

//start server
app.listen(`${PORT}`, () => {
  console.log(`App is listening on port ${PORT}!`)
})
