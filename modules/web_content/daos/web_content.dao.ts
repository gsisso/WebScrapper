import {getConnection} from '../../../data/mariadb'

export async function AddWebContent(content: IWebContent): Promise<void> {
    try {
        await (await getConnection()).query("INSERT INTO web_links (url,content) VALUES (?,?)",
            [content.url, content.html]);
    }catch (err){
        //throw an error unless its due to duplicate entry
        //TODO: add log ?
        if(err.code.localeCompare('ER_DUP_ENTRY') !== 0){
            throw err;
        }
    }
}

export async function WebURLExists(url: string): Promise<boolean> {
    const res = await (await getConnection()).query("SELECT COUNT(*) as counter FROM web_links WHERE url=?", [url]);

    return res?.[0]?.counter != 0;
}