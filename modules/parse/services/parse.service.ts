import {AddWebContent, WebURLExists} from "../../web_content/daos/web_content.dao";
import axios from 'axios';

export async function parseWebURLService(link: string) {
    if(await WebURLExists(link)){
        //TODO add logger mentions we haven't done anything (?)
        return;
    }
    let parseResponse;
    try {
        parseResponse = await parse(link);
    } catch (err) {
        console.log(err);
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

    //TODO: replace with rabbitmq (or other messaging service) to add other links to the queue

    const promiseList: Promise<void>[] = [];
    parseResponse.links.forEach((link: string) => {
       promiseList.push(parseWebURLService(link));
    });
    // wait for all requests to complete
    await Promise.all(promiseList);
}


async function parse(link: string): Promise<IParseURLResponse> {
    //get html content for current link
    const html = (await axios.get(link)).data;

    //start parse links (mock)
    const randomLinks = ["https://google.com", "https://amazon.com", "https://lusha.com", "https://www.autodepot.co.il", "https://apple.com", "https://nasdaq.com"];

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