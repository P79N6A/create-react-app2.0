// import getTimeString from "commons/utils/isc8601Generator";

export const filtersData = [
    "Fields Item",
    "Alarm Id",
    "Alarm Type",
    "Associations",
    "Event Type",
    "Force Closed By",
    "Note",
    "Owner",
    "Parameters",
    "References",
    "Resource Path",
    "Sender Id",
    "Sent Datetime",
    "Severity",
    "Source",
    "State"
];
export const filtersNoParameters = [
    "Fields Item",
    "Alarm Id",
    "Alarm Type",
    "Associations",
    "Event Type",
    "Force Closed By",
    "Note",
    "Owner",
    "References",
    "Resource Path",
    "Sender Id",
    "Sent Datetime",
    "Severity",
    "Source",
    "State"
];
const dataType = {
    typeOne: ["end with", "equals", "in", "like", "start with"],
    typeTwo: ["contains"],
    typeThree: ["like"],
    typeFour: ["equals"],
    typeFive: ["Critical", "Major", "Minor", "Info"],
    typeSix: ["unowned", "owned", "resolved", "closed", "cancelled"]
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
        case "Alarm Id":
            return "capevent.id";
        case "Alarm Type":
            return "capalarm.alarmtype";
        case "Associations":
            return "capalarm.associations";
        case "Event Type":
            return "capevent.capinfo.eventtype";
        case "Force Closed By":
            return "capalarm.forcedby";
        case "Note":
            return "capevent.note";
        case "Owner":
            return "capalarm.owner";
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
        case "State":
            return "capalarm.state";
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
            tempData = {
                field: `${handleFilter(mapItem.filter)}.${mapItem.parameterValue || " "}`,
                operator: handleOperator(mapItem.operator),
                valuetype: "string",
                value: mapItem.value
            };
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
                result.push({
                    predicates: [
                        ...filterItemData.map(dateItem => ({
                            field: handleFilter(filterItem),
                            operator: "GT",
                            value: dateItem.dateTime[0]
                        })),
                        ...filterItemData.map(dateItem => ({
                            field: handleFilter(filterItem),
                            operator: "LT",
                            value: dateItem.dateTime[1]
                        }))
                    ],
                    operator: "AND"
                });
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
    result = result.length > 0 ? result : null;
    return result;
};
