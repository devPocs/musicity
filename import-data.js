const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Songs = require("./Models/song_model")
const fs = require("fs")
const path = require("path")
const songPath = path.join(__dirname, "./Data/song-data.json")
dotenv.config({ path: "./config.env" })

//connect to database
mongoose
  .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true })
  .then(() => {
    console.log("database connected!")
  })

  .catch((err) => {
    console.log(`cannot connect to database: ${err}`)
  })
//Read json file
const file = JSON.parse(fs.readFileSync(songPath))

//function to import json
const importData = async () => {
  try {
    await Songs.create(file)
    console.log("Data has been imported!")
  } catch (err) {
    console.log(`Data failed to copy: ${err}`)
  }
  process.exit
}
//function to delete json data
const deleteData = async () => {
  try {
    await Songs.deleteMany({})
    console.log("Data has been deleted")
  } catch (err) {
    console.log(`Data failed to delete: ${err}`)
  }
  process.exit
}

//import file above to database or delete documents from database
if (process.argv[2] === "--import") {
  {
    importData()
  }
} else if (process.argv[2] === "--delete") {
  deleteData()
}
//module.exports = file
