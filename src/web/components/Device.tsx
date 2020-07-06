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
  let pText = '+'
  let mText = '-'
  switch (props.device.type) {
    case 'dimmer':
      dt = 0.1
      break
    case 'jalousien':
      dt = 0.2
      pText = 'UP'
      mText = 'DOWN'
      break
    case 'light':
      dt = 1
      pText = 'ON'
      mText = 'OFF'
  }
  const minus = () => {
    axios.put(rootUrl + '/device/' + props.device.id + '/value/' + normalize(props.device.value - dt))
  }

  const add = () => {
    axios.put(rootUrl + '/device/' + props.device.id + '/value/' + normalize(props.device.value + dt))
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{props.device.name} [{props.device.id}]</Card.Title>
        <ProgressBar animated now={props.device.value * 100} />
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={minus}>{mText}</Button>
        <Button variant="primary" onClick={add}>{pText}</Button>
      </Card.Footer>
    </Card>
  )
}
