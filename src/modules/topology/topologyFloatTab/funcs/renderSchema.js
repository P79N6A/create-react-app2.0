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
import _ from "lodash";

const configValuePath = "$.configvals[*].configval";
// const basicTypesPath = "$.configs[*].configvals[*].configval";
const basicTypesPath = "$[*].configvals[*].configval";

function renderDeviceSchema(deviceSchema) {
    // let data = JSON.parse(deviceSchema);
    // console.log(deviceSchema);
    // let defaultDeviceSchema = jp.query(data, configValuePath);
    // console.log("defaultDeviceSchema", defaultDeviceSchema);
}

function formatDeviceTypeSchema(deviceTypeSchema) {
    let schema = jp.query(deviceTypeSchema, configValuePath);
    let resultSchema = JSON.parse(schema).devicetype.values;
    let basictypeItems = [];
    let defaultItems = [];
    let keys = [];
    for (let i = 0; i < resultSchema.length; i++) {
        for (let key in resultSchema[i]) {
            if (key === "basictype" || key === "basictypeinstance") {
                basictypeItems.push(resultSchema[i]);
                keys.push("basictypeObj");
            } else {
                defaultItems.push(resultSchema[i]);
                keys.push(key);
            }
        }
    }
    return { defaultItems, basictypeItems, keys };
}

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

