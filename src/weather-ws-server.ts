// weather api server stub

import { Server } from 'ws'
import config from './config'
import { Weather } from './weather'

function main () {
// just use demo code from https://www.npmjs.com/package/ws
  const server = new Server({
    port: config.port.weather,
    perMessageDeflate: {
      zlibDeflateOptions: {
      // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
    }
  })

  const weather = new Weather()

  server.on('connection', (client) => {
    client.on('message', async (message) => {
      const m: string = String(message)

      // cuty=shanghai
      if (m.match('=')) {
        if (m.match('=')) {
          const [name, value] = m.split('=')
          switch (name) {
            case 'city': {
              weather.setCity(value)
            }
          }
        }
      } else {
        switch (m) {
          case 'temp': {
            const d = JSON.stringify(await weather.getTemp())
            console.log(d)
            client.send(d)
            return
          }
          case 'wind': {
            const d = JSON.stringify(await weather.getWind())
            console.log(d)
            client.send(d)
            return
          }
          case 'forecast': {
            const d = JSON.stringify(await weather.getForecasts())
            console.log(d)
            client.send(d)
          }
        }
      }
    })
  })
}

main()
console.log('started')
