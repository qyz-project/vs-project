import axios from 'axios'

/**
 * this class handle everything abould weather
 * it use server from https://openweathermap.org/
 */
export class Weather {
  /**
   * default api for https://openweathermap.org/
   */
  static readonly DEFAULT_API_KEY = '47ebbc8d3c411548c79f8954777f9792'
  protected readonly apiKey: string
  protected readonly city: string
  protected readonly host: string = 'http://api.openweathermap.org/data/2.5'

  /**
   * constructor
   * @param apiKey api key
   */
  constructor (city: string = 'vienna', apiKey: string = Weather.DEFAULT_API_KEY) {
    this.city = city
    this.apiKey = apiKey
  }

  /**
   * get current temperature
   * @returns temperature (in promise)
   */
  async getTemp (): Promise<number | undefined> {
    try {
      const response = await axios.get(`${this.host}/weather?q=${this.city}&appid=${this.apiKey}&units=metric`)
      const res = Number(response?.data?.main?.temp)
      if (isNaN(res)) {
        return undefined
      } else {
        return res
      }
    } catch (err) {
      console.error(err.toString())
      return undefined
    }
  }

  /**
   * get current wind state
   * @returns temperature (in promise)
   */
  async getWind (): Promise<WindState | undefined> {
    try {
      const response = await axios.get(`${this.host}/weather?q=${this.city}&appid=${this.apiKey}&units=metric`)
      const speed = Number(response?.data?.wind?.speed)
      const direction = Number(response?.data?.wind?.deg)
      if (isNaN(speed) || isNaN(direction)) {
        return undefined
      } else {
        return { speed, direction }
      }
    } catch (err) {
      console.error(err.toString())
      return undefined
    }
  }

  /**
   * get forecast of future 7 days
   * @returns array of temperature and wind state (in promise)
   */
  async getForecasts (): Promise<Array<Forcast> | undefined> {
    try {
      const response0 = await axios.get(`${this.host}/weather?q=${this.city}&appid=${this.apiKey}&units=metric`)
      const lon: number = response0?.data?.coord?.lon
      const lat: number = response0?.data?.coord?.lat

      const response1 = await axios.get(`${this.host}/onecall?appid=${this.apiKey}&units=metric&lat=${lat}&lon=${lon}`)
      let forecastArray: any[] | undefined = response1?.data?.daily
      const res: Forcast[] = []
      if (!(forecastArray instanceof Array)) {
        return undefined
      }
      forecastArray = forecastArray.slice(0, 7)
      for (const forecast of forecastArray) {
        res.push({
          temp: forecast.temp.day,
          wind: {
            speed: forecast.wind_speed,
            direction: forecast.wind_deg
          }
        })
      }
      return res
    } catch (err) {
      console.error(err.toString())
      return undefined
    }
  }
}

/**
 * wind state
 */
export interface WindState {
  speed: number
  direction: number
}

/**
 * forcast
 */
export interface Forcast {
  wind: {
    speed: number
    direction: number
  }
  temp: number
}
