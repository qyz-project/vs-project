import React from 'react'
import Page from '../components/Page'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import config from '../../src/config'

const rootUrl = 'http://' + config.host + ':' + config.port.smart

export default function WeatherPage () {
  const [devices, setDevices] = React.useState<any[]>([])

  React.useEffect(() => {
    axios.get(rootUrl + '/device')
  })

  const deviceComponent = devices.map((mode, i) => {
    return <Card key={String(i)} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{mode}</Card.Title>
        <Button variant="primary" onClick={() => {
          axios.put(rootUrl + '/mode')
        }}>run</Button>
      </Card.Body>
    </Card>
  })

  return (
    <Page>
      <Container>
        <Row md={1}>
          <Jumbotron>
            <h1>Mode</h1>
          </Jumbotron>
        </Row>
        <Row md={4}>
          {deviceComponent}
        </Row>
      </Container>
    </Page>
  )
}