const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
const songSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Song must have a title!"] },
  slug: { type: String, slug: "title" },
  artist: { type: String, required: [true, "Artist name cannot be blank!"] },
  yearReleased: {
    type: Number,
    required: [true, "The year of release cannot be blank!"],
  },
  album: { type: String },
  ratings: { type: Number },
  image: { type: [String] },
  lyrics: { type: String, trim: true },
  addedAt: { type: Date, default: Date.now },
  //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          lcollation: { locale: "en", strength: 2 },
})

const Songs = mongoose.model("Songs", songSchema)
module.exports = Songs
