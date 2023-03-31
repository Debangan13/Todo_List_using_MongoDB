const { CustomAPIError } = require('../errors/custome-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err instanceof CustomAPIError)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  console.log("hi hello world")
  
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware