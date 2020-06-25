export interface ILight {
    type: 'light'
    id: number
    name: string
    value: boolean
}

export interface IDimmer {
    type: 'dimmer'
    id: number
    name: string
    value: number // 0 - 1
}

export interface IJalousien {
    type: 'jalousien'
    id: number
    name: string
    value: number // 0 -1
}

export interface Store {
    [key: string]: Array<ILight| IJalousien | IDimmer>
}
