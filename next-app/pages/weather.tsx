import React from 'react'

import { Weather } from '../libs/weather-ws-client'
import { Forecast } from '../../src/WeatherData'

const IndexPage = () => {
  const [temp, setTemp] = React.useState(0)
  const [windSpeed, setWindSpeed] = React.useState(0)
  const [windDrection, setWindDrection] = React.useState(0)
  const [forcastsArray, setForcastsArray] = React.useState<Array<Forecast>>([])

  const [timeoutHandle, setTimeoutHandle] = React.useState<ReturnType<typeof setTimeout> | void>()

  React.useEffect(() => {
    const weather = new Weather()
    weather.ready().then(() => {
      const fn = async () => {
        try {
          setTemp((await weather.getTemp()) || NaN)
          const wind = await weather.getWind()
          const forecast = await weather.getForecasts()
          setWindSpeed(wind?.speed || NaN)
          setWindDrection(wind?.direction || NaN)
          setForcastsArray(forecast instanceof Array ? forecast : [])
        } catch (err) {}
        setTimeoutHandle(setTimeout(fn, 5 * 1000)) // 60 sec
      }
      fn()
    })
    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
    }
  })

  const next7Days = forcastsArray.map((o, i) => {
    return `
    Day ${i + 1}
    temp: ${o.temp}
    windSpeed: ${o.wind.speed}
    windDrection: ${o.wind.direction}
    `
  })

  return <div>
    <pre>
      temp: {temp}<br />
      windSpeed: {windSpeed}<br />
      windDrection: {windDrection}<br />
      {next7Days}
    </pre>
  </div>
}

export default IndexPage
