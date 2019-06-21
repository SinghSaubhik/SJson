const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cors = require('cors')

const hostJson = require('./HostService/hostJson.js')
const path = require('path')

const uniqid = require('uniqid')
const app = express()

const PORT = process.env.PORT || 8080

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

mongoose.connect(
  'mongodb+srv://thakur:007@cluster0-9l8sg.mongodb.net/sjson?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public'))
})

app.post('/get', (req, res) => {
  console.log(req.body)
  res.send('Fuck off')
})

app.post('/createapi', async (req, res) => {
  const pid = uniqid()

  await hostJson.hostJsonn(pid, req.body)

  res.json({ url: 'http://localhost:8080/api/' + pid })
})

app.get('/api/:pid', async (req, res) => {
  const result = await hostJson.getJson(req.params.pid)

  res.json(result.jsonHost)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})