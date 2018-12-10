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
 * Created by HuLin on 20/08/2018.
 */

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getDisplayName(sitename) {
    let urls = await getUrl();
    return fetch.get(`${urls.sysconfigs}?sitename=${sitename}&modulename=topology&submodulename=device-types&sort=asc`);
}

export async function requestExportParams() {
    let urls = await getUrl();
    return fetch.get(`${urls.dataSearchConfig}`);
}

export async function requestSearch(exportId, taskName, taskDes, displayName, startTime, endTime) {
    let postData = {
        taskName: taskName,
        taskDecription: taskDes,
        provideParameter: {
            type: displayName,
            startTime: startTime,
            endTime: endTime
        }
    };
    let urls = await getUrl();
    return fetch.post(`${urls.dataRequestSearch}/${exportId}`, postData);
}

export async function getTableVal(tokenId) {
    let urls = await getUrl();

    return fetch.get(`${urls.dataGetTableVal}/${tokenId}?jobAction=state`);
}

//request default table data
export async function requestDefaultData(page, rowSize) {
    let pages = page + 1;

    let urls = await getUrl();
    return fetch.get(
        `${urls.dataRequestDefaultData}?jobType=batch&orderBy=startJobTime&currentPage=${pages}&pageSize=${rowSize}`
    );
}

//download
export async function downloadTaskId(taskId) {
    let urls = await getUrl();
    return fetch.get(`${urls.dataDownloadTaskId}/${taskId}`);
}

//reflush
export async function reflush(taskId) {
    let urls = await getUrl();
    return fetch.get(`${urls.dataReflush}/${taskId}?jobAction=state`);
}
