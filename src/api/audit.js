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

//get audit list data
export async function getSearchItemsData({ paginator, sortorders, predicate }) {
    let urls = await getUrl();
    let postData = {
        type: "audits",
        format: "filter",
        fields: ["./"],
        paginator,
        predicate,
        sortorders
    };

    return Fetch.post(urls.auditsSearch, postData);
}

//get audit detail
export async function getDetaildata(id) {
    let urls = await getUrl();
    return Fetch.get(urls.auditsDetail + id);
}

// get RequestContent
export async function getRequestContent(id) {
    let urls = await getUrl();
    return Fetch.get(urls.auditsRC + id + "?contentsource=req");
}
