export default (req, res, next) => {
  if (req.session.userID) req.userID = req.session.userID
  else res.clearCookie('connect.sid')
  next()
}
