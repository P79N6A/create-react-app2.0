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
 * Created by Kai Di on 25/05/2018.
 */
import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

// export async function saveKpi(dbName, dbType, dbUrl, dbPort, queryScript) {
//     let urls = await getUrl();
//     let postdata = {
//         Sysconfigname: "getFilteredAlarms",
//         Sysconfigdescription: "",
//         Configtype: "json",
//         Configvalue: {
//             Type: "Alarm",
//             format: "KpiQuery",
//             kpiQuery: {
//                 queryScript:
//                     "select top 500 parameter_name,numeric_value, sent_datetime, sender_id, alarm_type  from (dbo.alm_capinfo_parameters  inner join dbo.alm_capinfo on dbo.alm_capinfo.capinfo_id=dbo.alm_capinfo_parameters.capinfo_id) inner join dbo.alm_alarm on dbo.alm_alarm.alarm_id=dbo.alm_capinfo.alarm_id where (parameter_name like 'AC_Voltage%'  and numeric_value>239) or (parameter_name like 'MeterConsumption%'  and numeric_value>5000) and sent_datetime>'2017-06-12' order by sent_datetime"
//             }
//         }
//         // "type": "script",
//         // "queryScript": queryScript,
//         // "dbName": dbName,
//         // "dbType": dbType,
//         // "dbURL": dbUrl,
//         // "dbPort": dbPort
//     };
//     return fetch.post(urls.saveKpi, postdata);
// }
export async function getServiceList() {
    let urls = await getUrl();
    // let postdata={};
    return fetch.get(urls.kpiService + "ncs");
}

export async function saveService(name,type, format, queryScript) {
    let urls = await getUrl();
    let postdata = {
        Type: type,
        format: format,
        serviceId: name,
        modifiedby: "admin",
        kpiQuery: {
            queryScript:queryScript
        }
    };
    return fetch.post(urls.service + "ncs", postdata);
}

export async function getPreview(type, format, queryScript) {
    let urls = await getUrl();
    let postdata = {
        Type: type,
        format: format,
        kpiQuery: {
            queryScript: queryScript
        }
    };
    return fetch.post(urls.kpiPreview + "ncs", postdata);
}
export async function getDbList() {
    let urls = await getUrl();
    return fetch.get(urls.getDbConfigList + "ncs");
}
