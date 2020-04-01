import jwt from 'jsonwebtoken'

const { NODE_ENV, ACCESS_TOKEN_SECRET } = process.env

export default (req, res, next) => {
  const { cookie } = req.headers

  if (cookie) {
    const token =
      NODE_ENV == 'test'
        ? cookie.match(/(?<=Bearer=)(.*?)(?=;)/)[0]
        : cookie.split('=')[1]

    if (token) {
      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.setHeader(
            'Set-Cookie',
            'Bearer=deleted; expires=Thu, Jan 01 1970 00:00:00 UTC',
          )
          res.redirect('/')
        } else {
          req.userId = user._id
        }
      })
    }
  }

  next()
}
