import { createClient } from 'soap'
const url = 'http://localhost:8000/wsdl?wsdl'

// Create client
createClient(url, function (err, client) {
  if (err) {
    throw err
  }
  /*
  * Parameters of the service call: they need to be called as specified
  * in the WSDL file
  */
  var args = {
    location: 'beijing'
  }
  // call the service
  client.GetTemp(args, function (err: Error, res: any) {
    if (err) { throw err }
    // print the service returned result
    console.log(res)
  })
})
