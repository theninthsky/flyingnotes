const { CLIENT_PORT = 3000 } = process.env

export default (_, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    `http://localhost:${CLIENT_PORT}`,
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  next()
}
