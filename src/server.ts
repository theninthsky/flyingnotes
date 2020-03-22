import http from 'http'

import app from './app'

const { PORT = 5000, HEROKUAPP_URL = '' } = process.env

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})

/* Keep Heroku App Awake */
setInterval(() => http.get(HEROKUAPP_URL), 900000)
