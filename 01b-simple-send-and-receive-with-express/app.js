const express = require('express')
const connectAndSendEventToHello = require('./send').connectAndSendEventToHello

const app = express()

const port = 3000

app.get('/add-event', (req, res) => {
  try {
    connectAndSendEventToHello()
    console.log('event sent!')
    res.send('Success')
  } catch (error) {
    console.log('failed to send event')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
