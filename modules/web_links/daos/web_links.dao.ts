import {sendMessageToQueue} from '../../../data/rabbitmq'

const WEB_LINK_QUEUE = process.env.RABBITMQ_LINK_Q_NAME;

export async function AddWebLinkToQueue(link: string): Promise<void> {
    await sendMessageToQueue(WEB_LINK_QUEUE, link);
}