#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (connectionError, connection) => {
  if (connectionError) {
    throw connectionError
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError
    }

    const exchange = 'logs'
    const currentTime = new Date()
    const message = `for processing: ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}:${currentTime.getMilliseconds()}`
    channel.assertExchange(exchange, 'fanout', { durable: false })
    channel.publish(exchange, '', Buffer.from(message))

    console.log(`Sent: "${message}"`)

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 100)
  })
})
