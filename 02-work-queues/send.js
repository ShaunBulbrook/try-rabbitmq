const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (connectionError, connection) => {
  if (connectionError) {
    throw connectionError
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError
    }

    const queue = 'work-queue'
    const message = `hello work it's currently: ${Date()}`

    channel.assertQueue(queue, { durable: true })

    channel.sendToQueue(queue, Buffer.from(message), { persistant: true })

    console.log(`Sent from sender: "${message}"`)

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  })
})
