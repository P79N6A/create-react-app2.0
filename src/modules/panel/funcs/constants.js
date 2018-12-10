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
 * Created by Wangrui on 25/05/2018.
 * Modified by DengXiaoLong on 25/05/2018.
 */

export const REDUCER_NAME = "panels";
export const alarmExportConfig = [
    {
        jsonpath: "$.severity",
        fieldname: "severity",
        displayName: "severity"
    },
    {
        jsonpath: "$.owner",
        fieldname: "owner",
        displayName: "Owner"
    },
    {
        jsonpath: "$.sentdatetime",
        fieldname: "sentdatetime",
        displayName: "Sentdate Time",
        dateformat: "yyyy-MM-dd HH:mm:ss"
    },
    {
        jsonpath: "$.alarmtype",
        fieldname: "alarmtype",
        displayName: "Alarm Type"
    },
    {
        jsonpath: "$.source",
        fieldname: "source",
        displayName: "Source"
    },
    {
        jsonpath: "",
        fieldname: "parameters",
        displayName: "parameters"
    },
    {
        jsonpath: "$.note",
        fieldname: "note",
        displayName: "Note"
    }
];
export const eventExportConfig = [
    {
        jsonpath: "$.sentdatetime",
        fieldname: "sentdatetime", 
        displayName: "Sentdate Time",
        dateformat: "yyyy-MM-dd HH:mm:ss"
    },
    {
        jsonpath: "$.eventtype",
        fieldname: "eventtype",
        displayName: "Alarm Type"
    },
    {
        jsonpath: "$.source",
        fieldname: "source",
        displayName: "Source"
    },
    {
        jsonpath: "",
        fieldname: "parameters",
        displayName: "parameters"
    },
    {
        jsonpath: "$.note",
        fieldname: "note",
        displayName: "Note"
    }
];