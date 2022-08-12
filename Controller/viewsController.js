const express = require("express")
const catchAsync = require("../utils/catchAsync")
const Songs = require("./../Models/song_model")

exports.getOverview = catchAsync(async (req, res, next) => {
  const songs = await Songs.find()
  res.status(200).render("overview", { title: "All Songs", songs })
})
exports.getSong = catchAsync(async (req, res, next) => {
  let slug = req.params.slug
  if (slug) {
    let results = await Songs.findOne({ slug: slug })
    if (results === null) {
      return res.render("error", {
        title: "Error",
        statusCode: 404,
        message: "No song like that. Check the song title and try again.",
      })
    } else {
      console.log(results.image[0])
      res.status(200).render("./song_base", {
        title: results.title,
        results: results,
      })
    }
  }
})

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", { title: "Log into your account" })
}

exports.getSignUpForm = (req, res, next) => {
  res.status(200).render("signup", { title: "Sign up for free" })
}
exports.getErrorPage = (req, res, next) => {}
