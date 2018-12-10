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
 * Created by HuLin on 11/11/2018.
 */

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getRequestDeviceName(sitename) {
    let urls = await getUrl();
    return fetch.get(`${urls.sysconfigs}?sitename=${sitename}&modulename=topology&submodulename=device-types&sort=asc`);
}

export async function getRequestDeviceTypeValue(sitename, deviceValue) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${sitename}&modulename=topology&submodulename=device-types&configname=${deviceValue}`
    );
}

//create job
export async function createJob(
    name,
    description,
    deviceName,
    deviceTypeValue,
    jobType,
    appid,
    inputDeviceType,
    modelAPIInput,
    modelId,
    swaggerJson,
    driverCores,
    driverMemory,
    engineType,
    engineUrl,
    executorCores,
    executorMemory,
    configFilePath,
    fileSystemUrl,
    accountId,
    deviceTypeModelName,
    venderName,
    predictionDeviceId,
    mlOutputStructure
) {
    let urls = await getUrl();
    let parametersValue = [];
    for(let i=0; i<deviceTypeValue.length; i++) {
        parametersValue.push({
            "name": deviceTypeValue[i].split("-")[0],
            "type": ["string", "null"]
        });
    }
    let resourcepath = "/" + appid + "/" + deviceTypeModelName;
    let InputFields = [];
    for(let i=0;i<modelAPIInput.length;i++) {
        for(let j=0;j<inputDeviceType.length; j++) {
            if(i === j) {
                InputFields.push({
                    [modelAPIInput[i]]: inputDeviceType[j][`deviceType-${j}`]
                });
            }
        }
    }

    let dataStructure = JSON.stringify(
        {
            "type": "record",
            "name": "DSEFormatSchema",
            "namespace": "com.isc.bigdata.schema",
            "fields": [{
                "name": "details",
                "type": [{
                    "type": "record",
                    "name": "details",
                    "namespace": "com.isc.bigdata.schema.details",
                    "fields": [{
                        "name": "parameters",
                        "type": [{
                            "type": "record",
                            "name": "parameters",
                            "namespace": "com.isc.bigdata.schema.details.parameters",
                            "fields": parametersValue
                        }, "null"]
                    }, {
                        "name": "resourcepath",
                        "type": ["string", "null"]
                    }, {
                        "name": "senderid",
                        "type": ["string", "null"]
                    }, {
                        "name": "sentdatetime",
                        "type": ["string", "null"]
                    }, {
                        "name": "source",
                        "type": ["string", "null"]
                    }]
                }, "null"]
            }]
        });

    let postData = {
        "jobInfo": {
            "jobname": name,
            "description": description,
            "frequency": "hourly",
            "action": "start",
            "deviceModel": "atomicphysicalresourcespec.02bc07d7ed1a41f083797fe7978f0c37",
            "additionalProperties": "string"
        },
        "jobTemplate": {
            "jobType": jobType,
            "applicationId": appid,
            "sourceConfig": {
                "sourceType": "KAFKA",
                "sourceSubType": "kafkaDseJsonMLSource",
                "sourceEngineConfig": {
                    "subscribe": "tenantId.applicationId.stream.in",
                    "startingOffsets": "latest",
                    "kafka.bootstrap.servers": "hdpmaster01:9092,hdpworker01:9092,hdpworker02:9092"
                }
            },
            "dataStructure": dataStructure,
            "fileSystemConfig": {
                "fileSystemType": "HDFS",
                "fileSystemUrl": fileSystemUrl,
                "configFilePath":configFilePath
            },
            "engineConfig": {
                "engineType": engineType,
                "engineUrl": engineUrl,
                "entryClass": "com.isc.bigdata.app.SparkDynamicProcessEntry",
                "jarFileHdfsPath": "/home/uhdp/spark/spark-extlibs/bigdata-spark-executor-1.0.0-SNAPSHOT.jar",
                "masterUrl": "yarn",
                "driverMemory": driverMemory,
                "driverCores": driverCores,
                "executorMemory": executorMemory,
                "executorCores": executorCores,
                "numExecutors": 1,
                "additionalConfigs": {
                }
            },
            "logicConfig": {
                "isForward": true,
                "ifSetWindow": false,
                "deviceid": ["string"],
                "deviceType": deviceName,
                "runTimeConfig": {
                    
                },
                "mlWsApiConfig": {
                    "predictionDeviceId": predictionDeviceId,
                    "vendor": venderName,
                    "modelId": modelId,
                    "webAuthKey": "Bearer 4E3Mykexe3TajMU5+4wyDRLzPmUzOaov8S9bfZlQ9f+eZ0jJbL99vN7tRIaUhM4TrQmdH75xn5eixgr2xhIYOg&#x3D;&#x3D;",
                    "webServerUrl": "https://ussouthcentral.services.azureml.net/workspaces/0581b95d40a54546b7ea6f2b5a77709e/services/a7009e74b68640b1bfd9331fd15d8fde/execute?api-version&#x3D;2.0&amp;format&#x3D;swagger",
                    "typeKey": "iot-body-gesture-01",
                    "mlInputStructure": {
                        "swaggerApiJson": "/definitions/ExecutionInputs",
                        "fields": InputFields
                    },
                    "mlOutputStructure": JSON.parse(mlOutputStructure),
                    "predictionDseTemplate": {
                        "resourcepath": resourcepath,     
                        "sentdatetime": "",
                        "senderid": predictionDeviceId,
                        "format": "DeviceStatusEvent",            
                        "eventtype": "Device/Prediction",        
                        "id": "", 
                        "sourceEventId": "",          
                        "soureFileURL": "https://iot1sacust1.blob.core.windows.net/c0a19158f0974465/FILE-T201", 
                        "source": "ml-dp-device2",  
                        "mlDataProcessingJobID": "", 
                        "predictionTargetDeviceResourcePath": resourcepath, 
                        "parameters": {
                            "accountid": accountId,       
                            "lastupdatetime": "",
                            "deviceid": predictionDeviceId, 
                            "devicetypeid": deviceName, 
                            "scores_for_quantitle_0.75": 0.98,  
                            "chillerController": 15.8,
                        }
                    },
                    "swagger.json": swaggerJson
                }
            },
            "sinkConfig": {
                "sinkType": "KAFKA",
                "sinkSubType": "kafkaStringSink",
                "sinkEngineConfig": {
                    "topic": "tenantid.applicationId.stream.out",
                    "kafka.bootstrap.servers": "hdpmaster01:9092,hdpworder01:9092,hdpworder02:9092"
                },
                "outputMode": "update",
                "checkpointLocation": "/home/uhdp/spark/spark-result-checkpoints/0017/",
                "triggerConfig": {
                    "triggerType": "fixed-interval",
                    "timeType": "seconds",
                    "timeValue": 30
                }
            }
        }
    };

    return fetch.post(urls.machineCreateJob, postData);
}




//search job schedule
export async function searchJobSchedule(page, rowsPerPage, orderBy, order) {
    let urls = await getUrl();
    let postData = {
        "page": page,
        "rowsPerpage": rowsPerPage,
        "orderBy": orderBy,
        "order": order
    };
    return fetch.post(urls.machineSearchJobs, postData);
}

//get data process info
export async function machineGetDataProcessInfo(taskId) {
    let urls = await getUrl();
    return fetch.get(urls.machineGetDataProcessInfo + "/" + taskId);
}

//get model input output parameters
export async function machineGetModelParameters(modelId) {
    let urls = await getUrl();
    return fetch.get(urls.machineGetModelParameters + "/" + modelId);
}

//get table head
export async function machineGetTableHead(flag) {
    let urls = await getUrl();
    return fetch.get(urls.machineGetTableHead, flag);
}

//delete job schedule
export async function machineDelete(taskId) {
    let urls = await getUrl();
    let postData = {
        "ids": taskId
    };
    return fetch.post(urls.machineDelete, postData);
}

//update job status
export async function machineUpdateJobStatus(taskId) {
    let urls = await getUrl();
    return fetch.del(urls.machineUpdateJobStatus + "/" + taskId);
}







