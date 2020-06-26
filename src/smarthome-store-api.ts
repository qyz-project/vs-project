import { IStore, IDeviceWithoutId, IDevice, IRoom } from './SmartDevice'
import * as fs from 'fs-extra'

const dataFile = 'data/data.json'

let data: IStore = {
  rooms: [], devices: []
}

let motified = false

export async function start () {
  try {
    data = JSON.parse((await fs.readFile(dataFile)).toString())
  } catch (err) {
    console.error(err)
  }
}

export async function sync () {
  if (!motified) return
  try {
    await fs.writeFile(dataFile, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

export function addDevice (d: IDeviceWithoutId): void {
  let id = 0
  if (data.devices) {
    for (const device of data.devices) {
      id = Math.max(device.id, id)
    }
    id++
  }
  data.devices.push({ ...d, id } as IDevice)
  motified = true
}

export function removeDevice (id: number): void {
  data.devices = data.devices.filter((d) => d.id !== id)
}

export function getDevice (id: number): IDevice | void {
  if (data.devices) {
    for (const device of data.devices) {
      if (device.id === id) return device
    }
  }
  return undefined
}

export function getRoom (id: number): IRoom | void {
  if (data.devices) {
    for (const room of data.rooms) {
      if (room.id === id) return room
    }
  }
  return undefined
}

export function setDevice (id: number, value: number): void {
  if (data.devices) {
    for (const device of data.devices) {
      if (device.id === id) device.value = value
      motified = true
    }
  }
}

export function roomAddDevice (roomId: number, id: number): void {
  if (data.rooms) {
    for (const room of data.rooms) {
      if (room.id === roomId) {
        if (room.devices.indexOf(id) < 0) {
          room.devices.push(id)
          motified = true
        }
      }
    }
  }
}

export function roomRemoveDevice (roomId: number, id: number): void {
  if (data.rooms) {
    for (const room of data.rooms) {
      if (room.id === roomId) {
        room.devices = room.devices.filter((_id) => _id !== id)
        motified = true
      }
    }
  }
}

export function roomGetDevices (roomId: number): Array<number> | void {
  if (data.rooms) {
    for (const room of data.rooms) {
      if (room.id === roomId) {
        return room.devices
      }
    }
  }
}

export function getRooms (): IRoom[] {
  return data.rooms
}

export function getDevices (): IDevice[] {
  return data.devices
}

export async function main () {
  await start()
  setInterval(() => {
    sync()
  }, 5000)
}
