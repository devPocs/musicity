const express = require("express")
const router = express.Router()
const { protectRoute } = require("../Controller/authController")
const {
  getAllSongs,
  getSong,
  addNewSong,
  removeSong,
  updateSongDetails,
  getSongDetails,
} = require("./../Controller/songsController")

router.route("/").get(getAllSongs).post(addNewSong)
router.route("/:title").patch(updateSongDetails).delete(removeSong).get(getSong)

module.exports = router
