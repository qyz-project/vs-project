import React from 'react'
import Page from '../components/Page'
import { Weather } from '../libs/weather-ws-client'
import { Forecast } from '../../src/WeatherData'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function WeatherPage () {
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
    return <Card key={String(i)} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Day {i + 1}</Card.Title>
        <Card.Text>
          temp: {o.temp} °C
          windSpeed: {o.wind.speed} km/h
          windDrection: {o.wind.direction} °C
        </Card.Text>
      </Card.Body>
    </Card>
  })

  return (
    <Page>
      <Container>
        <Jumbotron>
          <h1>{temp} °C</h1>
          <p>
            windSpeed: {windSpeed} km/h<br />
            windDrection: {windDrection} °C<br />
          </p>
        </Jumbotron>
        {next7Days}
      </Container>
    </Page>
  )
}
