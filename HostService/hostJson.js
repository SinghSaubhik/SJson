const jsonSchema = require('../models/sjson.js')

const hostJsonn = (pid, jsonHost) => {
  const obj = {
    pid: pid,
    jsonHost: jsonHost
  }
  jsonSchema
    .create(obj)
    .catch(err => {
      console.log(`${err}`)
    })
    .then(() => {
      console.log('Successfully created')
    })
  console.log(obj)
}

const getJson = pid => {
  return jsonSchema.findOne({ pid: pid })
}

module.exports = { getJson, hostJsonn }
