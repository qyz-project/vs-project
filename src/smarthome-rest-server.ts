import express from 'express'
import * as parser from 'body-parser'
import * as api from './smarthome-store-api'
import config from './config'

const app = express()

app.use(parser.urlencoded({ extended: false }))

// get all device info
app.get('/device', (req, res) => {
  res.end(JSON.stringify(api.getDevices(), undefined, 4))
})

// get all room info
app.get('/room', (req, res) => {
  res.end(JSON.stringify(api.getRooms(), undefined, 4))
})

// get a device info
app.get('/device/:id', (req, res) => {
  const d = api.getDevice(Number(req.params.id))
  res.end(JSON.stringify(d, undefined, 4))
})

// remove a device
app.delete('/device/:id', (req, res) => {
  api.removeDevice(Number(req.params.id))
  res.end(JSON.stringify(api.getDevices(), undefined, 4))
})

// set value of a device
app.put('/device/:id/value/:value', (req, res) => {
  api.setDevice(Number(req.params.id), Number(req.params.value))
  const d = api.getDevice(Number(req.params.id))
  res.end(JSON.stringify(d, undefined, 4))
})

// add new device
app.post('/device', (req, res) => {
  const d = api.addDevice(req.body)
  res.end(JSON.stringify(d, undefined, 4))
})

// get room info
app.get('/room/:roomId/', (req, res) => {
  const d = api.getRoom(Number(req.params.roomId))
  res.end(JSON.stringify(d, undefined, 4))
})

// get device from room
app.get('/room/:roomId/device/', (req, res) => {
  const d = api.roomGetDevices(Number(req.params.roomId))
  res.end(JSON.stringify(d, undefined, 4))
})

// add device to room
app.put('/room/:roomId/device/:id', (req, res) => {
  api.roomAddDevice(Number(req.params.roomId), Number(req.params.id))
  const d = api.getRoom(Number(req.params.roomId))
  res.end(JSON.stringify(d, undefined, 4))
})

// remove device from room
app.delete('/room/:roomId/device/:id', (req, res) => {
  api.roomRemoveDevice(Number(req.params.roomId), Number(req.params.id))
  const d = api.getRoom(Number(req.params.roomId))
  res.end(JSON.stringify(d, undefined, 4))
})

// party mode on
app.delete('/mode/party', (req, res) => {
  const d = api.partyModeOn()
  res.end(JSON.stringify(d, undefined, 4))
})

// party mode off
app.delete('/mode/stop-party', (req, res) => {
  const d = api.partyModeOff()
  res.end(JSON.stringify(d, undefined, 4))
})

// read mode on
app.delete('/mode/sleep', (req, res) => {
  const d = api.readMode()
  res.end(JSON.stringify(d, undefined, 4))
})

// sleep mode
app.delete('/mode/sleep', (req, res) => {
  const d = api.readMode()
  res.end(JSON.stringify(d, undefined, 4))
})

async function main () {
  await api.main()
  app.listen(config.port.smart)
}

main()
