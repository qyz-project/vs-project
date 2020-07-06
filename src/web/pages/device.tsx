import React from 'react'
import Page from '../components/Page'
import Device from '../components/Device'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import config from '../../config'
import { IDevice } from '../../SmartDevice'
import Col from 'react-bootstrap/Col'

const rootUrl = 'http://' + config.host + ':' + config.port.smart

export default function DevicePage () {
  const [devices, setDevices] = React.useState<IDevice[]>([])

  React.useEffect(() => {
    const asyncFn = async () => {
      const res = await axios.get(rootUrl + '/device')
      if (res.data instanceof Array) {
        setDevices(res.data)
        console.log(res.data)
      }
    }
    const handle = setInterval(asyncFn, 1000)
    return () => {
      clearInterval(handle)
    }
  })

  const deviceComponent = devices.map((d, i) => (
    <Col md={4} key={String(i)} className="mb-3">
      <Device device={d} />
    </Col>)
  )

  return (
    <Page>
      <Container>
        <Row>
          <Jumbotron>
            <h1>All Devices</h1>
          </Jumbotron>
        </Row>
        <Row md={4}>
          {deviceComponent}
        </Row>
      </Container>
    </Page>
  )
}
