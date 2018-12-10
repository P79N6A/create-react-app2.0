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
 * Created by xulu on 25/05/2018.
 */
import jp from "jsonpath";
import SchemaConfig from "../../schemaConfig";

const configValuePath = "$.configvals[*].configval";
// const basicTypesPath = "$.configs[*].configvals[*].configval";
const basicTypesPath = "$[*].configvals[*].configval";

function renderDeviceSchema(deviceSchema) {
    // let data = JSON.parse(deviceSchema);
    // console.log(deviceSchema);
    // let defaultDeviceSchema = jp.query(data, configValuePath);
    // console.log("defaultDeviceSchema", defaultDeviceSchema);
}

// function formatApplicationSchema(deviceTypeSchema) {
//     let schema = jp.query(deviceTypeSchema, configValuePath);
//     let resultSchema = JSON.parse(schema).devicetype.values;
//     let basictypeItems = [];
//     let defaultItems = [];
//     let keys = [];
//     for (let i = 0; i < resultSchema.length; i++) {
//         for (let key in resultSchema[i]) {
//             if (key === "basictype" || key === "basictypeinstance") {
//                 basictypeItems.push(resultSchema[i]);
//                 keys.push("basictypeObj");
//             } else {
//                 defaultItems.push(resultSchema[i]);
//                 keys.push(key);
//             }
//         }
//     }
//     return { defaultItems, basictypeItems, keys };
// }

function formatBasicTypes(basicTypes) {
    let allBasicTypes = jp.query(basicTypes, basicTypesPath);
    let resultBasicTypes = [];
    for (let i = 0; i < allBasicTypes.length; i++) {
        allBasicTypes[i] = JSON.parse(allBasicTypes[i]);
        for (let key in allBasicTypes[i]) {
            resultBasicTypes.push(allBasicTypes[i][key]);
        }
    }
    return resultBasicTypes;
}

function formatApplicationSchema(devicetypeSchema,configType) {
    let typeConfig = SchemaConfig[configType];
    if(!typeConfig){
        return;
    }
    let configval = jp.query(devicetypeSchema, configValuePath);
    let schema = JSON.parse(configval);
    let result = {};
    for (let i = 0; i < typeConfig.length; i++) {
        let config = typeConfig[i];
        let key = config.displayKey;
        let value = jp.query(schema, config.jsonpath)[0];
        result[key] = value;
    }
    return result;
}

function formatDevicetypeDetailSchema(devicetypeDetail) {
    let details = jp.query(devicetypeDetail, "$.configval");
    let result = JSON.parse(details);
    let devicetypeProperty = jp.query(result, "$..basicTypeInstances");
    let devicePropertySchema = jp.query(result, "$..deviceProperty");
    // let resultBasicTypes = [];
    // for (let i = 0; i < allBasicTypes.length; i++) {
    //     allBasicTypes[i] = JSON.parse(allBasicTypes[i]);
    //     for (let key in allBasicTypes[i]) {
    //         resultBasicTypes.push(allBasicTypes[i][key]);
    //     }
    // }
    return {devicetypeProperty, devicePropertySchema};
}

export {
    renderDeviceSchema,
    formatApplicationSchema,
    formatBasicTypes,
    // formatDevicetypeSchema,
    // formatBasictypeSchema,
    formatDevicetypeDetailSchema
};
