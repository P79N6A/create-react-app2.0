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
import _ from "lodash";
import SchemaConfig from "../../schemaConfig";

const configValuePath = "$..configvals[*].configval";
const integrationSystemsPath = "$..configvals[*]";
const deviceSchemaPath = "$.deviceSchema.values[*]";
const devicePropertySchemaPath = "$.devicePropertySchema.values[*]";
const deviceTypesPath = "$..configvals[*].configval";
// const basicTypesPath = "$[*].configvals[*].configval";

function formatDeviceSchema(schema) {
    if (!schema.length) {
        return [];
    }
    let configval = jp.query(schema, configValuePath);
    let deviceSchemaObj = JSON.parse(configval[0]);
    let deviceSchema = jp.query(deviceSchemaObj, deviceSchemaPath);
    let devicePropertySchema = jp.query(deviceSchemaObj, devicePropertySchemaPath);

    return { deviceSchema, devicePropertySchema };
}

function formatDeviceTypesData(deviceTypesData) {
    if (!deviceTypesData) {
        return [];
    }
    let configval = jp.query(deviceTypesData, deviceTypesPath);
    let formatResult = [];
    _.forEach(configval, function(value) {
        formatResult.push(JSON.parse(value));
    });
    return formatResult;
}

function formatDeviceTypeSchema(devicetypeSchema) {
    let typeConfig = SchemaConfig.devicetypeConfig;
    let configval = jp.query(devicetypeSchema, configValuePath);
    if (!configval.length) {
        return {};
    }
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

function formatIntegrationSystemsSchema(integrationSystemsSchema) {
    let configval = jp.query(integrationSystemsSchema, integrationSystemsPath);
    if (!configval.length) {
        return {};
    }

    return configval;
}

export { formatDeviceSchema, formatDeviceTypesData, formatDeviceTypeSchema, formatIntegrationSystemsSchema };
