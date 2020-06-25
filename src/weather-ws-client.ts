// use web socket api of browser
import config from './config'
import { Forcast, WindState } from './WeatherData'

// Create WebSocket connection.
const socket = new WebSocket(`ws://localhost:${config.port.weather}`)

/**
 * wait when cocket open
 * @param message message
 */
async function open (): Promise<void> {
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', function (event) {
      resolve()
    }, { once: true })
  })
}

/**
 * send a message to remote
 * @param message message
 */
function send (message: string) {
  socket.send(message)
}

async function get (): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    socket.addEventListener('message', function (event) {
      resolve(event.data)
    }, { once: true })
  })
}

/**
 * this class handle everything abould weather
 * it use server from https://openweathermap.org/
 */
export class Weather {
  /**
   * default api for https://openweathermap.org/
   */
  static readonly DEFAULT_API_KEY = config.api.weather

  /**
   * set curretn city
   * @param city city
   */
  setCity (city: string) {
    send(`city=${city}`)
  }

  /**
   * get current temperature
   * @returns temperature (in promise)
   */
  async getTemp (): Promise<number | undefined> {
    send('temp')
    return Number(await get())
  }

  /**
   * get current wind state
   * @returns temperature (in promise)
   */
  async getWind (): Promise<WindState | undefined> {
    send('wind')
    return JSON.parse(await get())
  }

  /**
   * get forecast of future 7 days
   * @returns array of temperature and wind state (in promise)
   */
  async getForecasts (): Promise<Array<Forcast> | undefined> {
    send('forecast')
    return JSON.parse(await get())
  }
}
