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
  React.useEffect(() => {
    const fn = async () => {
      console.log(await axios.get(rootUrl + '/room/9/devic'))
    }
    fn()
  })

  const devices = [{}, {}, {}].map((o, i) => {
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
        <Row md={1}>
          <Jumbotron>
            <h1>room name</h1>
          </Jumbotron>
        </Row>
        <Row md={4}>
          {devices}
        </Row>
      </Container>
    </Page>
  )
}
