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
 * Created by SongCheng on 20/05/2018.
 */

import Fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

//get alarm detail
export async function getDetaildata(id) {
    let urls = await getUrl();
    return Fetch.get(urls.alarmsPlugin + id);
}

//get alarm detail media
export async function getDetailMedia(id) {
    let urls = await getUrl();
    let header = {
        headers: {
            Accept: "application/octet-stream"
        }
    };
    return Fetch.getFile(urls.alarmDownload + id, header);
}

//search alarm list accroding to query condition and sort
export async function getSearchItemsData({ paginator, sortorders, predicate, extension, grouping, applicationid }) {
    let urls = await getUrl();
    let postData = {
        type: "alarms",
        format: "filter",
        paginator,
        predicate,
        sortorders,
        extension,
        grouping,
        applicationid
    };
    return Fetch.post(urls.alarmSearch, postData);
}

//exportAlarmData
export async function exportAlarmData({ itemsData, columninfos, pageLimit, applicationid }) {
    let urls = await getUrl();
    let postdata = {
        fileinfo: {
            filename: "alarm",
            timezone: -8,
            format: "excel",
            columninfos
        },
        filter: {
            format: "filter",
            type: "alarms",
            predicate: itemsData
        },
        pageinfo: {
            indexs: [
                {
                    end: 1,
                    start: 1
                }
            ],
            pagesize: pageLimit
        },
        applicationid
    };
    return Fetch.postText(urls.exportAlarms, postdata);
}

//get stream data
export async function getStreamDataApi({ pageNo, pageLimit, applicationid }) {
    let urls = await getUrl();
    let postData = {
        type: "alarms",
        format: "filter",
        paginator: { pageno: "1", limit: 60 },
        applicationid: applicationid
    };
    return Fetch.post(urls.alarmSearch, postData);
}

//get alarm parameter
export async function getParameters(parametername) {
    let urls = await getUrl();
    return Fetch.get(urls.alarmParameters + parametername);
}

//get parameters option
export async function callParametersApi(value) {
    let urls = await getUrl();
    return Fetch.get(urls.alarmParameters + "?parametername=" + value);
}

//acknowledge alarm
export async function callChangeStateApi(obj) {
    let urls = await getUrl();
    return Fetch.post(urls.getAlarms + "/" + obj.id + "?owner=" + obj.owner + "&state=" + obj.state);
}

//callAssociateItemApi
export async function callAssociateItemApi(obj) {
    let urls = await getUrl();
    return Fetch.post(urls.getAlarms + "/" + obj.parentId + "?associate=" + obj.childId);
}

//dissociate item
export async function callDissociateItemApi(obj) {
    let urls = await getUrl();
    return Fetch.post(urls.getAlarms + "/" + obj.parentId + "?dissociate=" + obj.childId);
}

//call EditDataApi
export async function callEditDataApi(id, str) {
    let urls = await getUrl();
    return Fetch.post(urls.getAlarms + "/" + id + "?" + str);
}

//getUserListApi
export async function getUserListApi(obj) {
    let urls = await getUrl();
    return Fetch.get(urls.securityMgmtUser + "?pageno=" + obj.pageNo + "&limit=" + obj.pageLimit);
}

//getCommentsDataApi
export async function getCommentsDataApi(obj) {
    let urls = await getUrl();
    return Fetch.get(urls.alarmComments + obj.id);
}

//postCommentsApi
export async function postCommentsApi(obj) {
    let urls = await getUrl();
    let postData = {
        comments: [obj.value]
    };
    return Fetch.post(urls.getAlarms + "/" + obj.id, postData);
}
//callPostFileIdApi
export async function callPostFileIdApi(obj) {
    let urls = await getUrl();
    let postData = {
        addattachmenturis: obj.fileId
    };
    return Fetch.post(urls.getAlarms + "/" + obj.id, postData);
}

//callUploadFileApi
export async function callUploadFileApi(formData) {
    let urls = await getUrl();
    return Fetch.uploadFile(urls.uploadFile, formData);
}

//callGetPageKeyApi
export async function callGetPageKeyApi(obj) {
    let urls = await getUrl();
    return Fetch.get(urls.sysconfigDetail + obj.value);
}
