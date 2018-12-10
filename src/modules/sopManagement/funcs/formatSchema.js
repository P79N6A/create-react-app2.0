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
 * Created by ChenLing on 04/09/2018.
 */
import jp from "jsonpath";
import SchemaConfig from "../schemaConfig";

const configValuePath = "$.configvals[*].configval";
// const basicTypesPath = "$[*].configvals[*].configval";

function sopManagmentSchema(devicetypeSchema) {
    // console.log(devicetypeSchema);
    let typeConfig = SchemaConfig.sopManagementConfig;
    let configval = jp.query(devicetypeSchema, configValuePath);
    // console.log("configval", configval);
    let schema = JSON.parse(configval);
    // console.log("schema:", schema);
    let result = {};
    for (let i = 0; i < typeConfig.length; i++) {
        let config = typeConfig[i];
        let key = config.displayKey;
        let value = jp.query(schema, config.jsonpath)[0];
        result[key] = value;
    }
    // console.log("result:", result);
    return result;
}
export {
    sopManagmentSchema,
};