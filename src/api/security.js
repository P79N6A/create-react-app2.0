import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import formatter from "commons/utils/formatterUrlParam";
// import { SETTINGS_CONFIG_PATH } from "commons/constants/const";

export async function getUserList(searchData) {
    let urls = await getUrl();
    let rootParam = "";
    searchData = Object.assign({ activeflag: "both" }, searchData);
    for (let key in searchData) {
        if (searchData[key] !== "") {
            rootParam += key + "=" + (searchData[key] || "") + "&";
        }
    }
    rootParam = rootParam ? "?" + rootParam.substring(0, rootParam.length - 1) : "";
    return fetch.get(urls.securityMgmtUser + rootParam);
}

export async function getUserFromId(userid) {
    let urls = await getUrl();
    return fetch.get(urls.securityMgmtUser + "/" + userid);
}

export async function saveUser(userData) {
    let urls = await getUrl();
    userData.active = false;
    userData.usercontactno2 = "";
    let postData = {
        users: [userData]
    };
    return fetch.post(urls.securityMgmtUser, postData);
}

export async function updateUser(userData) {
    let urls = await getUrl();
    userData.usercontactno2 = "";
    let postData = {
        users: [userData]
    };
    return fetch.put(urls.securityMgmtUser, postData);
}

export async function deleteUser(userId) {
    let urls = await getUrl();
    let postData = { users: userId };
    return fetch.del(urls.securityMgmtUser, postData);
}

// user Group
export async function getGroupList(searchData) {
    let urls = await getUrl();
    searchData = Object.assign({}, searchData);
    let rootParam = "";
    for (let key in searchData) {
        if (searchData[key] || typeof searchData[key] === "boolean") {
            rootParam += key + "=" + (searchData[key] || "") + "&";
        }
    }
    rootParam = rootParam ? "?" + rootParam.substring(0, rootParam.length - 1) : "";
    return fetch.get(urls.securityMgmtUserGroups + (rootParam ? rootParam : ""));
}

// export async function saveGroup(group) {
//     let urls = await getUrl();
//     let postData = {
//         groups: group
//     };
//     return fetch.post(urls.securityMgmtGroup, postData);
// }

export async function getGroupFromId(grpid) {
    let urls = await getUrl();
    let rootUrl = formatter(urls.securityMgmtUserGroupCurr, grpid);
    return fetch.get(rootUrl);
}

export async function saveGroup({ grpname, grpdescription, applications, visualizations }) {
    let urls = await getUrl();
    let postData = {
        grpname: grpname,
        grpdescription: grpdescription,
        applications: applications,
        // visualizations: visualizations,
        users: []
    };
    return fetch.post(urls.securityMgmtUserGroup, postData);
}

export async function updateGroup({ grpname, grpdescription, applications, visualizations, grpid }) {
    let urls = await getUrl();
    let postData = {
        grpid,
        grpname: grpname,
        grpdescription: grpdescription,
        applications: applications,
        // visualizations: visualizations,
        users: []
    };
    return fetch.put(urls.securityMgmtUserGroup, postData);
}

export async function deleteGroup(groupId) {
    let urls = await getUrl();
    let postData = { groups: groupId };
    return fetch.del(urls.securityMgmtUserGroups, postData);
}

// user role
export async function getRoleList(searchData) {
    let urls = await getUrl();
    let rootParam = "";
    for (let key in searchData) {
        rootParam += key + "=" + searchData[key] || "";
    }
    return fetch.get(urls.securityMgmtRole + (rootParam ? "?" + rootParam : ""));
}

export async function saveRole() {
    let urls = await getUrl();
    let postData = {
        users: [{}]
    };
    return fetch.post(urls.securityMgmtRole, postData);
}

export async function updateRole() {
    let urls = await getUrl();
    let postData = {
        users: [{}]
    };
    return fetch.put(urls.securityMgmtRole, postData);
}

export async function deleteRole(userId) {
    let urls = await getUrl();
    let postData = { users: [{ userid: userId }] };
    return fetch.del(urls.securityMgmtRole, postData);
}

// group role
export async function addRole(rolesData) {
    let urls = await getUrl();
    let postData = {
        roles: rolesData
    };
    return fetch.post(urls.securityMgmtRole, postData);
}

export async function updateGroupRole(rolesData) {
    let urls = await getUrl();
    let postData = {
        roles: rolesData
    };
    return fetch.put(urls.securityGroupRole, postData);
}

// user group
export async function updateUserGroup(usersData) {
    let urls = await getUrl();
    let postData = {
        users: usersData
    };
    return fetch.put(urls.securityUserGroup, postData);
}

