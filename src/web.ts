import express from 'express'
import next from 'next'
import cors from 'cors'
import config from './config'
import { resolve } from 'path'

const port = config.port.web
const app = next({
  dir: resolve(__dirname, 'web'),
  dev: true
})

const handle = app.getRequestHandler()

let server: express.Express
app
  .prepare()
  .then(() => {
    server = express()
    server.use(cors())
    server.all('*', (req, res) => handle(req, res))
    server.listen(port, (err) => {
      if (err) {
        console.error(err)
        process.exit(2)
      }
      console.log(`> Ready on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('An error occurred, unable to start the server')
    console.error(err)
    process.exit(1)
  })
