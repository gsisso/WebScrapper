import {Channel, ConfirmChannel, Connection} from "amqplib";

const amqp = require('amqplib');

let conn: Connection = null;

export async function getConnection(): Promise<Connection> {
    if (conn == null) {
        conn = await amqp.connect(process.env.RABBITMQ_CS);
    }
    return conn;
}

export async function sendMessageToQueue(queue: string, msg: string): Promise<void> {
    let ch: ConfirmChannel;
    try {
        ch = await (await getConnection()).createConfirmChannel();
    } catch (err) {
        throw new Error(`Failed connect to RabbitMQ: ${err}`);
    }

    ch.assertQueue(queue).then(async () => {
        ch.sendToQueue(queue, Buffer.from(msg), {persistent: true});
        await ch.waitForConfirms();
    }).catch((err) => {
        throw new Error(`Failed to send message to queue (msg: '${msg}'): ${err}`);
    }).finally(() => {
        ch.close();
    });
}