// Temp API ==!

export async function createPermission(permissionData) {
    let urls = await getUrl();
    let postData = {
        permissions: permissionData
    };
    return fetch.post(urls.securityMgmtPermission, postData);
}

export async function permissionResource(resourceData) {
    let urls = await getUrl();
    let postData = {
        permissions: resourceData
    };
    return fetch.post(urls.securityMgmtPermission, postData);
}

export async function rolePermission(rolesPermissionData) {
    let urls = await getUrl();
    let postData = {
        roles: rolesPermissionData
    };
    return fetch.put(urls.securityRolePermission, postData);
}

// resource

const pagenation = {
    pageno: 1,
    limit: 1000
};

export async function getResourceList(searchData) {
    let urls = await getUrl();
    let rootParam = "";
    searchData = Object.assign({}, pagenation, searchData);
    for (let key in searchData) {
        if (searchData[key] !== "") {
            rootParam += key + "=" + (searchData[key] || "") + "&";
        }
    }
    return fetch.get(urls.securityMgmtVisualization + (rootParam ? "?" + rootParam : ""));
}

export async function saveResource() {
    let urls = await getUrl();
    let postData = {
        users: [{}]
    };
    return fetch.post(urls.deleteResource, postData);
}

export async function updateResource() {
    let urls = await getUrl();
    let postData = {
        users: [{}]
    };
    return fetch.put(urls.deleteResource, postData);
}

export async function deleteResource(userId) {
    let urls = await getUrl();
    let postData = { users: [{ userid: userId }] };
    return fetch.del(urls.deleteResource, postData);
}

// resource
export async function getResourcePathList(searchData) {
    let urls = await getUrl();
    let rootParam = "";
    for (let key in searchData) {
        if (searchData[key] !== "") {
            rootParam += key + "=" + (searchData[key] || "") + "&";
        }
    }
    return fetch.get(urls.securityMgmtResourcePath + (rootParam ? "?" + rootParam : ""));
}

export async function saveResourcePath() {
    let urls = await getUrl();
    let postData = {
        users: [{}]
    };
    return fetch.post(urls.securityMgmtResourcePath, postData);
}

export async function updateResourcePath() {
    let urls = await getUrl();
    let postData = {
        users: [{}]
    };
    return fetch.put(urls.securityMgmtResourcePath, postData);
}

export async function deleteResourcePath(userId) {
    let urls = await getUrl();
    let postData = { users: [{ userid: userId }] };
    return fetch.del(urls.securityMgmtResourcePath, postData);
}

export async function resetpassword({ newPassword, confirmPassword, userid, format }) {
    let urls = await getUrl();
    let postData = { newPassword, confirmPassword, userId: userid, format: "ISCResetPasswordDTO" };
    return fetch.post(urls.resetPasswordAdmin, postData);
}

export async function upload(formData) {
    let urls = await getUrl();
    return fetch.uploadFile(urls.uploadFile, formData);
}

export async function removeFile(mediaFileId) {
    let urls = await getUrl();
    return fetch.del(urls.uploadFile + "/" + mediaFileId);
}

export async function getFile(mediaFileId) {
    let urls = await getUrl();
    return fetch.getFile(urls.alarmDownload + mediaFileId, {
        headers: {
            Accept: "application/octet-stream",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/octet-stream;charset=UTF-8"
        }
    });
}

export async function changePassword(formData) {
    let urls = await getUrl();
    return fetch.post(urls.resetPasswordSelf, Object.assign({}, formData, { format: "ISCResetPasswordDTO" }));
}

export async function deleteFile(mediaId) {
    let urls = getUrl();
    return fetch.del(urls.uploadFile + mediaId);
}

export async function activitionUser(postData) {
    return getUrl().then(urls => {
        const { token, ...otherData } = postData;
        let rooturl = formatter(urls.activeUser, token);
        return fetch.post(rooturl, Object.assign({}, otherData, { format: "ISCResetPasswordDTO" }));
    });
}

export async function isValidToken(token) {
    return getUrl().then(urls => {
        let rooturl = formatter(formatter(urls.isValidToken, token));
        return fetch.get(rooturl);
    });
    // let settingsConfig = await fetch.get(SETTINGS_CONFIG_PATH);
    // let servicePath = settingsConfig.urlConfig && settingsConfig.urlConfig.active;
    // let url = `${servicePath}/identity/auth/activate/validate/{0}`;
}

export async function sendEmail(userid) {
    return getUrl().then(urls => {
        return fetch.post(urls.sendEmailToUser, { id: userid });
    });
}
