import {Connection, ConsumeMessage} from "amqplib";
import {parseWebURLService} from "./modules/parse/services/parse.service";
import {getConnection} from "./data/rabbitmq";

require('dotenv').config();

getConnection().then(async (conn: Connection) => {
    const ch = await conn.createChannel();

    const onMessage = (msg: ConsumeMessage) => {
        const body = msg.content.toString();
        parseWebURLService(body).then(() => {
            ch.ack(msg);
        })
    };
    ch.consume(process.env.RABBITMQ_LINK_Q_NAME, onMessage, {noAck: false}).catch(console.warn);
})