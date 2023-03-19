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
    const processingTimeMs = 5000
    const queue = 'work-queue'
    channel.assertQueue(queue, {
      durable: true
    })

    console.log('**Waiting for messages**')
    channel.prefetch(1)
    channel.consume(
      queue,
      async message => {
        console.log(`Recieved: ${message.content.toString()} processing`)
        setTimeout(() => {
          console.log(`${message.content.toString()} done`)
          channel.ack(message)
        }, processingTimeMs)
      },
      { noAck: false }
    )
  })
})
