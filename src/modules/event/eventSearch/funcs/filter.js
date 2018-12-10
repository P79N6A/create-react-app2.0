import moment from "moment";

export const filtersData = [
    "Event Id",
    "Event Type",
    "Note",
    "Parameters",
    "Resource Path",
    "Sender Id",
    "Sent Datetime",
    "Severity",
    "Source"
];
export const filtersNoParameters = [
    "Fields Item",
    "Event Id",
    "Event Type",
    "Note",
    "Resource Path",
    "Sender Id",
    "Sent Datetime",
    "Severity",
    "Source"
];
const dataType = {
    typeOne: ["end with", "equals", "in", "like", "start with"],
    typeTwo: ["contains"],
    typeThree: ["like"],
    typeFour: ["equals"],
    typeFive: ["Critical", "Major", "Minor", "Info"],
    typeSix: ["unowned", "owned", "resolved", "closed", "cancelled"]
};
const valueType = {
    typeOne: ["end with", "equals", "in", "like", "start with"],
    typeTwo: ["equals", "greater than", "greater than or equal to", "in", "less than", "less than or equal to"],
    typeThree: ["equals", "in"]
};

function currentTime() {
    return moment()
        .toISOString()
        .replace("Z", "+0000");
}
function defaultTime() {
    return [
        {
            field: "capevent.sentdatetime",
            operator: "LT",
            value: currentTime()
        }
    ];
}

export const filterForValueType = type => {
    switch (type) {
        case "numeric":
            return valueType.typeTwo;
        case "boolean":
            return valueType.typeThree;
        case "string":
            return valueType.typeOne;
        default:
            break;
    }
};

export const filterForOperator = filter => {
    switch (filter) {
        case "Sent Datetime":
            return [];
        case "References":
            return dataType.typeTwo;
        case "Associations":
            return dataType.typeTwo;
        case "Parameters":
            return dataType.typeThree;
        case "Severity":
            return dataType.typeFour;
        case "State":
            return dataType.typeFour;
        default:
            return dataType.typeOne;
    }
};

export const severityAndState = filter => {
    switch (filter) {
        case "Severity":
            return dataType.typeFive;
        case "State":
            return dataType.typeSix;
        default:
            break;
    }
};

