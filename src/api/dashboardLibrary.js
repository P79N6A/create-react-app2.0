import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import { DASHBOARD_TEMPLATE } from "commons/constants/const";
import tokenHelper from "commons/utils/tokenHelper";

export async function upadtePageConfigbyPagekey(pageKey, pageConfig) {
    let urls = await getUrl();
    let postData = {
        pageKey,
        "material-key": "ISC_WEB_PAGE_DEFAULT_CONFIG",
        configValue: pageConfig
    };
    return fetch.post(urls.saveWidgets, postData);
}

export async function dashboardList(searchData = {}) {
    let urls = await getUrl();
    return fetch.post(urls.getPageConfigSummary, searchData);
}

export async function dashboardItem(key) {
    let urls = await getUrl();
    let newUrl = formatter(urls.getPageConfigItem, key);
    return fetch.get(newUrl);
}

export async function saveDashboard(status, pageName, desc, group, widgets, thumbnail, materialKey, priority, appid) {
    let urls = await getUrl();
    let postData = {
        "material-key": materialKey,
        desc: desc || "",
        version: "1.0",
        status: status || "2002",
        priority,
        applicationId: appid,
        configValue: {
            thumbnail: thumbnail || "",
            title: pageName || "",
            group: group || "",
            widgets: widgets || []
        }
    };
    return fetch.post(urls.savePageConfig, postData);
}

export async function savePageConfigDetail(originData, editData) {
    let urls = await getUrl();
    let postData = Object.assign({}, originData, {
        configValue: {
            ...(originData.configValue || {}),
            ...editData
        }
    });
    return fetch.post(urls.saveWidgets, postData);
}

export async function deleteDashboard(key) {
    let urls = await getUrl();
    let rootUrl = formatter(urls.deletePageConfig, key);
    return fetch.del(rootUrl);
}

export async function updateGroup(groupId, pages, status, desc, appid) {
    let urls = await getUrl();
    let postData = {
        id: groupId,
        page: pages,
        status: status || "2002",
        desc: desc || ""
        // applicationId: appid
    };
    if (appid) postData.applicationId = appid;
    return fetch.put(urls.updateGroup, postData);
}

export async function updateGroupNew(seqId, name, pages = [], status = "2002", desc = "", appid) {
    let urls = await getUrl();
    let postData = {
        seqId,
        id: name,
        pages: pages,
        status: status,
        desc: desc,
        applicationId: appid
    };
    return fetch.post(urls.updateGroupNew, postData);
}

export async function updateGroupList(groupList) {
    let urls = await getUrl();
    return fetch.post(urls.updateGroup, groupList);
}

export async function getGroupList(applicationId) {
    let urls = await getUrl();
    let searchData = {
        sortOrders: [{ field: "updateDt", asc: true }, { field: "id", asc: false }]
    };
    if (applicationId) searchData["applicationId"] = applicationId;
    return fetch.post(urls.getGroupList, searchData);
}

export async function deleteGroup(seqId) {
    let urls = await getUrl();
    let rootUrl = urls.deleteGroup + "?groupSeqId=" + seqId;
    return fetch.post(rootUrl);
}

export async function editGroup(seqId, id, page, desc) {
    let urls = await getUrl();
    let postData = {
        seqId,
        id,
        page,
        desc
    };
    return fetch.put(urls.updateGroup, postData);
}

export async function duplicatePageConfig(pageKey, name, appid) {
    let urls = await getUrl();
    let postData = {
        pageKey,
        name,
        applicationId: appid,
        status: "3001",
        configValue: {
            title: name
        }
    };
    return fetch.post(urls.duplicatePageConfig, postData);
}

export async function getDashboardTemplate(appid) {
    let urls = await getUrl();
    let postData = { group: DASHBOARD_TEMPLATE };
    if (appid) postData.applicationId = appid;
    return fetch.post(urls.getDashboardTemplate, postData);
}

export async function deleteTemplate(id) {
    let urls = await getUrl();
    let rootUrl = formatter(urls.deleteTemplate, DASHBOARD_TEMPLATE, id);
    return fetch.del(rootUrl);
}

export const checkUserModify = async pageKey => {
    const urls = await getUrl();
    let url = urls.ckeakModity.replace("{token}", tokenHelper.get());
    return fetch.post(url, { pageKey });
};

export const cleanTokenForPageConfig = async pageKey => {
    const urls = await getUrl();
    let url = urls.cleanTokenForPage.replace("{token}", tokenHelper.get());
    return fetch.post(url, { pageKey });
};
// create resource (page material-key)
export async function createSecurityResource(mk) {
    let urls = await getUrl();
    let url = urls.securityMgmtResource;
    let params = [
        {
            resourcedesc: "page_resource",
            resourcename: mk,
            resourcetype: "1",
            resourcevalue: "R-DASHBOARD",
            resourcetables: "PAGE",
            resourceid: mk
        }
    ];
    return fetch.post(url, {
        resources: params
    });
}
// check if resource is valid
export async function checkResource(mk) {
    let urls = await getUrl();
    let url = urls.securityMgmtResource + "?resourcename=" + mk;
    return fetch.get(url);
}
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
// sync the ccms security
export async function updateMaterialKeyToCcms(mk_list) {
    let urls = await getUrl();
    let url = urls.newMaterialKey;
    return fetch.post(url, mk_list);
}

// delete resource from security
export async function deleteResourceFromSecurity(resourceid) {
    let urls = await getUrl();
    let url = urls.deleteResource;
    return fetch.delete(url, {
        resources: [
            {
                resourceid: resourceid
            }
        ]
    });
}

// create visiualization
export async function createVisiualizations(postdata) {
    let urls = await getUrl();
    const url = urls.securityMgmtVisualization;
    return fetch.post(url, postdata);
}
// get visualization
export async function getVisualization() {
    let urls = await getUrl();
    const url = urls.securityMgmtVisualization;
    return fetch.get(url);
}

export async function getTopologyResource(path) {
    let urls = await getUrl();
    let url = urls.topologySearchResource;
    path = path || JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO") || "{}")["address.resourcePath"];
    const postdata = {
        format: "recordset",
        outputs: ["physical", "devicemodel"],
        paginator: { limit: 1, pageno: 1 },
        resources: ["physical"],
        predicate: {
            operator: "AND",
            predicates: [
                {
                    operator: "OR",
                    predicates: [
                        {
                            field: "physical.resourcePath",
                            operator: "LIKE",
                            value: path + "/"
                        }
                    ]
                }
            ]
        },
        type: "graphs",
        orderby: "physical.resourcePath asc"
    };
    return fetch.post(url, postdata);
}

// get applications by userid
export async function getApplicationsByUserId(userId) {
    let urls = await getUrl();
    const url = urls.getApplicationsByGroupId.replace("{0}", userId) + "?pageno=1&limit=50&asc=asc";
    return fetch.get(url);
}

// check pagename exist
export async function checkPagenameExist(accountId, pageName) {
    let urls = await getUrl();
    const url = urls.checkPageNameIsExist.replace("{accountId}", accountId).replace("{pageName}", pageName);
    return fetch.get(url);
}

// formatter function
function formatter(str, ...data) {
    let arr = str.match(/{\d+}/g);
    let newStr = str;
    arr &&
        arr.forEach(item => {
            let num = item.replace("{", "").replace("}", "");
            if (data[num]) {
                newStr = newStr.replace(item, data[num]);
            }
        });
    return newStr;
}
