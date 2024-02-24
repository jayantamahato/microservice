import amqlib from 'amqplib'
import { v4 as uuidv4 } from 'uuid'
import { CONFIG } from '../config/config.js'
import { eventHandler } from '../service/event.service.js'

let connection = null
let channel = null

const getChannel = async () => {
	if (connection == null) {
		connection = await amqlib.connect(CONFIG.RPC_URL)
		console.log('connection created')
	}
	if (channel == null) {
		channel = await connection.createChannel()
		console.log('channel created')
	}
}

export const consume = async ({ queueName }) => {
	try {
		await getChannel()
		channel.prefetch(1)
		await channel.assertQueue(queueName, { durable: false })
		console.log('Consuming :', queueName)
		await channel.consume(
			queueName,
			async (msg) => {
				try {
					// const response = await callback(JSON.parse(msg.content.toString()))
					const response = await eventHandler({ message: JSON.parse(msg.content.toString()) })
					await channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), { correlationId: msg.properties.correlationId })
					await channel.ack(msg)
				} catch (error) {
					console.log(error)
					await channel.ack(msg)
				}
			},
			{
				noAck: false
			}
		)
	} catch (error) {
		console.log(error.message)
	}
}
export const publish = async ({ queueName, message }) => {
	try {
		await getChannel()
		const autoQueue = await channel.assertQueue('', { exclusive: true })
		const uuid = uuidv4()
		console.log('message send.')
		await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
			replyTo: autoQueue.queue,
			correlationId: uuid
		})
		return new Promise((resolve, reject) => {
			const timeOut = setTimeout(() => {
				channel.close()
				resolve('API cannot full fill the request')
			}, 10000)

			channel.consume(
				autoQueue.queue,
				async (msg) => {
					if (msg.properties.correlationId == uuid) {
						const message = JSON.parse(msg.content.toString())

						resolve(message)
						clearTimeout(timeOut)
					} else {
						reject('data Not found!')
					}
				},
				{
					noAck: true
				}
			)
		})
	} catch (error) {
		console.log(error.message)
		return 'error'
	}
}
