// //add to cart -> get product by id
// import amqlib from 'amqplib'
// import { CONFIG } from '../config/config.js';
// import { eventHandler } from '../service/event.service.js';

// let connection
// let channel;
// const url = CONFIG.RPC_URL;
// const QueueName = CONFIG.PRDDUCT_QUEUE;

// const getConnection = async () => {

//     if (!connection) {
//         connection = await amqlib.connect(url);
//         console.log("Connection Created !")
//     }
//     if (!channel) {
//         channel = await connection.createChannel();
//         console.log("Channel Created !")
//     }
//     return channel;
// }

// export const publish = async ({ publishQueueName, payload }) => {
//     try {
//         await getConnection();
//         channel.assertQueue(publishQueueName, { durable: false });
//         channel.sendToQueue(publishQueueName, Buffer.from(JSON.stringify(payload)))
//         console.log("message send !")
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// export const consume = async () => {
//     try {
//         await getConnection();
//         console.log('Consuming :', QueueName)
//         channel.assertQueue(QueueName, { durable: false });
//         channel.consume(QueueName, (data) => {
//             const message = JSON.parse(data.content.toString());
//             console.log(message)
//             eventHandler({ message })
//         }, {
//             noAck: true
//         });
//     } catch (error) {
//         console.log(error.message)
//     }

// }
