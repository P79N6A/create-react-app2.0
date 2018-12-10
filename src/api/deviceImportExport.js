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
 * Created by Krishalee on 29/11/2018
 */
import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

//import file with type
export async function deviceImport(file, uploadtype) {
    let urls = await getUrl();
    console.log("api call ",file, uploadtype);
    return fetch.importFile(urls.topologyBulkImport, file, uploadtype);
}

//get file history
export async function fileHistory(data){
    let urls = await getUrl();
    console.log(data.postData);
    return fetch.post(urls.topologyImportHistory, data.postData);
}