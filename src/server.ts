import cluster from 'cluster'
// import os from 'os'
import http from 'http'

const { NODE_ENV, PORT = 5000, HEROKUAPP_URL = '' } = process.env

if (cluster.isMaster && NODE_ENV == 'production') {
  console.log(`Master is running...`)

  // eslint-disable-next-line
  for (const _ of new Array(1)) {
    // os.cpus() crashes Heroku (Memory quota vastly exceeded)
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })

  setInterval(() => http.get(HEROKUAPP_URL), 900000) // Keep Heroku app awake
} else {
  import('./app').then(({ default: app }) => {
    app.listen(PORT, () => {
      console.log(`[worker ${process.pid}] Listening on port ${PORT}...`)
    })
  })
}
