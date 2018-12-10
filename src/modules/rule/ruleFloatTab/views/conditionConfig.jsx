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
 * Created by Wangrui on 08/06/2018.
 */
import React from "react";
import { Widgets } from "react-awesome-query-builder";
import moment from "moment";
import en_US from "antd/lib/locale-provider/en_US";
const {
    TextWidget,
    NumberWidget,
    SelectWidget,
    MultiSelectWidget,
    BooleanWidget,
    DateTimeWidget,
    TimeWidget,
    ValueFieldWidget
} = Widgets;

export default {
    conjunctions: {
        AND: {
            label: "And",
            formatConj: (children, conj, not, isForDisplay) => {
                return children.size > 1
                    ? (not ? "NOT " : "") + "(" + children.join(" " + (isForDisplay ? "AND" : "&&") + " ") + ")"
                    : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            }
        },
        OR: {
            label: "Or",
            formatConj: (children, conj, not, isForDisplay) => {
                return children.size > 1
                    ? (not ? "NOT " : "") + "(" + children.join(" " + (isForDisplay ? "OR" : "||") + " ") + ")"
                    : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            }
        }
    },
    fields: {},
    types: {
        text: {
            valueSources: ["value"],
            widgets: {
                text: {
                    defaultOperator: "equal",
                    operators: ["equal", "not_equal", "contains", "substring", "start_with", "end_with"],
                    widgetProps: {
                        formatValue: (val, fieldDef, wgtDef, isForDisplay) => "_" + JSON.stringify(val),
                        valueLabel: "Text",
                        valuePlaceholder: "Enter text"
                    }
                },
                field: {
                    operators: ["equal", "not_equal", "contains", "substring", "start_with", "end_with"]
                }
            }
        },
        number: {
            valueSources: ["value"],
            widgets: {
                number: {
                    operators: ["equal", "not_equal", "greater", "greater_or_equal", "less", "less_or_equal"],
                    defaultOperator: "equal",
                    widgetProps: {
                        valueLabel: "Number",
                        valuePlaceholder: "Enter number"
                    }
                }
            }
        },
        datetime: {
            valueSources: ["value"],
            widgets: {
                datetime: {
                    operators: ["between"],
                    defaultOperator: "between",
                    opProps: {
                        between: {
                            valueLabels: [
                                { label: "Date from", placeholder: "Enrer datetime from" },
                                { label: "Date to", placeholder: "Enter datetime to" }
                            ]
                        }
                    },
                    widgetProps: {
                        timeFormat: "HH:mm",
                        dateFormat: "YYYY-MM-DD",
                        valueFormat: "YYYY-MM-DD HH:mm"
                    }
                }
            }
        },
        time: {
            widgets: {
                time: {
                    operators: [
                        "between"
                    ]
                }
            }
        },
        select: {
            valueSources: ["value"],
            mainWidget: "select",
            widgets: {
                select: {
                    operators: ["select_equals", "select_not_equals"],
                    widgetProps: {
                        customProps: {
                            showSearch: true
                        }
                    }
                },
                multiselect: {
                    operators: ["select_any_in", "select_not_any_in"],
                    widgetProps: {}
                }
            }
        },
        multiselect: {
            valueSources: ["value"],
            widgets: {
                multiselect: {
                    operators: ["multiselect_equals", "multiselect_not_equals"]
                }
            }
        },
        boolean: {
            valueSources: ["value"],
            widgets: {
                boolean: {
                    operators: ["equal"],
                    widgetProps: {}
                },
                field: {
                    operators: ["equal", "not_equal"]
                }
            }
        }
    },
    operators: {
        equal: {
            label: "==",
            labelForFormat: "==",
            reversedOp: "not_equal"
        },
        not_equal: {
            label: "!=",
            labelForFormat: "!=",
            reversedOp: "equal"
        },
        less: {
            label: "<",
            labelForFormat: "<",
            reversedOp: "greater_or_equal"
        },
        less_or_equal: {
            label: "<=",
            labelForFormat: "<=",
            reversedOp: "greater"
        },
        contains: {
            label: "contains",
            labelForFormat: "contains"
        },
        substring: {
            label: "substring",
            labelForFormat: "substring"
        },
        start_with: {
            label: "start with",
            labelForFormat: "start with",
            reversedOp: "end_with"
        },
        end_with: {
            label: "end with",
            labelForFormat: "end with",
            reversedOp: "start_with"
        },
        greater: {
            label: ">",
            labelForFormat: ">",
            reversedOp: "less_or_equal"
        },
        greater_or_equal: {
            label: ">=",
            labelForFormat: ">=",
            reversedOp: "less"
        },
        between: {
            label: "Between",
            labelForFormat: "BETWEEN",
            cardinality: 2,
            formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
                let valFrom = values.first();
                let valTo = values.get(1);
                if (isForDisplay) return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
                else return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
            },
            valueLabels: ["Value from", "Value to"],
            textSeparators: [null, "and"]
        },
        select_equals: {
            label: "==",
            labelForFormat: "==",
            formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                return `${field} == ${value}`;
            },
            reversedOp: "select_not_equals"
        },
        select_not_equals: {
            label: "!=",
            labelForFormat: "!=",
            formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                return `${field} != ${value}`;
            },
            reversedOp: "select_equals"
        },
        select_any_in: {
            label: "Any in",
            labelForFormat: "IN",
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === "value") return `${field} IN (${values.join(", ")})`;
                else return `${field} IN (${values})`;
            },
            reversedOp: "select_not_any_in"
        },
        select_not_any_in: {
            label: "Not in",
            labelForFormat: "NOT IN",
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === "value") return `${field} NOT IN (${values.join(", ")})`;
                else return `${field} NOT IN (${values})`;
            },
            reversedOp: "select_any_in"
        },
        multiselect_equals: {
            label: "Equals",
            labelForFormat: "==",
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === "value") return `${field} == [${values.join(", ")}]`;
                else return `${field} == ${values}`;
            },
            reversedOp: "multiselect_not_equals"
        },
        multiselect_not_equals: {
            label: "Not equals",
            labelForFormat: "!=",
            formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
                if (valueSrc === "value") return `${field} != [${values.join(", ")}]`;
                else return `${field} != ${values}`;
            },
            reversedOp: "multiselect_equals"
        }
    },
    widgets: {
        text: {
            type: "text",
            valueSrc: "value",
            factory: props => <TextWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? "\"" + val + "\"" : JSON.stringify(val);
            },
            validateValue: (val, fieldDef) => {
                return val !== "test";
            }
        },
        number: {
            type: "number",
            valueSrc: "value",
            factory: props => <NumberWidget {...props} />,
            valueLabel: "Number",
            valuePlaceholder: "Enter number",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? val : JSON.stringify(val);
            }
        },
        select: {
            type: "select",
            valueSrc: "value",
            factory: props => <SelectWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let valLabel = fieldDef.listValues[val];
                return isForDisplay ? "\"" + valLabel + "\"" : JSON.stringify(val);
            }
        },
        multiselect: {
            type: "multiselect",
            valueSrc: "value",
            factory: props => <MultiSelectWidget {...props} />,
            formatValue: (vals, fieldDef, wgtDef, isForDisplay) => {
                let valsLabels = vals.map(v => fieldDef.listValues[v]);
                return isForDisplay ? valsLabels.map(v => "\"" + v + "\"") : vals.map(v => JSON.stringify(v));
            }
        },
        datetime: {
            type: "datetime",
            valueSrc: "value",
            factory: props => <DateTimeWidget {...props} />,
            timeFormat: "HH:mm",
            dateFormat: "DD.MM.YYYY",
            valueFormat: "YYYY-MM-DD HH:mm:ss",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let dateVal = moment(val, wgtDef.valueFormat);
                return isForDisplay
                    ? "\"" + dateVal.format(wgtDef.dateFormat + " " + wgtDef.timeFormat) + "\""
                    : JSON.stringify(val);
            }
        },
        time: {
            type: "time",
            valueSrc: "value",
            factory: props => <TimeWidget {...props} />,
            timeFormat: "HH:mm",
            valueFormat: "HH:mm",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                let dateVal = moment(val, wgtDef.valueFormat);
                return isForDisplay ? "\"" + dateVal.format(wgtDef.timeFormat) + "\"" : JSON.stringify(val);
            }
        },
        boolean: {
            type: "boolean",
            valueSrc: "value",
            factory: props => <BooleanWidget {...props} />,
            labelYes: "Yes",
            labelNo: "No ",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? (val ? "Yes" : "No") : JSON.stringify(!!val);
            },
            defaultValue: false
        },
        field: {
            valueSrc: "field",
            factory: props => <ValueFieldWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay, valFieldDef) => {
                return isForDisplay ? valFieldDef.label || val : val;
            },
            valueLabel: "Field to compare",
            valuePlaceholder: "Select field to compare",
            customProps: {
                showSearch: true
            }
        }
    },
    settings: {
        locale: {
            short: "en",
            full: "en-US",
            antd: en_US
        },
        maxLabelsLength: 50,
        hideConjForOne: true,
        renderSize: "small",
        renderConjsAsRadios: false,
        renderFieldAndOpAsDropdown: false,
        customFieldSelectProps: {
            showSearch: true
        },
        groupActionsPosition: "topRight", // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
        setOpOnChangeField: ["keep", "default"], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
        clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
        clearValueOnChangeOp: false,
        setDefaultFieldAndOp: false,
        maxNesting: 10,
        fieldSeparator: ".",
        fieldSeparatorDisplay: "->",
        showLabels: false,
        valueLabel: "Value",
        valuePlaceholder: "Value",
        fieldLabel: "Field",
        operatorLabel: "Operator",
        fieldPlaceholder: "Select field",
        operatorPlaceholder: "Select operator",
        deleteLabel: null,
        addGroupLabel: "Add group",
        addRuleLabel: "Add Condition",
        readonlyMode: false,
        notLabel: "Not",
        showNot: false,
        delGroupLabel: null,
        canLeaveEmptyGroup: true, //after deletion
        formatReverse: (q, operator, reversedOp, operatorDefinition, revOperatorDefinition, isForDisplay) => {
            if (isForDisplay) return "NOT(" + q + ")";
            else return "!(" + q + ")";
        },
        formatField: (field, parts, label2, fieldDefinition, config, isForDisplay) => {
            if (isForDisplay) return label2;
            else return field;
        },
        valueSourcesInfo: {
            value: {
                label: "Value"
            },
            field: {
                label: "Field",
                widget: "field"
            }
        },
        valueSourcesPopupTitle: "Select value source",
        canReorder: true,
        canCompareFieldWithField: (leftField, leftFieldConfig, rightField, rightFieldConfig) => {
            return true;
        }
    }
};
