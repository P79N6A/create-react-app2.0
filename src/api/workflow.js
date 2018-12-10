import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
export async function getReassignUser(data, alarmid) {
    
    // let postData = {
    //     "format": "filter",
    //     "paginator": {
    //         "limit": data.paginator.limit,
    //         "pageno": data.paginator.currentpage  
    //     },
    //     "predicate": {
    //         "operator": "AND",
            
    //         "predicates": [
    //             {
    //                 "field": "action",
    //                 "operator": "EQ",
    //                 "value": "reassign"
    //             },
    //             {
    //                 "field": "taskid",
    //                 "operator": "EQ",
    //                 "value": data
    //             }
    //         ]
    //     },
    //     "sortorders":[
    //         {
    //             "ascending": true,
    //             "sortfield": "assignee"
    //         }
    //     ],
    //     "type": "tasks"
    // };
    // let urls = await getUrl();
    // let type = details || "full";
    // let id = alarmid || "al.39fde7d338ab4d50a3cab31eb70244c7";
    // // return fetch.get(urls.workflow+"?alarmid="+alarmid);
    // return fetch.get(`${urls.workflow}?details=${type}&alarmid=${id}`);
    // return fetch.get("http://192.168.204.230:9092/isc-bpm-api/v1/bpm/tasks?alarmid=al.596fd6b27203484c938528cbb98bd5be");
};
export async function searchList(data) {
    // console.log(data);
    let postData = {
        "format": "filter",
        "paginator": {
            "limit": data.paginator.limit,
            "pageno": data.paginator.currentpage  
        },
        "predicate": {
            "operator": "AND",
            "predicates": [
                {
                    "field": "assignee",
                    "operator": "LIKE",
                    "value": data.keyWord
                }
            ]
        },
        "sortorders":[
            {
                "ascending": true,
                "sortfield": "assignee"
            }
        ],
        "type": "tasks"
    };

    let urls = await getUrl();
    return fetch.post(urls.tasksearch, postData);
};
export async function taskList(alarmid) {
    let urls = await getUrl();
    // let postData = {
    //     format: "recordset",
    //     outputs: ["address", "location", "logical", "physical", "property"],
    //     predicate: {
    //         predicates: iotIds.map((item) => {
    //             return {
    //                 field: "physical.iotTopologyId",
    //                 operator: "LIKE",
    //                 value: item
    //             };
    //         }),
    //         operator: "OR"
    //     },
    //     resources: ["address", "location", "logical", "physical", "property"],
    //     type: "graphs"
    // };
    let id = alarmid;
    // return fetch.get(urls.workflow+"?alarmid="+alarmid);
    return fetch.get(`${urls.workflow}${id}`);
};
export async function modelXml(processdefinitionid) {
    let urls = await getUrl();
    return fetch.get(`${urls.getModel}${processdefinitionid}`);
}
export async function submitTask(taskid, content) {
    let urls = await getUrl();
    return fetch.post(urls.taskInfoUrl+"/"+taskid, content);
};
// getCheckInfo
export async function getCheckInfoById(alarmids) {
    let urls = await getUrl();
    return fetch.get(`${urls.alarmsPlugin}${alarmids}`);
};
// getCheckTaskInfo
export async function getTaskInfo(taskId) {
    // if(taskId === "") return;
    let alarmid = taskId.split(";", 1);
    // console.log(alarmid);
    let urls = await getUrl();
    return fetch.get(`${urls.taskInfoUrl}?alarmid=${alarmid}`);
};
export async function uploadFile(fileData) {
    let urls = await getUrl();
    return fetch.uploadFile(urls.uploadFile, fileData);
};
export async function bpmFile(obj, fileUrl) {
    // console.log(obj);
    // console.log(fileUrl);
    if(Object.keys(obj).length === 0) return false;
    let postData = {
        format: "bpmfiles",
        bpmfiles: [
            {
                alarmid: obj.alarmids.split(";", 1)[0],
                // alarmid: obj.alarmids,
                fileid: fileUrl,
                processinstanceid: obj.processinstanceid,
                taskid: obj.id
            }
        ]
    };
    let urls = await getUrl();
    return fetch.post(`${urls.files}?${fileUrl}`, postData);
};
export async function getUploadFiles(alarmid) {
    let alarmids = alarmid.split(";", 1);
    let urls = await getUrl();
    return fetch.get(`${urls.files}?alarmId=${alarmids}`);
}
export async function getBpmFilesInfo(fileIds) {
    // console.log(fileIds);
    let urls = await getUrl();
    return fetch.get(`${urls.fileInfo}${fileIds}`);
}
export async function getDetailMedia(id) {
    let urls = await getUrl();
    let header = {
        headers: {
            Accept: "application/octet-stream"
        }
    };
    return fetch.getFile(urls.alarmDownload + id, header);
}
export async function deletBpmFile(obj, fileId) {
    // console.log(obj);
    // console.log(fileUrl);
    if(Object.keys(obj).length === 0) return false;

    // let alarmid = obj.alarmid.split(";", 1)[0];
    let postData = { 
        format: "bpmfiles", 
        bpmfiles: [ 
            { 
                alarmid: obj.alarmid, 
                processinstanceid: obj.processinstanceid,
                taskid: obj.taskid, 
                fileid: fileId 
            }  
        ] 
    };
    let urls = await getUrl();

    return fetch.post(urls.deleteFiles, postData);
};
export async function deletFile(fileId) {
    if(!fileId) return false;
    let urls = await getUrl();
    return fetch.del(`${urls.uploadFile}/${fileId}`);
};
export async function getFileByTaskId(taskId) {
    if(!taskId) return false;
    let urls = await getUrl();
    return fetch.get(`${urls.files}?taskId=${taskId}`);
};

