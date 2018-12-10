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
 * Created by wangrui on 22/06/2018.
 */
import RuleConfig from "../../ruleConfig";

function prepareDefaultColumns(defaultColumnsConfig) {
    let totalColumnsConfig = RuleConfig.tableColumnsConfig;
    let defaultColumns = [];

    for (let i = 0; i < defaultColumnsConfig.length; i++) {
        for (let j = 0; j < totalColumnsConfig.length; j++) {
            if (
                defaultColumnsConfig[i].columnName === totalColumnsConfig[j].columnName &&
                defaultColumnsConfig[i].defaultSelect
            ) {
                defaultColumns.push(totalColumnsConfig[j].columnConfig);
            }
        }
    }

    return defaultColumns;
}

function prepareRenderDatas(arrayData, defaultColumns) {
    let opts = [];
    for (let i = 0; i < arrayData.length; i++) {
        let opt = {};
        for (let j = 0; j < defaultColumns.length; j++) {
            let column = defaultColumns[j];
            let value = column["label"]!=="Description" ?  arrayData[i][column["id"]] : arrayData[i].configvals[0].configvaldesc; 
            opt =  Object.assign({}, opt, {
                [column["label"]]: value
            });
        }
        opt = Object.assign({}, opt, {
            key:
                arrayData[i]["configname"] 
        });
        opts.push(opt);
    }

    return opts;
}

export { prepareDefaultColumns, prepareRenderDatas };
