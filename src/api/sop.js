import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
export async function searchList(obj) {
    // console.log(obj);
    let postData = {
        "format": "filter",
        "paginator": {
            "limit": obj.pagination.limit || 10,
            "pageno": obj.pagination.currentpage || 1
        },
        "predicate": {
            "operator": "AND",
            "predicates": [
                {
                    "field": "eventtype",
                    "operator": "LIKE",
                    "value": obj.keyWord
                }
            ]
        },
        "sortorders": obj.sortorders,
        "type": "sops"
    };

    let urls = await getUrl();
    // console.log(urls.sopSearch);
    // let url = "bpm/sops/search/";
    // return fetch.post(url, postData);
    return fetch.post(urls.sopSearch, postData);
};
export async function addSops(obj) {
    // console.log(obj);
    // let formData = new window.FormData();
    // let data = formData.append('file', obj.file);
    // console.log(data)
    if(obj === "file") return false;
    let paramData = {
        "format": "sops",
        "filename": obj.file.name,
        "alarmtype": obj.fromData.fromData.alarmtype,
        "starttime": obj.fromData.fromData.starttime,
        "endtime": obj.fromData.fromData.endtime,
        "sopdescription": obj.fromData.fromData.sopdescription
    };

    let urls = await getUrl();
    // console.log(urls.addSops);
    // let url = "bpm/sops/search/";
    let file = obj.file;
    // let fileData = { 
    //     method: 'POST',
    //     body: obj.file,
    //     headers:{
    //         // "Content-Type": "multipart/form-data"
    //     }
    // };
    let postData = {
        file,
        paramData
    };
    // console.log(postData);
    // return fetch.post(urls.addSops, data);    
    return fetch.postFile(urls.addSops, postData
    );
};
export async function deletSops(obj) {
    // console.log(obj);
    let postData = {
        "format": "sops",
        "processdefinitionid": obj
    };

    let urls = await getUrl();
    // console.log(urls.sopSearch);
    // let url = "bpm/sops/search/";
    // return fetch.post(url, postData);
    return fetch.post(urls.delSops, postData);
};
export async function editSop(obj) {
    // console.log(obj);
    let paramData = {
        "format": "sops",
        "alarmtype": obj.fromData.alarmtype,
        "processdefinitionid": obj.fromData.processdefinitionid,
        "starttime": obj.fromData.starttime,
        "endtime": obj.fromData.endtime,
        "sopdescription": obj.fromData.sopdescription
    };
    // console.log(paramData);
    let urls = await getUrl();
    return fetch.post(urls.updateSops, paramData);
};
export async function getSopManagmentSchema(siteName) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${siteName}&modulename=topology&submodulename=application-schema&configname=default-application-schema`
    );
};