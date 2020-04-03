import os from 'os'
import cluster from 'cluster'
import http from 'http'

import app from './app.js'

const {
  NODE_ENV,
  WEB_CONCURRENCY: workers = os.cpus().length, // set by Heroku
  PORT = 5000,
  HEROKUAPP_URL = '',
} = process.env

if (cluster.isMaster && NODE_ENV == 'production') {
  console.log(`Master is running...`)

  for (let i = 0; i < workers; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })

  setInterval(() => http.get(HEROKUAPP_URL), 900000) // keep Heroku app awake
} else {
  app.listen(PORT, () => {
    console.log(`[worker ${process.pid}] Listening on port ${PORT}...`)
  })
}
