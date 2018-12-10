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
 * Created by SongCheng on 20/05/18.
 */
import Fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

//get event list data
export async function getSearchItemsData({ paginator, sortorders, predicate, extension, grouping, applicationid }) {
    let urls = await getUrl();
    let postData = {
        type: "events",
        format: "filter",
        applicationid,
        paginator,
        predicate,
        sortorders,
        extension,
        grouping
    };

    return Fetch.post(urls.eventSearch, postData);
}

//get event detail
export async function getDetaildata(id) {
    let urls = await getUrl();
    return Fetch.get(urls.eventsPlugin + id);
}

/**
 *
 *
 * @export
 * @param {array} columninfos
 * @param {array} iotIds
 * @param {array} times
 * @param {array} readings
 * @param {string} aggregation
 * @param {string} interval
 * @param {string} grouping
 * @returns
 */
export async function exportEventData({ itemsData, columninfos, pageLimit, applicationid }) {
    let urls = await getUrl();
    let postdata = {
        fileinfo: {
            filename: "event",
            timezone: -8,
            format: "excel",
            columninfos
        },
        filter: {
            format: "filter",
            type: "events",
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

    return Fetch.postText(urls.exportEvents, postdata);
}

//get stream data
export async function getStreamDataApi({ pageNo, pageLimit, predicate, applicationid }) {
    let urls = await getUrl();
    let postData = {
        type: "events",
        format: "filter",
        paginator: { pageno: pageNo, limit: pageLimit },
        predicate: predicate,
        applicationid: applicationid
    };
    return Fetch.post(urls.eventSearch, postData);
}

//get parameters option
export async function callParametersApi(value) {
    let urls = await getUrl();
    return Fetch.get(urls.eventParameters + "?parametername=" + value);
}
