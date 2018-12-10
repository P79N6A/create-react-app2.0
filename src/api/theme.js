import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getConfig(accountId) {
    let urls = await getUrl();
    return fetch.get(`${urls.getNoSecurityResource+accountId}/login_theme/themeId/`);
}