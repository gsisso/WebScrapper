import {AddWebContent, WebURLExists} from "../../web_content/daos/web_content.dao";
import axios from 'axios';
import {AddWebLinkToQueue} from "../../web_links/daos/web_links.dao";

export async function parseWebURLService(link: string) {
    if(await WebURLExists(link)){
        //TODO add logger mentions we haven't done anything (?)
        return;
    }
    let parseResponse;
    try {
        parseResponse = await parse(link);
    } catch (err) {
        throw new Error(`Failed to parse url '${link}' due to: ${err}`);
    }
    const webContent: IWebContent = {
        url: link,
        html: parseResponse.html
    }
    try {
        await AddWebContent(webContent);
    } catch (err) {
        throw new Error(`Failed to add web content: ${err}`);
    }

    const promiseList: Promise<void>[] = [];
    parseResponse.links.forEach((link: string) => {
       promiseList.push(AddWebLinkToQueue(link));
    });
    // wait for all requests to complete
    //TODO: handle promise rejection (delete record from DB?)
    await Promise.all(promiseList);
}


async function parse(link: string): Promise<IParseURLResponse> {
    //get html content for current link
    const html = (await axios.get(link)).data;

    //start parse links (mock)
    const randomLinks = ["https://google.com", "https://amazon.com", "https://lusha.com", "https://www.autodepot.co.il", "https://apple.com", "https://nasdaq.com","https://ksp.co.il/web/","https://www.ivory.co.il/","https://www.zap.co.il/","https://www.rabbitmq.com//"];

    const numberOfLinks = Math.floor(Math.random() * Math.floor(randomLinks.length)) + 1;
    const links = [];

    // build random list of links
    for (let i = 0; i < numberOfLinks; i++) {
        const index = Math.floor(Math.random() * Math.floor(randomLinks.length));
        links.push(...randomLinks.splice(index, 1));
    }

    //end parsing

    return {
        html,
        links
    }
}