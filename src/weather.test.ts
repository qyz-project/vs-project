import { Weather } from './weather'

describe('class Weather', () => {
  let weather: Weather
  test('class Weather constructer', () => {
    weather = new Weather('Vienna')
    expect(weather).toBeInstanceOf(Weather)
  })

  test('weather.getTemp() ', async () => {
    weather = new Weather('Vienna')
    expect(typeof weather.getTemp).toBe('function')
    expect(typeof await weather.getTemp()).toBe('number')
    expect(isNaN(await weather.getTemp() as number)).toBeFalsy()
  })

  test('weather.getTemp() ', async () => {
    weather = new Weather('Vienna')
    expect(typeof weather.getWind).toBe('function')
    const res = await weather.getWind()
    expect(typeof res).toBe('object')
    expect(typeof res?.direction).toBe('number')
    expect(typeof res?.speed).toBe('number')
  })

  test('weather.getForecasts()', async () => {
    expect(typeof weather.getForecasts).toBe('function')
    const res = await weather.getForecasts()
    expect(res?.length).toBe(7)
    for (const _res of res!) {
      expect(typeof _res.temp).toBe('number')
      expect(typeof _res.wind.speed).toBe('number')
      expect(typeof _res.wind.direction).toBe('number')
    }
  })
})
