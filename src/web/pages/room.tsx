import React from 'react'
import Page from '../components/Page'
import Device from '../components/Device'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import config from '../../config'
import { IDevice } from '../../SmartDevice'
import { useRouter } from 'next/router'

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

  const deviceComponent = devices.map((d, i) => <Device key={String(i)} device={d} />)

  return (
    <Page>
      <Container>
        <Row md={1}>
          <Jumbotron>
            <h1>{name}</h1>
          </Jumbotron>
        </Row>
        <Row md={4}>
          {deviceComponent}
        </Row>
      </Container>
    </Page>
  )
}
