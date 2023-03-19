#!/usr/bin/env node

var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (connectionError, connection) => {
  if (connectionError) {
    throw connectionError
  }

  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError
    }
    const queue = 'hello-queue'
    channel.assertQueue(queue, {
      durable: false
    })

    console.log('**Waiting for messages**')

    channel.consume(
      queue,
      message => {
        console.log(`Recieved: ${message.content.toString()}`)
      },
      { noAck: true }
    )
  })
})
