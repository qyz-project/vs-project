
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
export interface Forecast {
  wind: WindState
  temp: number
}
