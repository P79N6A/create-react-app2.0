/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * @fileOverview Here need the description for this file
 * @module Fetch
 * @author HeZIGANG
 * @exports {
 *  get,
 *  post,
 *  put,
 *  del,
 *  postText
 * }
 */

import tokenHelper from "./tokenHelper";
import { TOKEN_KEY } from "../constants/const";
import invalidToken from "./invalidToken";

const invalidTokenCode = "2007020009";

const ThrowErrMsg = err => {
    if (typeof err === "object") {
        err.message = err.message === "Failed to fetch" ? "Can't Connect Server" : err.message;
        return err;
    }
    return err;
};

let IsJsonString = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

// private
let fetchApi = function(url, option) {
    return fetch(url, option)
        .then(res => res.text())
        .then(text => {
            let res = IsJsonString(text) ? JSON.parse(text) : text;
            if (res && res.status && res.status.code === invalidTokenCode) {
                invalidToken();
            }
            return IsJsonString(text) ? JSON.parse(text) : text;
        })
        .catch(err => {
            throw ThrowErrMsg(err);
        });
};

// private
let fetchFileApi = function(url, option) {
    return fetch(url, option)
        .then(res =>
            res.blob().then(blob => {
                return [blob, res];
            })
        )
        .catch(err => {
            throw ThrowErrMsg(err);
        });
};
//private
// let fetchTextApi = function(url, option) {
//     return fetch(url, option)
//         .then(res => res.text())
//         .then(json => {
//             return json;
//         })
//         .catch(err => {
//             throw err;
//         });
// };

// private
let getCustomHeader = function(header = {}) {
    let result = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...header
    };

    let token = tokenHelper.get();
    if (token) {
        result[TOKEN_KEY] = token;
    }

    return result;
};

let option = {
    mode: "cors",
    cache: "default"
};

/**
 * Call server API/JSON based on HTTP GET
 * @example
 * import Fetch from 'core/v2/fetch';
 * Fetch.get('http://api/user/profile').then(user=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @returns Promise
 */
function get(url, fileHeader, header) {
    let op = Object.assign(
        {},
        option,
        {
            method: "GET",
            headers: getCustomHeader(header)
        },
        fileHeader
    );
    return fetchApi(url, op);
}

function getFile(url, fileHeader, hd) {
    let op = Object.assign(
        {},
        option,
        {
            method: "GET",
            headers: getCustomHeader(hd)
        },
        fileHeader
    );
    return fetchFileApi(url, op);
}

/**
 * Call server API based on HTTP POST
 * @example
 * import Fetch from 'core/v2/fetch';
 * Fetch.post('http://api/user/login', {user:'zach', password:'pass'})
 *      .then(status=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @param {object} pd
 * @returns Promise
 */
function post(url, pd) {
    let op = Object.assign({}, option, {
        method: "POST",
        body: typeof pd === "string" ? pd : JSON.stringify(pd),
        headers: getCustomHeader()
    });

    return fetchApi(url, op);
}

function postText(url, pd) {
    const head = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    let op = {
        mode: "cors",
        cache: "default",
        method: "POST",
        body: JSON.stringify(pd),
        headers: getCustomHeader(head)
    };

    return fetchApi(url, op);
}

/**
 * Call server API based on HTTP PUB
 * @example
 * import Fetch from 'core/v2/fetch';
 * Fetch.put('http://api/user/changePassword', {
 *     newPassword:'zach',
 *     olbPassword:'pass',
 *     confirmPassword:'pass'
 * }).then(status=>console.log(user)).catch(err=>throw err);
 *
 * @param {string} url
 * @param {object} pd
 * @returns Promise
 */
function put(url, pd) {
    let op = Object.assign({}, option, {
        method: "PUT",
        body: JSON.stringify(pd),
        headers: getCustomHeader()
    });

    return fetchApi(url, op);
}

/**
 * Call server API based on HTTP DELETE
 * @example
 * import Fetch from 'core/v2/fetch';
 * Fetch.del('http://api/user/remove/userid').then(status=>console.log(status)).catch(err=>throw err);
 *
 * @param {string} url
 * @returns Promise
 */
function del(url, pd) {
    if (!pd) {
        pd = {};
    }
    let op = Object.assign({}, option, {
        method: "DELETE",
        body: JSON.stringify(pd),
        headers: getCustomHeader()
    });

    return fetchApi(url, op);
}
let getCustomHeaderByFile = function(data) {
    let result = {
        Accept: "application/json, text/javascript, */*; q=0.01",
        // 'Content-Type': 'multipart/form-data',
        body: JSON.stringify(data)
    };

    let token = tokenHelper.get();
    if (token) {
        result[TOKEN_KEY] = token;
    }

    return result;
};
function postFile(url, fileHeader) {
    // console.log(fileHeader);
    let formData = new FormData();
    formData.append("fileParamName", fileHeader.file);
    // console.log(formData);
    var op = Object.assign(
        {},
        option,
        {
            method: "post",
            body: formData,
            headers: getCustomHeaderByFile(fileHeader.paramData)
        }
        // fileHeader.paramData
    );
    // console.log(op);
    // return fetchFileApi(url, op);
    return fetchApi(url, op);
}
let getCustomHeaderByUploadFile = function(data) {
    let result = {
        Accept: "application/json, text/javascript, */*; q=0.01",
        // 'Content-Type': 'multipart/form-data',
        description: data.name,
        fileName: data.name
    };

    let token = tokenHelper.get();
    if (token) {
        result[TOKEN_KEY] = token;
    }

    return result;
};
function uploadFile(url, file) {
    // console.log(file);
    let formData = new FormData();
    formData.append("file", file);
    // console.log(formData);
    var op = Object.assign(
        {},
        option,
        {
            method: "post",
            body: formData,
            headers: getCustomHeaderByUploadFile(file)
        }
        // fileHeader.paramData
    );
    // console.log(op);
    // return fetchFileApi(url, op);
    return fetchApi(url, op);
}

let customizeHeaderforImportFile = function (data, acceptTypes) {
    let result = {
        Accept: acceptTypes,
        // 'Content-Type': 'multipart/form-data',
    };

    if(data){
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                result[key] = data[key];
            }
        }
    }

    let token = tokenHelper.get();
    if (token) {
        result[TOKEN_KEY] = token;
    }

    return result;
};

function importFile(url, file, headerParams) {
    let accepatableFormats = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12, */*; q=0.01";
    let formData = new FormData();
    formData.append("file", file);

    var op = Object.assign(
        {},
        option,
        {
            method: "post",
            body: formData,
            headers: customizeHeaderforImportFile(headerParams, accepatableFormats)
        }
    );

    return fetchApi(url, op);
}

export default {
    get,
    post,
    put,
    del,
    postFile,
    getFile,
    uploadFile,
    postText,
    importFile
};
