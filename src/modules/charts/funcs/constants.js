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
 * Created by KaiDi on 25/05/2018.
 */
const REDUCER_NAME = "chart";

const countName = {
    alarm: { label: "No. of Alarms", value: "{count}" },
    event: { label: "No. of Events", value: "{count}" },
    topology: { label: "", value: "{count}" },
    default: { label: "", value: "{count}" }
};

const defaultProps = {
    source: "topology",
    predicates: {
        interval: "",
        aggregation: "",
        dateRange: [],
        keyList: [],
        grouping: "",
        iotIds: []
    },
    // kpiObjectId: "",
    kpiPredicate: {},
    timeMode: "realTime",
    title: "chart",
    type: "line",
    timeFormat: [],
    propertyList: {}
};

const queryBuilderOpt = {
    sourceList: ["topology", "topologyStatic", "event", "alarm"],
    resourceList: [
        { value: "Device", label: "deviceStatusOpt" },
        { value: "Model", label: "deviceTypeOpt" },
        { value: "Address", label: "addressOpt" }
    ],
    intervalList: [
        // { value: "", label: "None" },
        { value: "1min", name: "minutes", label: "minsOpt" },
        { value: "1hour", name: "hours", label: "hoursOpt" },
        { value: "1day", name: "days", label: "daysOpt" },
        { value: "1week", name: "weeks", label: "weeksOpt" },
        { value: "1month", name: "months", label: "monthsOpt" }
    ],
    aggregationList: {
        event: [
            { value: "None", label: "noneOpt" },
            { value: "COUNT", label: "countOpt" },
            { value: "AVG", label: "avgOpt" },
            { value: "SUM", label: "sumOpt" },
            { value: "MAX", label: "Max" },
            { value: "MIN", label: "Min" }
        ],
        alarm: [
            { value: "None", label: "noneOpt" },
            { value: "COUNT", label: "countOpt" }
        ],
        gauge: [
            { value: "COUNT", label: "countOpt" },
            { value: "AVG", label: "avgOpt" },
            { value: "SUM", label: "sumOpt" },
            { value: "MAX", label: "Max" },
            { value: "MIN", label: "Min" }
        ]
    },
    timeModeList: [
        { value: "dateTime", label: "dateTimeOpt" },
        { value: "realTime", label: "realTimeOpt" }
    ],
    groupList: {
        default: [
            { value: "None", label: "noneOpt" },
            { value: "capevent.eventtype", label: "eventTypeOpt" },
            { value: "capevent.severity", label: "severityOpt" },
            { value: "capevent.parameters.deviceid", label: "topologyIdOpt" }
        ],
        Average: [
            { value: "None", label: "noneOpt" },
            { value: "capevent.parameters.deviceid", label: "topologyIdOpt" }
        ],
        alarm: [
            { value: "None", label: "noneOpt" },
            { value: "capevent.severity", label: "severityOpt" },
            { value: "capalarm.alarmtype", label: "alarmTypeOpt" },
            { value: "capalarm.state", label: "alarmStateOpt" },
            { value: "capalarm.owner", label: "ownerOpt" }
        ]
    }
};

const basicOpt = {
    typeList: {
        default: [
            { value: "line", label: "lineOpt" },
            { value: "area", label: "areaOpt" },
            { value: "bar", label: "barOpt" },
            { value: "pie", label: "pieOpt" },
            { value: "donut", label: "donutOpt" }
        ],
        circle: [
            { value: "pie", label: "pieOpt" },
            { value: "donut", label: "donutOpt" }
        ],
        timeline: [
            { value: "line", label: "lineOpt" },
            { value: "area", label: "areaOpt" },
            { value: "bar", label: "barOpt" }
        ],
        individual: [
            { value: "line", label: "lineOpt" },
            { value: "bar", label: "barOpt" }
        ]
    },
    legendList: [
        { value: "Top", label: "topOpt" },
        { value: "Bottom", label: "bottomOpt" },
        { value: "Left", label: "leftOpt" },
        { value: "Right", label: "rightoPT" }
    ],
    themeList: ["default", "skittles", "shine"],
    aggregationList: [
        { value: "Max", label: "maxOpt" },
        { value: "Min", label: "minOpt" },
        { value: "Average", label: "avgOpt" }
    ]
};

const datesFormat = [
    "M/D/YYYY",
    "M/D/YY",
    "MM/DD/YY",
    "MM/DD/YYYY",
    "DD/MM/YY",
    "DD/MM/YYYY",
    "YY/MM/DD",
    "YYYY-MM-DD",
    "DD-MMM-YY"
];

const dateFormats = {
    defaultList: {
        dateFormat: [
            "None",
            ...datesFormat,
            "dddd,MMMM DD, YYYY",
            "MMMM DD, YYYY",
            "ddd, DD MMMM, YYYY",
            "Do MMMM, YYYY"
        ],
        timeFormat: ["None", "h:mm A", "hh:mm A", "H:mm", "HH:mm", "h:mm:ss A", "hh:mm:ss A", "H:mm:ss", "HH:mm:ss"]
    },
    "1min": {
        dateFormat: ["None", ...datesFormat],
        timeFormat: ["None", "h:mm A", "hh:mm A", "H:mm", "HH:mm", "M/D/YYYY h:mm A"]
    },
    "1hour": {
        dateFormat: ["None", ...datesFormat],
        timeFormat: ["None", "h:mm A", "hh:mm A", "H:mm", "HH:mm", "M/D/YYYY h:mm A"]
    },
    "1day": {
        dateFormat: ["None", ...datesFormat]
    },
    "1week": {
        dateFormat: ["[Week] w", "[Week] ww", "wo [Week]"],
        timeFormat: ["None", ", YYYY", ", YY"]
    },
    "1month": {
        dateFormat: ["None", "M/YY", "YY/M", "MM/YYYY", "YYYY/MM", "MMMM,YYYY", "MMM,YYYY"]
    }
};

const eventExportConfig = [
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

const wsMap = {
    alarm: "Alarms",
    event: "Events",
    topology: "Events",
    topologyStatic: "Events"
};

const severityMapping = {
    "1": "critical",
    "2": "major",
    "3": "minor",
    "4": "info",
    "5": "clear",
    "6": "reading",
    "7": "unknown"
};

export {
    REDUCER_NAME,
    countName,
    wsMap,
    queryBuilderOpt,
    basicOpt,
    dateFormats,
    defaultProps,
    eventExportConfig,
    alarmExportConfig,
    severityMapping
};
