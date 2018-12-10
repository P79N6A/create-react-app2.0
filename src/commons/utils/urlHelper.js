/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by Zach on 25/05/2018.
 */

import { URL_CONFIG_PATH, URL_KEY } from "../constants/const";
import Fetch from "./fetch";

const convertUrl = (json, developeMode) => {
    let result = {};
    for (let key in json) {
        if (!json.hasOwnProperty(key)) {
            return;
        }

        let serverItem = json[key];
        let path = serverItem.Path;
        let type = serverItem.Type;
        let ipAddress = null;
        if (developeMode) {
            ipAddress = serverItem.Address;
        } else {
            let protocol =
                type === "api" ? window.location.protocol : window.location.protocol === "http:" ? "ws:" : "wss:";
            ipAddress = `${protocol}//${window.location.host}`;
        }

        path = path.startsWith("/") ? path.substring(1, path.length) : path;
        path = path.endsWith("/") ? path.substring(0, path.length - 1) : path;
        let template = `${ipAddress}/${path}/`;

        for (let key in serverItem.URL) {
            if (!serverItem.URL.hasOwnProperty(key)) {
                return;
            }

            let url = serverItem.URL[key];
            url = url.startsWith("/") ? url.substring(1, url.length) : url;
            result[key] = template + url;
        }
    }

    return result;
};

const getUrl = async (urlProvider = convertUrl) => {
    let data = sessionStorage.getItem(URL_KEY);
    if (data) {
        return Promise.resolve(JSON.parse(data));
    }

    let urls = await Fetch.get(URL_CONFIG_PATH);
    let settingsConfig = sessionStorage.getItem("ISC-SETTINGS") && JSON.parse(sessionStorage.getItem("ISC-SETTINGS"));
    let newUrls = urlProvider(urls, settingsConfig.developeMode);
    sessionStorage.setItem(URL_KEY, JSON.stringify(newUrls));
    return Promise.resolve(newUrls);
};
export default getUrl;
