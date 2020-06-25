import React from 'react'

import { Weather } from '../src/weather-ws-client'
import { Forecast } from '../src/WeatherData'

const IndexPage = () => {
  const [temp, setTemp] = React.useState(0)
  const [windSpeed, setWindSpeed] = React.useState(0)
  const [windDrection, setWindDrection] = React.useState(0)
  const [forcastsArray, setForcastsArray] = React.useState<Array<Forecast>>([])

  React.useEffect(() => {
    const weather = new Weather()
    weather.ready().then(() => {
      setInterval(async () => {
        setTemp(await weather.getTemp())
        const wind = await weather.getWind()
        const forecast = await weather.getForecasts()
        setWindSpeed(wind.speed)
        setWindDrection(wind.direction)
        setForcastsArray(forecast)
      }, 30000)
    })
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
