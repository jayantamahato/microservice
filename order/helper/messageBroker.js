import amqlib from "amqplib";
import dotenv from "dotenv";

import { v4 as uuidv4 } from 'uuid';
import { Config } from "../config/config.js";


dotenv.config();
let connection = null;
let channel = null;
const MESSAGE_BROKER_URL = Config.RPC.URL


//create a channel
class RPC {
  //create channel 
  getChannel = async () => {
    try {
      if (connection == null) {
        connection = await amqlib.connect(MESSAGE_BROKER_URL);
      }
      if (channel == null) {
        channel = await connection.createChannel();
      }
      return channel;
    } catch (error) {
      console.log("error while creating channel")
    }
  }

  //publisher
  publish = async (payload, REQUEST_QUEUE_NAME) => {

    const uuid = uuidv4();
    const channel = await this.getChannel();
    await channel.assertQueue(Config.RPC.QUEUE_NAME, { durable: false })
    await channel.sendToQueue(REQUEST_QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
      replyTo: Config.RPC.QUEUE_NAME,
      correlationId: uuid
    });
    return new Promise((resolve, reject) => {
      try {
        channel.consume(Config.RPC.QUEUE_NAME, (data) => {
          if (data.properties.correlationId == uuid) {
            console.log(data.content.toString())
            resolve(JSON.parse(data.content.toString()))
          } else {
            // reject("no-response getting")
          }
        })
      } catch (error) {
        console.log(error)
      }
    })
  }

  //consumer
  consumer = async () => {
    console.log("consuming : ",Config.RPC.QUEUE_NAME)
    // const service = new CartService();

    const channel = await this.getChannel();
    await channel.assertQueue(Config.RPC.QUEUE_NAME, { durable: false })
    await channel.prefetch(1);
    await channel.consume(Config.RPC.QUEUE_NAME, async (data) => {
      if (data.content) {
        console.log(data.properties.replyTo)
        // const response = await service.handleEvent(data.content) //function
        channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: data.properties.correlationId
        })
        channel.ack(data);
      } else {
        console.log("no data found")
      }
    }, {
      noAck: false,
    })

  }
  //close connection

  closeConnection = async () => {
    if (connection != null) {
      await connection.close();
    }
  }

}
export default RPC;




