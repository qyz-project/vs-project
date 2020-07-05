import React from 'react'
import { IDevice } from '../../SmartDevice'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios'
import config from '../../config'
const rootUrl = 'http://' + config.host + ':' + config.port.smart

function normalize (v: number) {
  return Math.min(Math.max(v, 0), 1)
}

export default function Device (props: {device: IDevice}) {
  let dt = 1
  switch (props.device.type) {
    case 'dimmer':
      dt = 0.1
      break
    case 'jalousien':
      dt = 0.2
      break
    case 'light':
      dt = 1
  }
  const minus = () => {
    axios.put(rootUrl + '/device/' + props.device.id + '/value/' + normalize(props.device.value - dt))
  }

  const add = () => {
    axios.put(rootUrl + '/device/' + props.device.id + '/value/' + normalize(props.device.value + dt))
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>[{props.device.id}] {props.device.name}</Card.Title>
        <ProgressBar animated now={props.device.value * 100} />
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={minus}>-</Button>
        <Button variant="primary" onClick={add}>+</Button>
      </Card.Footer>
    </Card>
  )
}
