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
 * Created by Krishalee on 19/11/2018
 */
import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
// import { url } from "inspector";

//file upload
export async function uploadFile(file) {
    let urls = await getUrl();
    console.log("api call ",file);
    return fetch.uploadFile(urls.uploadFile, file);
}

//get configs
export async function getConfigsFromSysconfig(param){
    let urls = await getUrl();
    return fetch.get(urls.sysconfigDetail + "?sitename=" + param.site + "&modulename=" + param.modulename + "&submodulename=" + param.submodulename);
}

//get file history
export async function fileHistory(pageno, limit){
    let urls = await getUrl();
    console.log(pageno);
    return fetch.get(urls.filesearch + "?sortkey=uploadTime&order=desc&pageNo=" + pageno + "&limit=" + limit);
}
