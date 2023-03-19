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
    const exchange = 'logs'
    const processingTimeMs = 0
    channel.assertExchange(exchange, 'fanout', { durable: false })
    console.log('ouoi')
    channel.assertQueue(
      '',
      {
        exclusive: true
      },
      function (queueError, queue) {
        console.log('hello?')
        if (queueError) {
          throw queueError
        }

        channel.bindQueue(queue.queue, exchange, '')
        console.log(`**Waiting for messages at ${queue.queue}**`)
        channel.prefetch(5)
        channel.consume(
          queue.queue,
          async message => {
            console.log(`Recieved: ${message.content.toString()} processing`)
            setTimeout(() => {
              console.log(`${message.content.toString()} done`)
              channel.ack(message)
            }, processingTimeMs)
          },
          { noAck: false }
        )
      }
    )
  })
})
