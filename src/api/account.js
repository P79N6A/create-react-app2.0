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
 * Created by Jia Luo on 11/09/2018.
 */

import Fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getAcountList(searchData = {}) {
    let urls = await getUrl();
    let rootParam = "";
    for (let key in searchData) {
        if (searchData[key] !== "") {
            rootParam += key + "=" + (searchData[key] || "") + "&";
        }
    }
    rootParam = rootParam.substring(0, rootParam.length - 1);
    return Fetch.get(urls.sysconfigAccounts + (rootParam ? "?" + rootParam : ""));
    // return Fetch.get(urls.sysconfigAccountSearch + (rootParam ? "?" + rootParam : ""));
}

export async function getAccountItem(accountid) {
    let urls = await getUrl();
    return Fetch.get(urls.sysconfigAccounts + "/" + accountid);
}

// accountData array
export async function saveAccount(accountData) {
    let urls = await getUrl();
    let postData = {
        accounts: accountData
    };
    return Fetch.post(urls.sysconfigAccounts, postData);
}

// accountids array [id: 222]
export async function deleteAccount(accountids) {
    let urls = await getUrl();
    let postData = {
        accounts: accountids
    };
    return Fetch.post(urls.sysconfigAccounts + "/delete", postData);
}

// delete account
export async function updateAccount(accountData) {
    let urls = await getUrl();
    let postData = {
        accounts: accountData
    };
    return Fetch.post(urls.sysconfigAccounts + "/update", postData);
}

export const saveUrlToSysApi = async (postdata, tenantname, accountid) => {
    let urls = await getUrl();
    return Fetch.post(
        `${urls.sysconfigs}?sitename=${tenantname}&modulename=gui-config&submodulename=url&accountid=${accountid}`,
        postdata
    );
};

export const updateUrlToSys = async (postdata, tenantname) => {
    let urls = await getUrl();
    return Fetch.put(
        `${urls.sysconfigs}?sitename=${tenantname}&modulename=gui-config&submodulename=url&configname=services`,
        postdata
    );
};

export const getMasterUrls = async () => {
    let urls = await getUrl();
    let url = urls.sysconfigs;
    return Fetch.get(`${url}?sitename=master&modulename=gui-config&submodulename=url&configname=services`);
};

export const getAccount = async searchData => {
    let urls = await getUrl();
    let rootParam = "";
    searchData = Object.assign({}, searchData, {
        modulename: "account_managment",
        sitename: "multi_tenancy",
        submodulename: "account_groups"
        // modulename: "alarm_config",
        // sitename: "singtel",
        // submodulename: "users"
    });
    for (let key in searchData) {
        if (searchData[key] !== "") {
            rootParam += key + "=" + (searchData[key] || "") + "&";
        }
    }
    return Fetch.get(urls.sysconfigs + (rootParam ? "?" + rootParam : ""));
};

export const editAccountGroupConfigs = async postData => {
    let urls = await getUrl();
    let url = urls.sysconfigs;
    return Fetch.post(`${url}?sitename=multi_tenancy&modulename=account_managment&submodulename=account_groups`, {
        configs: postData
    });
    // return Fetch.post(`${url}?sitename=singtel&modulename=alarm_config&submodulename=users`, {
    //     configs: postData
    // });
};
