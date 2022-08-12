module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  res.render("error", {
    title: "Error",
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
  })
}
