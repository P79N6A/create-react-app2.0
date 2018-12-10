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
import TopologyConfig from "../../topologyConfig";
import jp from "jsonpath";
import _ from "lodash";

function prepareDefaultColumns(defaultColumnsConfig, type) {
    let totalColumnsConfig = TopologyConfig[type] || [];
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

// function prepareRenderDatas(arrayData, defaultColumns) {
//     let opts = [];
//     for (let i = 0; i < arrayData.length; i++) {
//         let opt = {};
//         for (let j = 0; j < defaultColumns.length; j++) {
//             let column = defaultColumns[j];
//             opt = Object.assign({}, opt, {
//                 [column["label"]]: jp.query(arrayData[i], column.jsonpath)
//             });
//         }
//         opt = Object.assign({}, opt, {
//             key:
//                 arrayData[i]["address.iotTopologyId"] +
//                 "_" +
//                 arrayData[i]["address.nodeId"] +
//                 "_" +
//                 arrayData[i]["address.displayName"]
//         });
//         opts.push(opt);
//     }

//     return opts;
// }

function prepareRenderDatasForLayer(arrayData, defaultColumns) {
    let opts = [];
    for (let i = 0; i < arrayData.length; i++) {
        let opt = {};
        for (let j = 0; j < defaultColumns.length; j++) {
            let column = defaultColumns[j],
                data = jp.query(arrayData[i], column.jsonpath);
            data = _.isEmpty(data) && column.fillLabel ? column.fillLabel : data;
            opt = Object.assign({}, opt, { [column["label"]]: data });
        }
        const dataType = arrayData[i]["recordType"] ? arrayData[i]["recordType"] : "device";
        opt = Object.assign({}, opt, {
            key: arrayData[i]["iotTopologyId"] + "_" + dataType + "_" + arrayData[i]["displayName"]
        });
        opts.push(opt);
    }

    return opts;
}

export { prepareDefaultColumns, prepareRenderDatasForLayer };
