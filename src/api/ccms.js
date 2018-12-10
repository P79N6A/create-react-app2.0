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
 * Created by @wplei on 30/05/2018.
 */

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import tokenHelper from "commons/utils/tokenHelper";
import { DASHBOARD_TEMPLATE } from "commons/constants/const";

export const getPageConfig = async pageKey => {
    const urls = await getUrl();
    // return fetch.get(urls.getPageConfigByPageKey.replace("{pageKey}", pageKey)).replace("{tokenId}", tokenHelper.get());
    return fetch.get(urls.getPageConfigItem.replace("{0}", pageKey));
    // return fetch.get(urls.normalUserGetPageConfig.replace("{pageKey}", pageKey));
};

export const updatePageConfig = async config => {
    const urls = await getUrl();
    return fetch.post(urls.savePageConfig, config);
};

export const saveCommonResource = async resource => {
    const urls = await getUrl();
    return fetch.post(urls.saveCommmonResource, resource);
};

export const getCommonResource = async ({ group, resourceid }) => {
    const urls = await getUrl();
    let url = urls.getCommonResource.replace("{0}", group).replace("{1}", resourceid);
    return fetch.get(url);
};

export const getAllDefaultComp = async () => {
    const urls = await getUrl();
    let url = urls.getDefaultComponentNew;
    return fetch.post(url, { group: null });
};

export const saveTemplate = async (templateData, applicationId) => {
    const urls = await getUrl();
    let url = urls.saveTemplate;
    const { title } = templateData;
    let postData = {
        group: DASHBOARD_TEMPLATE,
        id: title,
        status: "2001",
        type: "application/json",
        value: templateData
    };
    if (applicationId) postData.applicationId = applicationId;
    return fetch.post(url, postData);
};

export const getPageConfigByPageId = async (pageKey, page) => {
    const urls = await getUrl();
    let url = urls.getPageConfigByPageId + `?pageId=${page}`;
    return fetch.get(url);
};

export const cleanTokenForPageConfig = async pageKey => {
    const urls = await getUrl();
    let url = urls.cleanTokenForPage.replace("{token}", tokenHelper.get());
    return fetch.post(url, { pageKey });
};

export const createUpdateResource = async ({ group, resourceId, value }) => {
    const urls = await getUrl();
    let url = urls.createUpdateResource;
    return fetch.post(url, {
        desc: "desc",
        group: group,
        id: resourceId,
        type: "application/json",
        value: JSON.stringify(value)
    });
};

export const getResource = async ({ group, resourceId }) => {
    const urls = await getUrl();
    let url = urls.getResource.replace("{group}", group).replace("{resoueceId}", resourceId);
    return fetch.get(url);
};

// get permission list
export async function getPermissions() {
    let urls = await getUrl();
    let url = urls.securityMgmtPermission;
    return fetch.get(url);
}

// give permission to resource
export async function updatePermissions(permissionParams) {
    let urls = await getUrl();
    let url = urls.securityMgmtPermissionResource;
    return fetch.put(url, {
        permissions: permissionParams
    });
}

// check permissions
export async function checkPermission(permission) {
    let urls = await getUrl();
    let url = urls.userInformation;
    return fetch.get(url);
}

export async function getResourceInfo(materialKey) {
    let urls = await getUrl();
    let url = urls.getResourceInfo;
    url = url.replace("{0}", materialKey);
    return fetch.get(url);
}

// delete resource from security
export async function deleteResourceFromSecurity(resourceid) {
    let urls = await getUrl();
    let url = urls.deleteResource;
    return fetch.del(url, {
        resources: [
            {
                resourceid: resourceid
            }
        ]
    });
}

// get all visualizations
export async function getVisualInfo(visualizationid) {
    let urls = await getUrl();
    let url = urls.securityMgmtVisualization;
    url = url + "?visualizationid=" + visualizationid + "&limit=1000&pageno=1";
    return fetch.get(url);
}

//  genarator UID
// function getGuid() {
//     var guid = "";
//     for (var i = 1; i <= 32; i++) {
//         var n = Math.floor(Math.random() * 16.0).toString(16);
//         guid += n;
//         if (i === 8 || i === 12 || i === 16 || i === 20) guid += "-";
//     }
//     return guid.toUpperCase();
// }
