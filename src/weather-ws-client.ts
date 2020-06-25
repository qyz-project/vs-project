// weather api client stub

// use web socket api of browser
import config from './config'
import { Forecast, WindState } from './WeatherData'
import WebSocket from 'isomorphic-ws'

/**
 * this class handle everything abould weather
 * it use server from https://openweathermap.org/
 */
export class Weather {
  /**
   * default api for https://openweathermap.org/
   */
  static readonly DEFAULT_API_KEY = config.api.weather

  // Create WebSocket connection.
  protected socket = new WebSocket(`ws://${config.host}:${config.port.weather}`)

  /**
   * wait when cocket open
   * @param message message
   */
  protected async open (): Promise<void> {
    await new Promise((resolve, reject) => {
      ;(this.socket as any).addEventListener('open', function (event: any) {
        resolve()
      }, { once: true })
    })
  }

  /**
   * send a message to remote
   * @param message message
   */
  protected send (message: string) {
    this.socket.send(message)
  }

  /**
   * get a data from websocket
   * @return string data
   */
  protected async get (): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      ;(this.socket as any).addEventListener('message', function (event: any) {
        resolve(event.data)
      }, { once: true })
    })
  }

  /**
   * get ready
   */
  async ready (): Promise<void> {
    await this.open()
  }

  /**
   * set curretn city
   * @param city city
   */
  setCity (city: string) {
    this.send(`city=${city}`)
  }

  /**
   * get current temperature
   * @returns temperature (in promise)
   */
  async getTemp (): Promise<number | undefined> {
    this.send('temp')
    return Number(await this.get())
  }

  /**
   * get current wind state
   * @returns temperature (in promise)
   */
  async getWind (): Promise<WindState | undefined> {
    this.send('wind')
    return JSON.parse(await this.get())
  }

  /**
   * get forecast of future 7 days
   * @returns array of temperature and wind state (in promise)
   */
  async getForecasts (): Promise<Array<Forecast> | undefined> {
    this.send('forecast')
    return JSON.parse(await this.get())
  }
}