function handleFilter(filter) {
    switch (filter) {
        case "Event Id":
            return "capevent.id";
        case "Associations":
            return "capalarm.associations";
        case "Event Type":
            return "capevent.eventtype";
        case "Note":
            return "capevent.note";
        case "Parameters":
            return "capevent.capinfo.parameters";
        case "References":
            return "capevent.references";
        case "Resource Path":
            return "capevent.resourcepath";
        case "Sender Id":
            return "capevent.senderid";
        case "Sent Datetime":
            return "capevent.sentdatetime";
        case "Severity":
            return "capevent.severity";
        case "Source":
            return "capevent.source";
        default:
            break;
    }
}
function handleOperator(operator) {
    switch (operator) {
        case "end with":
            return "END_WITH";
        case "equals":
            return "EQ";
        case "in":
            return "IN";
        case "like":
            return "LIKE";
        case "start with":
            return "START_WITH";
        case "contains":
            return "CONTAINS";
        case "greater than":
            return "GT";
        case "greater than or equal to":
            return "GTE";
        case "less than":
            return "LT";
        case "less than or equal to":
            return "LTE";
        default:
            break;
    }
}
function handleSeverity(data) {
    let result = {};
    switch (data.severityAndState) {
        case "Critical":
            result = {
                ...data,
                name: "critical",
                key: "1"
            };
            break;
        case "Major":
            result = {
                ...data,
                name: "major",
                key: "2"
            };
            break;
        case "Minor":
            result = {
                ...data,
                name: "minor",
                key: "3"
            };
            break;
        case "Info":
            result = {
                ...data,
                name: "info",
                key: "4"
            };
            break;
        default:
            break;
    }
    return result;
}
function handleValue(operator, value) {
    let result;
    switch (operator) {
        case "IN":
            result = {
                values: value.split(",")
            };
            break;
        default:
            result = {
                value
            };
            break;
    }
    return result;
}
function handleFilterOne(mapItem) {
    let tempData = {};
    switch (mapItem.filter) {
        case "Parameters":
            tempData = Object.assign(
                {
                    field: `${handleFilter(mapItem.filter)}.${mapItem.parameterValue || " "}`,
                    operator: handleOperator(mapItem.operator),
                    valuetype: mapItem.valuetype
                },
                handleValue(handleOperator(mapItem.operator), mapItem.value)
            );
            break;
        case "Sent Datetime":
            tempData = {
                predicates: mapItem.dateTime.map((dateItem, index) => ({
                    field: handleFilter(mapItem.filter),
                    operator: index ? "LT" : "GT",
                    value: dateItem
                })),
                operator: "AND"
            };
            break;
        case "State":
            tempData = {
                field: handleFilter(mapItem.filter),
                operator: handleOperator(mapItem.operator),
                value: mapItem.severityAndState
            };
            break;
        case "Severity":
            tempData = {
                field: handleFilter(mapItem.filter),
                operator: handleOperator(mapItem.operator),
                value: handleSeverity(mapItem).key
            };
            break;
        default:
            tempData = Object.assign(
                {
                    field: handleFilter(mapItem.filter),
                    operator: handleOperator(mapItem.operator)
                },
                handleValue(handleOperator(mapItem.operator), mapItem.value)
            );
            break;
    }
    return tempData;
}
function handleSentDatetime(dateTimeArr, filterItem) {
    let result = dateTimeArr.map(dateItem => {
        return {
            predicates: [
                {
                    field: handleFilter(filterItem),
                    operator: "GT",
                    value:
                        dateItem.dateTime.length > 0
                            ? dateItem.dateTime[0]._d
                                ? dateItem.dateTime[0]._d.toISOString().replace("Z", "+0000")
                                : dateItem.dateTime[0].replace("Z", "+0000")
                            : currentTime()
                },
                {
                    field: handleFilter(filterItem),
                    operator: "LT",
                    value:
                        dateItem.dateTime.length > 0
                            ? dateItem.dateTime[1]._d
                                ? dateItem.dateTime[1]._d.toISOString().replace("Z", "+0000")
                                : dateItem.dateTime[1].replace("Z", "+0000")
                            : currentTime()
                }
            ],
            operator: "AND"
        };
    });
    return result;
}
export const handleDataForRequest = data => {
    let result = [];
    let handledData = {};
    const tempData = data.filter(filterItem => filterItem.filter !== "Fields Item");
    tempData.forEach(mapItem => {
        if (handledData[mapItem.filter]) {
            handledData[mapItem.filter].push(mapItem);
        } else {
            handledData[mapItem.filter] = [mapItem];
        }
    });
    const filterData = [...new Set(Object.keys(handledData))];
    filterData.forEach(filterItem => {
        const filterItemData = handledData[filterItem];
        const { length } = filterItemData;
        switch (filterItem) {
            case "Severity":
                if (1 === length) {
                    result.push(handleFilterOne(filterItemData[0]));
                } else {
                    result.push({
                        predicates: [
                            ...filterItemData.map(severityItem => ({
                                field: handleFilter(filterItem),
                                operator: handleOperator(severityItem.operator),
                                value: handleSeverity(severityItem).key
                            }))
                        ],
                        operator: "OR"
                    });
                }
                break;
            case "Sent Datetime":
                if (length > 1) {
                    result.push({
                        predicates: handleSentDatetime(filterItemData, filterItem),
                        operator: "OR"
                    });
                } else {
                    result.push({
                        predicates: [
                            ...filterItemData.map(dateItem => ({
                                field: handleFilter(filterItem),
                                operator: "GT",
                                value:
                                    dateItem.dateTime.length > 0
                                        ? dateItem.dateTime[0]._d
                                            ? dateItem.dateTime[0]._d.toISOString().replace("Z", "+0000")
                                            : dateItem.dateTime[0].replace("Z", "+0000")
                                        : currentTime()
                            })),
                            ...filterItemData.map(dateItem => ({
                                field: handleFilter(filterItem),
                                operator: "LT",
                                value:
                                    dateItem.dateTime.length > 0
                                        ? dateItem.dateTime[1]._d
                                            ? dateItem.dateTime[1]._d.toISOString().replace("Z", "+0000")
                                            : dateItem.dateTime[1].replace("Z", "+0000")
                                        : currentTime()
                            }))
                        ],
                        operator: "AND"
                    });
                }
                break;
            default:
                if (1 === length) {
                    result.push(handleFilterOne(filterItemData[0]));
                } else {
                    result.push({
                        predicates: filterItemData.map(filterItemDataItem => handleFilterOne(filterItemDataItem)),
                        operator: "OR"
                    });
                }
                break;
        }
    });
    let defaultDate = filterData.includes("Sent Datetime") ? [] : defaultTime();
    let last = [...result, ...defaultDate];
    last = last.length > 0 ? last : defaultTime();

    last.push({
        operator: "NOT",
        predicates: [
            {
                field: "capevent.eventtype",
                operator: "IN",
                values: ["create_device", "delete_device"]
            }
        ]
    });

    return last;
};
