import jwt from 'jsonwebtoken'

const { ACCESS_TOKEN_SECRET } = process.env

export default (req, res, next) => {
  const { cookie } = req.headers

  const token = cookie && cookie.split('=')[1]

  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.setHeader(
          'Set-Cookie',
          'Bearer=deleted; expires=Thu, Jan 01 1970 00:00:00 UTC',
        )
        res.redirect('/')
      } else {
        req.userID = user._id
      }
    })
  }

  next()
}
