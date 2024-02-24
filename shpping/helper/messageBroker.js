import amqlib, { connect } from "amqplib";
import dotenv from "dotenv";
dotenv.config();
const MESSAGE_BROKER_URL = process.env.MESSAGE_BROKER_URL
const EXCHANGE_NAME = process.env.EXCHANGE_NAME
//create a channel
export const  CreateChannel = async () => {
    try {
        const connection = await amqlib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}
//publish message
export const PublishMessage = async (channel, binding_key, message) => {
try {
    await channel.PublishMessage(EXCHANGE_NAME,binding_key,Buffer.from(message));
} catch (error) {
    throw error
}
}
//subscribe message
export const SubscribeMessage = async (channel, service,binding_key) => {
try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(appQueue.queue,EXCHANGE_NAME,binding_key);
    channel.consume(appQueue.queue,data=>{
        console.log('data received.');
        console.log(data.content.toString());
        channel.ack(data);
    })
    
} catch (error) {
    throw error
}
}
