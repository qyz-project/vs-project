import React from 'react'
import Page from '../components/Page'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import config from '../../config'
import Col from 'react-bootstrap/Col'

const rootUrl = 'http://' + config.host + ':' + config.port.smart

export default function ModePage () {
  const devices = [
    'read',
    'sleep',
    'party',
    'stop-party'
  ].map((mode, i) => {
    return <Col md={4} key={String(i)}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{mode}</Card.Title>
          <Button variant="primary" onClick={() => {
            axios.put(rootUrl + '/mode/' + mode)
          }}>Toggle Mode</Button>
        </Card.Body>
      </Card>
    </Col>
  })

  return (
    <Page>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Mode</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row md={4}>
          {devices}
        </Row>
      </Container>
    </Page>
  )
}
