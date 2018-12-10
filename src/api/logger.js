import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import formatter from "commons/utils/formatterUrlParam";

export async function getLoggerList({ logName, currPage, pageSize, criteria }) {
    let urls = await getUrl();
    let rootUrl = formatter(urls.getListPagination, logName, currPage, pageSize, criteria);
    return fetch.get(decodeURI(rootUrl));
}

export async function downLoadFile(filename) {
    let urls = await getUrl();
    let rootUrl = formatter(urls.downLoadFile, filename);
    return fetch.getFile(
        rootUrl,
        {},
        {
            Accept: "application/octet-stream",
            "Content-Type": "application/force-download;charset=UTF-8",
            // "Accept-Encoding": "compress, gzip",
            // "Accept-Language": "en-US,en;q=0.9"
        }
    );
}

export async function getModules() {
    let urls = await getUrl();
    return fetch.get(urls.getModules);
}

export async function getModuleChild(modulename) {
    let urls = await getUrl();
    let rootUrl = formatter(urls.getModuleChild, modulename);
    return fetch.get(rootUrl);
}
