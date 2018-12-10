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
 * Created by HuLin on 20/08/2018.
 */

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

//refresh model
export async function modelManagementSearch(page, rowsPerpage, orderBy, order) {
    let urls = await getUrl();
    let postData = {
        page: page,
        rowsPerpage: rowsPerpage,
        orderBy: orderBy,
        order: order
    };
    return fetch.post(urls.machineManagementModelSearch, postData);
}

//get device basic type
export async function deviceBasicType(sitename) {
    let urls = await getUrl();
    return fetch.get(`${urls.sysconfigs}?sitename=${sitename}&modulename=topology&submodulename=basic-types&pageno=1&limit=1000`);
}

//delete model
export async function machineManagementModelDelete(modelId) {
    let urls = await getUrl();
    let postData = {
        ids: modelId
    };
    return fetch.post(urls.machineManagementModelDelete, postData);
}

//get model info
export async function machineManagementModelInfo(modelId) {
    let urls = await getUrl();
    return fetch.get(urls.machineManagementModelInfo + "/" + modelId);
}

//create model
export async function machineManagementModelCreate(modelName, predictionDeviceTypeName, venderName, description, modelType, fileSwagger, outputParameters, predictionDeviceId, appid) {
    let urls = await getUrl();
    let version = JSON.parse(fileSwagger).info.version;
    let postData = {
        name: modelName,
        predictionDeviceTypeName: predictionDeviceTypeName,
        vendor: venderName,
        predictionDeviceId: predictionDeviceId,
        mlOutputStructure: outputParameters,
        predictionDseTemplate: {},
        type: modelType,
        description: description,
        applicationId: appid,
        acl: "string",
        version: version,
        swaggerJson: fileSwagger
    };
    return fetch.post(urls.machineManagementModelCreate, postData);
}

//update model
export async function machineManagementModelUpdate(modelId, modelName, description, modelType, fileSwagger) {
    let urls = await getUrl();
    let version = JSON.parse(fileSwagger).info.version;
    let postData = {
        "modelId:": modelId,
        modelTemplate: {
            name: modelName,
            type: modelType,
            description: description,
            applicationId: "string",
            acl: "string",
            version: version,
            swaggerJson: fileSwagger
        }
    };
    return fetch.post(urls.machineManagementModelUpdate, postData);
}

//add new Device Type
export async function addNewDeviceType(devicetypedisplayname, devicetypename) {
    let urls = await getUrl();
    let postData = {
        action: "create",
        "devicemodel.displayName": devicetypedisplayname,
        "devicemodel.name": devicetypename
    };
    return fetch.post(urls.topologyDeviceModelsIot, postData);
}
//add Sysconfig DeviceType
export async function addSysconfigDeviceType(
    devicetypeId,
    deviceTypeName,
    additionalProperty,
    basicTypeInstances,
    deviceProperty,
    siteName,
    userid
) {
    let urls = await getUrl();
    let configval = JSON.stringify({
        [deviceTypeName]: Object.assign(basicTypeInstances, additionalProperty, deviceProperty)
    });
    let postData = {
        configs: [
            {
                configvals: [
                    {
                        configvalname: deviceTypeName,
                        configvaldesc: deviceTypeName.split("-")[2],
                        configvalformat: "json",
                        configval: configval || {},
                        modifiedby: userid
                    }
                ],
                configname: devicetypeId,
                modifiedby: userid
            }
        ]
    };
    return fetch.post(
        `${urls.sysconfigs}?sitename=${siteName}&modulename=topology&submodulename=device-types`,
        postData
    );
}