function formatDevicetypeSchema(devicetypeSchema) {
    let typeConfig = SchemaConfig.devicetypeConfig;
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

function formatBasictypeSchema(basicTypes) {
    let allBasicTypes = jp.query(basicTypes, basicTypesPath);
    let resultBasicTypes = [];
    for (let i = 0; i < allBasicTypes.length; i++) {
        allBasicTypes[i] = JSON.parse(allBasicTypes[i]);
        resultBasicTypes.push(allBasicTypes[i]);
        // for (let key in allBasicTypes[i]) {
        //     resultBasicTypes.push(allBasicTypes[i][key]);
        // }
    }
    return resultBasicTypes;
}

function formatDevicetypeDetailSchema(devicetypeDetail) {
    let details = devicetypeDetail instanceof Object ? jp.query(devicetypeDetail, "$.configval") : [];
    let result = JSON.parse(details);
    let devicetypeProperty = jp.query(result, "$..basicTypeInstances")[0] || [];
    let devicePropertySchema = jp.query(result, "$..deviceProperty")[0] || [];
    // let resultBasicTypes = [];
    // for (let i = 0; i < allBasicTypes.length; i++) {
    //     allBasicTypes[i] = JSON.parse(allBasicTypes[i]);
    //     for (let key in allBasicTypes[i]) {
    //         resultBasicTypes.push(allBasicTypes[i][key]);
    //     }
    // }
    return { devicetypeProperty, devicePropertySchema };
}

// format basic types
function formatBaiscTypes(baiscTypes) {
    let resultBasicTypes = [];
    _.forEach(baiscTypes, function(type) {
        for (let key in type) {
            resultBasicTypes.push({
                displayName: type[key].displayName,
                typeId: key
            });
        }
    });

    return resultBasicTypes;
}

// format device types schema for add device type
function formatDeviceTypesSchemaForAdd(schemas) {
    let result = [];
    _.forEach(schemas, function(schema) {
        for (let key in schema) {
            schema[key].currentKey = key;
            result.push(schema[key]);
        }
    });

    return result;
}

// format device types schema init value for add device type
function formatDeviceTypesSchemaInitValueForAdd(schemas) {
    let initValue = {};
    _.forEach(schemas, function(schema) {
        for (let key in schema) {
            schema[key].currentKey = key;
            if (key === "icon") {
                initValue[key] = schema[key].default;
            } else {
                initValue[key] = "";
            }
            initValue[`${key}tooltip`] = schema[key].default;
            initValue[`${key}validate`] = false;
        }
    });

    return initValue;
}

// format device types schema init value for add device type
function formatDeviceTypesSchemaValueForView(schemas, data) {
    let formatDefaultValues = [];
    let defaultInitValue = {};
    _.forEach(schemas, function(schema) {
        for (let key in schema) {
            let jsonpathValue = jp.query(data, schema[key]["jsonpath"]);
            schema[key].currentKey = key;
            schema[key].defaultValue = jsonpathValue && jsonpathValue[0];
            formatDefaultValues.push(schema[key]);
            defaultInitValue[key] = jsonpathValue && jsonpathValue[0];
            defaultInitValue[`${key}validate`] = false;
        }
    });

    return { formatDefaultValues, defaultInitValue };
}

function formatDeviceTypesAdditionSchemaValueForView(schemas, data) {
    let formatAdditionalproperty = [];
    let addtionInitValue = {};
    _.forEach(schemas, function(schema) {
        for (let key in schema) {
            let jsonpathValue = jp.query(data, schema[key]["jsonpath"]);
            schema[key].currentKey = key;
            schema[key].defaultValue = jsonpathValue && jsonpathValue[0];
            formatAdditionalproperty.push(schema[key]);
            addtionInitValue[key] = jsonpathValue && jsonpathValue[0];
            addtionInitValue[`${key}validate`] = false;
        }
    });

    return { formatAdditionalproperty, addtionInitValue };
}

// format device schema init value for view device
function formatDeviceSchemaValueForView(schemas, data, formattype) {
    let formatValues = [];
    let initValue = {};
    _.forEach(schemas, function(schema) {
        for (let key in schema) {
            let jsonpathValue = jp.query(data, schema[key]["jsonpath"]);
            schema[key].currentKey = key;
            if (key === "devicelocation" && !formattype) {
                schema[key].defaultValue = jp.query(data, "$..['location.iotTopologyId']")[0];
                initValue["devicelocationid"] = jp.query(data, "$..['location.iotTopologyId']")[0];
            } else if (key === "deviceapplication" && !formattype) {
                schema[key].defaultValue = jp.query(data, "$..['address.iotTopologyId']")[0];
                initValue["deviceapplicationid"] = jp.query(data, "$..['address.iotTopologyId']")[0];
            } else {
                schema[key].defaultValue = jsonpathValue && jsonpathValue[0];
                initValue[key] = jsonpathValue && jsonpathValue[0];
            }

            initValue[`${key}validate`] = false;
            formatValues.push(schema[key]);
        }
    });

    return { formatValues, initValue };
}

// format device property schema init value for view device
function formatDevicePropertySchemaValueForView(schemas, data, formattype) {
    let formatPropertyValues = [];
    let initPropertyValue = {};
    _.forEach(schemas, function(schema) {
        for (let key in schema) {
            let jsonpathValue = jp.query(data, schema[key]["jsonpath"]);
            schema[key].currentKey = key;
            if (key === "devicelocation" && !formattype) {
                schema[key].defaultValue = jp.query(data, "$..['location.iotTopologyId']")[0];
                initPropertyValue["devicelocationid"] = jp.query(data, "$..['location.iotTopologyId']")[0];
            } else if (key === "deviceapplication" && !formattype) {
                schema[key].defaultValue = jp.query(data, "$..['address.iotTopologyId']")[0];
                initPropertyValue["deviceapplicationid"] = jp.query(data, "$..['address.iotTopologyId']")[0];
            } else {
                schema[key].defaultValue = jsonpathValue && jsonpathValue[0];
                initPropertyValue[key] = jsonpathValue && jsonpathValue[0];
            }

            initPropertyValue[`${key}validate`] = false;
            formatPropertyValues.push(schema[key]);
        }
    });

    return { formatPropertyValues, initPropertyValue };
}

// format basic types from sysconfig devicetype
function formatDeviceTypesBasictypeForView(sysconfigDevicetype) {
    // let result = [];
    let path = "$..basicTypeInstances";
    let jsonpathValue = jp.query(sysconfigDevicetype, path)[0] || [];

    return jsonpathValue;
}

// format device types basic type data obj
function formatDeviceTypesBasictypeObjForView(currentBasictypes, formatBasicTypesList) {
    let result = [];
    _.forEach(currentBasictypes, function(basictype) {
        let obj = { basictypelist: [] };
        for (let key in basictype) {
            _.forEach(formatBasicTypesList, function(typeList) {
                for (let innerkey in typeList) {
                    if (basictype[key].type.toString() === innerkey.toString()) {
                        obj["basictype"] = typeList[innerkey]["displayName"];
                        obj["basictypeinstance"] = key;
                        obj["basictypelist"].push(typeList[innerkey]);
                        result.push(obj);
                    }
                }
            });
        }
    });

    return result;
}

// format device types schema init value for add device type
function renderMustAttrbutes(schemas) {
    let allJSONPath = [
        { key: "defaultValues", jsonpath: "$..['defaultvalues']" },
        { key: "additionalProperty", jsonpath: "$..['additionalproperty']" },
        { key: "basicTypeInstances", jsonpath: "$..['basictypes']" }
    ];
    let mustObj = {};
    let validateObj = {};
    _.forEach(allJSONPath, path => {
        let schemaArr = jp.query(schemas, path.jsonpath)[0];
        mustObj[path.key] = [];
        validateObj[path.key] = [];
        _.forEach(schemaArr, schema => {
            for (let key in schema) {
                if (schema[key].mandatory) {
                    mustObj[path.key].push(key);
                }
                validateObj[path.key].push(key);
            }
        });
    });

    return { mustObj, validateObj };
}

export {
    renderDeviceSchema,
    formatDeviceTypeSchema,
    formatBasicTypes,
    formatDevicetypeSchema,
    formatBasictypeSchema,
    formatDevicetypeDetailSchema,
    formatBaiscTypes,
    formatDeviceTypesSchemaForAdd,
    formatDeviceTypesSchemaInitValueForAdd,
    formatDeviceTypesSchemaValueForView,
    formatDeviceTypesAdditionSchemaValueForView,
    formatDeviceTypesBasictypeForView,
    formatDeviceTypesBasictypeObjForView,
    formatDeviceSchemaValueForView,
    formatDevicePropertySchemaValueForView,
    renderMustAttrbutes
};
