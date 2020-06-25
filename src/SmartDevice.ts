export interface IDevice {
    id: number
    name: string
}

export interface ILight extends IDevice {
    type: 'light'
    value: boolean
}

export interface IDimmer extends IDevice {
    type: 'dimmer'
    id: number
    name: string
    value: number // 0 - 1
}

export interface IJalousien extends IDevice {
    type: 'jalousien'
    id: number
    name: string
    value: number // 0 -1
}

export interface Room {
    name: string
    id: number
    diveces: Array<IDevice>
}

export interface Store {
    [key: string]: Array<ILight| IJalousien | IDimmer>
}
