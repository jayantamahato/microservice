import dotenv from "dotenv";
dotenv.config();
export const Config = {

DB :{
    URI:process.env.DB_URL
},
Server:{
    PORT:process.env.PORT,
    APP_KEY:process.env.APP_KEY
},
RPC:{
    URL:process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
    QUEUE_NAME:process.env.ORDER_QUEUE
}


}