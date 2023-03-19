const amqp = require('amqplib/callback_api')

const connectAndSendEventToHello = () => {
  amqp.connect('amqp://localhost', (connectionError, connection) => {
    if (connectionError) {
      throw connectionError
    }
    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError
      }

      const queue = 'hello-queue'
      const message = `hello world it's currently: ${Date()}`

      // durable: (true) messages will be written to disk. Else they will only be stored in memory.
      channel.assertQueue(queue, { durable: false })

      channel.sendToQueue(queue, Buffer.from(message))

      console.log(`Sent from sender: "${message}"`)

      setTimeout(() => {
        connection.close()
      }, 500)
    })
  })
}

module.exports = { connectAndSendEventToHello }
