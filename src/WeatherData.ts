
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
