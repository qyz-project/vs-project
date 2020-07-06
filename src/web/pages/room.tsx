import React, { ButtonHTMLAttributes } from 'react'
import Page from '../components/Page'
import Device from '../components/Device'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import config from '../../config'
import { IDevice } from '../../SmartDevice'
import { useRouter } from 'next/router'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const rootUrl = 'http://' + config.host + ':' + config.port.smart

export default function DevicePage () {
  const [devices, setDevices] = React.useState<IDevice[]>([])
  const [name, setName] = React.useState<string>('This room is invaild')
  const router = useRouter()

  React.useEffect(() => {
    const asyncFn = async () => {
      const d = await axios.get(rootUrl + '/device')
      const roomInfo = await axios.get(rootUrl + '/room/' + router.query.id + '/')
      if (roomInfo.data) {
        if (typeof roomInfo.data.name === 'string') {
          setName(roomInfo.data.name)
        }
        if (d.data instanceof Array && roomInfo.data.devices instanceof Array) {
          const devices = d.data.filter(d => roomInfo.data.devices.indexOf(d.id) >= 0)
          setDevices(devices)
        }
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

  const [addDeviceName, setAddDeviceName] = React.useState('')
  const [addDeviceType, setAddDeviceType] = React.useState('light')
  const [addDeviceValue, setAddDeviceValue] = React.useState(0)
  const [delDeviceId, setDelDeviceId] = React.useState('-1')

  return (
    <Page>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1>{name}</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row md={4}>
          {deviceComponent}
        </Row>
        <Row md={4}>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Add Device</Card.Title>
                <Form onSubmit={async (e: React.FormEvent) => {
                  e.preventDefault()
                  if (
                    ['light', 'dimmer', 'jalousien'].indexOf(addDeviceType) >= 0 ||
                      addDeviceValue >= 0 ||
                      addDeviceValue <= 1 ||
                      typeof addDeviceName === 'string'
                  ) {
                    const jsonObj = {
                      name: addDeviceName,
                      type: addDeviceType,
                      value: addDeviceValue
                    }
                    const { data } = await axios.post(rootUrl + '/device', jsonObj)
                    const id = data.id
                    setDelDeviceId(id)
                    await axios.put(rootUrl + '/room/' + router.query.id + '/device/' + id)
                  }
                }}>
                  <Form.Group controlId="name">
                    <Form.Label>Device Name</Form.Label>
                    <Form.Control type="text" value={addDeviceName} onChange={(e) => {
                      setAddDeviceName(e.target.value)
                    }} />
                  </Form.Group>
                  <Form.Group controlId="type">
                    <Form.Label>Device Type</Form.Label>
                    <Form.Control as="select" value={addDeviceType} onChange={(e) => {
                      const t = e.target.value
                      let number = addDeviceValue
                      switch (t) {
                        case 'light': {
                          number = Math.round(number)
                          break
                        }
                        case 'dimmer': {
                          number = Math.round(number * 10) / 10
                          break
                        }
                        case 'jalousien': {
                          number = Math.round(number * 5) / 5
                          break
                        }
                      }
                      setAddDeviceType(t)
                      setAddDeviceValue(number)
                    }}>
                      <option>light</option>
                      <option>dimmer</option>
                      <option>jalousien</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="value">
                    <Form.Label>Device Value</Form.Label>
                    <Form.Control type="range" max={1} min={0} step={0.01} value={addDeviceValue} onChange={(e) => {
                      let number = Number(e.target.value)
                      if (isNaN(number)) number = 0
                      switch (addDeviceType) {
                        case 'light': {
                          number = Math.round(number)
                          break
                        }
                        case 'dimmer': {
                          number = Math.round(number * 10) / 10
                          break
                        }
                        case 'jalousien': {
                          number = Math.round(number * 5) / 5
                          break
                        }
                      }
                      setAddDeviceValue(number)
                    }}/>
                  </Form.Group>
                  <Button variant="primary" type="submit">Add</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Remove Device</Card.Title>
                <Form onSubmit={async (e: React.FormEvent) => {
                  e.preventDefault()
                  axios.delete(rootUrl + '/room/' + router.query.id + '/device/' + delDeviceId)
                  axios.delete(rootUrl + '/device/' + delDeviceId)
                }}>
                  <Form.Group controlId="id">
                    <Form.Label>Device ID</Form.Label>
                    <Form.Control type="number" placeholder="..." onChange={(e) => {
                      setDelDeviceId(e.target.value)
                    }} value={delDeviceId}/>
                  </Form.Group>
                  <Button variant="danger" type="submit">Remove</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  )
}
