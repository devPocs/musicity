const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Pls, tell us your name"] },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Pls, enter a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Pls, enter your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Pls, enter your password"],
    validate: {
      validator: function (val) {
        return val === this.password
      },
      message: "Password mismatch!",
    },
  },
})
userSchema.pre("save", async function (next) {
  // only run this is password is modified
  if (!this.isModified("password")) return next()

  //hash the password
  this.password = await bcrypt.hash(this.password, 12)

  //we do not really need to persist the confirmPassword field to the database
  this.passwordConfirm = undefined
  next()
})

//an instance method to check if the submitted password matches the user password stored in the
//database. instance methods are special types of methods available for every document
//in a database collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema)
module.exports = User
