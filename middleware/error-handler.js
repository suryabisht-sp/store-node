const errorHandlerMiddleware =async (err, req, res, next) => {
  return res.status(500).json({message:"Something went wrong, please try later"})
}

module.exports = errorHandlerMiddleware;