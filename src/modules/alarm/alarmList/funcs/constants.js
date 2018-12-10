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
 * Created by SongCheng on 20/05/2018.
 */
const REDUCER_NAME = "alarm";
const nameMapping = [
    {
        key: "severity",
        displayName: "Severity"
    },
    {
        key: "deviceId",
        displayName: "Device ID"
    },
    {
        key: "note",
        displayName: "Note"
    },
    {
        key: "alarmtype",
        displayName: "Alarm Type"
    },
    {
        key: "references",
        displayName: "References"
    },
    {
        key: "format",
        displayName: "Format"
    },
    {
        key: "source",
        displayName: "Source"
    },
    {
        key: "resourcepath",
        displayName: "Resource Path"
    },
    {
        key: "sendtime",
        displayName: "Send Time"
    },
    {
        key: "senderid",
        displayName: "Sender ID"
    },
    {
        key: "id",
        displayName: "ID"
    },
    {
        key: "Infos",
        displayName: "Infos"
    },
    {
        key: "sendername",
        displayName: "Sender Name"
    },
    {
        key: "sendtime",
        displayName: "send Time"
    },
    {
        key: "description",
        displayName: "Description"
    },
    {
        key: "informationurl",
        displayName: "Information URL"
    },
    {
        key: "eventcodes",
        displayName: "Event Codes"
    },
    {
        key: "effective",
        displayName: "Effective"
    },
    {
        key: "eventtype",
        displayName: "Event Type"
    },
    {
        key: "Parameters",
        displayName: "Parameters"
    },
    {
        key: "accountid",
        displayName: "Account ID"
    },
    {
        key: "reason",
        displayName: "Reason"
    },
    {
        key: "deviceName",
        displayName: "Device Name"
    },
    {
        key: "channelId",
        displayName: "Channel ID"
    },
    {
        key: "Resources",
        displayName: "Resources"
    },
    {
        key: "size",
        displayName: "Size"
    },
    {
        key: "mimetype",
        displayName: "Mime Type"
    },
    {
        key: "uri",
        displayName: "Uri"
    },
    {
        key: "sensorstatus",
        displayName: "Sensor Status"
    },
    {
        key: "improperity",
        displayName: "Improperity"
    },
    {
        key: "rulename",
        displayName: "Rule Name"
    }
];
const alarmExportConfig = [
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

export { REDUCER_NAME, alarmExportConfig, nameMapping };
