import { listen } from 'soap'
import express from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Weather } from './weather'

interface InputValue {
  location: string
}

interface WindTemp {
  temp: number
}

async function getTemp (args: InputValue): Promise<WindTemp> {
  return {
    temp: (await new Weather(args.location).getTemp())!
  }
}

interface WindData {
  'wind-speed': number
  'wind-direction': number
}

async function getWind (args: InputValue): Promise<WindData> {
  const wind = await new Weather(args.location).getWind()
  return {
    'wind-speed': wind?.speed!,
    'wind-direction': wind?.direction!
  }
}

interface ForecastData {
  temp: number[]
  'wind-speed': number[]
  'wind-direction': number[]
}

async function getForecasts (args: InputValue): Promise<ForecastData> {
  const forecast = await new Weather(args.location).getForecasts()
  const res: ForecastData = {
    temp: [],
    'wind-speed': [],
    'wind-direction': []
  }
  for (const f of forecast!) {
    res.temp.push(f.temp)
    res['wind-speed'].push(f.wind.speed)
    res['wind-direction'].push(f.wind.direction)
  }
  return res
}

// the service
var serviceObject = {
  WeatherService: {
    WeatherServiceSoapPort: {
      GetTemp: getTemp,
      GetWind: getWind,
      GetForecast: getForecasts
    },
    WeatherServiceSoap12Port: {
      GetTemp: getTemp,
      GetWind: getWind,
      GetForecast: getForecasts
    }
  }
}

// load the WSDL file
var xml = readFileSync(resolve(__dirname, '..', 'wsdl', 'weather-soap.wsdl'), 'utf8')
// create express app
var app = express()

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>')
})

// Launch the server and listen
var port = 8000
app.listen(port, function () {
  console.log('Listening on port ' + port)
  const wsdlPath = '/wsdl'
  listen(app, wsdlPath, serviceObject, xml)
  console.log('Check http://localhost:' + port + wsdlPath + '?wsdl to see if the service is working')
})
