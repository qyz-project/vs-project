import React from 'react'
import Page from '../components/Page'
import { Weather } from '../libs/weather-ws-client'
import { Forecast } from '../../src/WeatherData'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function WeatherPage () {
  const devices = [{}].map((o, i) => {
    return <Card key={String(i)} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>devices name</Card.Title>
        <Card.Text>controller</Card.Text>
        <Button variant="primary">button</Button>
      </Card.Body>
    </Card>
  })

  return (
    <Page>
      <Container>
        <Jumbotron>
          <h1>room name</h1>
        </Jumbotron>
        {devices}
      </Container>
    </Page>
  )
}
