const { promisify } = require("util")
const path = require("path")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const express = require("express")
const User = require("../Models/user_model")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const { JsonWebTokenError } = require("jsonwebtoken")

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {})
}
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  const token = signToken(newUser._id)
  res
    .status(201)
    .cookie("jwt", token, { httpOnly: true })
    .json({ status: "success", token: token })
})

exports.login = catchAsync(async (req, res, next) => {
  // check if the email and password were sent from the client
  const { email, password } = req.body
  if (!email || !password) {
    return next(new AppError("Please, provide an email and password"), 400)
  }

  //check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401))
  }
  //if everything is correct, send the token back to the client
  const token = signToken(user._id)

  return res
    .status(200)
    .cookie("jwt", token, {
      secure: true,
    })
    .json({ status: "success" })
})
exports.logout = (req, res) => {
  res
    .cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    })
    .json({ status: "success" })
}

exports.protectRoute = catchAsync(async (req, res, next) => {
  let token
  //check if the request contains a token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  } else {
    return res.redirect(401, "/login")
  }
  //

  //verify token
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.redirect(401, "/login")
    }
  }

  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        "User not logged in or user doesn't exist! Pls, log in.",
        404
      )
    )
  }
  req.user = currentUser
  next()
})

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    //verifytoken
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      )

      //check if user still exists
      const currentUser = await User.findById(decoded.id)
      if (!currentUser) {
        return next()
      }
      res.locals.user = currentUser
      return next()
    } catch (err) {
      return next()
    }
  }
  next()
}
