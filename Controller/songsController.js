const express = require("express")
const Songs = require("../Models/song_model")
const catchAsync = require("./../utils/catchAsync")
const router = express.Router()
const AppError = require("./../utils/appError")

exports.getAllSongs = catchAsync(async (req, res) => {
  //filter
  const queryObj = { ...req.query }
  const excludedFields = ["sort", "fields", "limit", "page"]
  excludedFields.forEach((el) => delete queryObj[el])

  //advanced filter
  let queryString = JSON.stringify(queryObj)
  queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  queryString = JSON.parse(queryString)

  let query = Songs.find(queryString)

  //sort
  if (req.query.sort) {
    const sortString = queryString.split(",").join(" ")
    query = query.sort(sortString)
  } else {
    query.sort("-addedAt")
  }
  //field limiting
  if (req.query.fields) {
    const fieldString = queryString.split(",").join(" ")
    query = query.select(fieldString)
  }
  //pagination
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 4
  query - query.skip((page - 1) * limit).limit(limit)

  //execute query
  const song = await query
  //send response

  res.status(200).json({ message: "success", song })
})
exports.addNewSong = catchAsync(async (req, res) => {
  await Songs.create(req.body)
  res.status(200).json({ message: "new song added!" })
})
exports.removeSong = catchAsync(async (req, res, next) => {
  let title = req.params.title
  title = title.split(",").join(" ")
  title = title.charAt(0).toUpperCase() + title.slice(1)

  console.log(title)
  const del = await Songs.findOneAndDelete({ title: title })
  // Songs.findOneAndDelete returns a promise. the await in front of it executes it and stores the
  //result in del.
  if (del) {
    res.status(200).json({ message: "Success. Song deleted!" })
  } else next()
})
exports.updateSongDetails = catchAsync(async (req, res, next) => {
  let title = req.params.title
  title = title.split(",").join(" ")
  title = title.charAt(0).toUpperCase() + title.slice(1)

  const updated = await Songs.findOneAndUpdate({ title: title }, req.body, {
    new: true,
    runValidators: true,
  })
  if (updated) {
    res.status(200).json({ message: "Success. Song updated!" })
  } else next()
})
exports.getSong = catchAsync(async (req, res, next) => {
  let title = req.params.title
  console.log(title)
  title = title.split(",").join(" ")
  title = title.charAt(0).toUpperCase() + title.slice(1)

  const song = await Songs.findOne({ title })
  if (song === null) {
    return next(new AppError("No song found with that name", 404))
  } else res.status(200).json({ status: "Success", data: { song } })
  //this passes the error to the catchAsync function which in turn passes the error to the
  //the globalErrorHandler
})
