export interface IDeviceWithoutId {
  type: 'light' | 'dimmer' | 'jalousien'
  name: string
  value: number
}

export interface IDevice extends IDeviceWithoutId {
  id: number
}

export interface IRoom {
  name: string
  id: number
  diveces: Array<number>
}

export interface IStore {
  rooms: IRoom[]
  devices: IDevice[]
}
