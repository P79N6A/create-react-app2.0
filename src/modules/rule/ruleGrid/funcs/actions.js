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
import {
    RULE_INIT_PROPS,
    RULE_REQUEST,
    RULE_REQUEST_SUCCESS,
    RULE_FLOATTAB_OPEN,
    RULE_FLOATTAB_CLOSE,
    RULE_COLUMN_FILTER_CHANGE,
    RULE_CCMS_CONTROL,
    RULE_EDITOR_CONTROL_PROPS,
    RULE_STORE_COLUMN_FILTER,
    RULE_MULTIPLE_SELECT,
    RULE_SORT_CHANGED,
    RULE_DELETERULE,
    RULE_DELETERULE_SUCCESS,
    RULE_DELETERULE_FAILURE,
    RULE_CHANGE_ADDMODE,
    RULE_RULE_SCHEMA,
    RULE_RULE_SCHEMA_SUCCESS,
    RULE_ACTION_SCHEMA,
    RULE_ACTION_SCHEMA_SUCCESS,
    RULE_INIT_ALL_REDUX,
    RULE_GET_ACTION_CONTENT,
    RULE_GET_ACTION_CONTENT_SUCCESS,
    RULE_CHANGETAB
} from "./actionTypes";

export const initRuleProps = (
    identify,
    title,
    subTitle,
    columnConfig,
    multipleSelect,
    orderBy,
    orderDirection
) => ({
    type: RULE_INIT_PROPS,
    identify,
    title,
    subTitle,
    columnConfig,
    multipleSelect,
    orderBy,
    orderDirection
});

export const ruleRequest = (pageNo, pageLimit, sitename, modulename, submodulename, identify, predicate, sortConfig, orderDisplayName, orderDirection) => ({
    type: RULE_REQUEST,
    pageNo,
    pageLimit,
    sitename,
    modulename,
    submodulename,
    identify,
    predicate,
    sortConfig,
    orderDisplayName, 
    orderDirection,
    isPending: true,
    refreshRuleSuccess: false
});

export const getRuleDataSuccess = (pagination, arrayData, identify, modulename, predicate, sortConfig, orderDisplayName, orderDirection) => ({
    type: RULE_REQUEST_SUCCESS,
    pagination: pagination,
    arrayData: arrayData,
    identify,
    modulename,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    isPending: false,
    refreshRuleSuccess: true,
    multipleSelected:[]
});

export const openFloatTab = (configname, floatTabType, identify) => ({
    type: RULE_FLOATTAB_OPEN,
    showFloatTab: true,
    configname,
    floatTabType,
    identify
});

export const openAddFloatTab = (identify) => ({
    type: RULE_FLOATTAB_OPEN,
    showFloatTab: true,
    identify
});

export const closeFloatTab = identify => ({
    type: RULE_FLOATTAB_CLOSE,
    showFloatTab: false,
    identify
});

export const columnFilterChange = (identify, currentColumns) => ({
    type: RULE_COLUMN_FILTER_CHANGE,
    showFloatTab: false,
    identify,
    currentColumns
});

export const ccmsControl = identify => ({
    type: RULE_CCMS_CONTROL,
    identify
});

export const editorControlProps = (identify, editorState) => ({
    type: RULE_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});
// export const editorControlProps = (
//     identify,
//     title,
//     subTitle,
//     pageLimit,
//     availableColumns,
//     columnConfig,
//     multipleSelect,
//     orderBy,
//     orderDirection
// ) => ({
//     type: TOPOLOGY_EDITOR_CONTROL_PROPS,
//     identify,
//     title,
//     subTitle,
//     pageLimit,
//     availableColumns,
//     columnConfig,
//     multipleSelect,
//     orderBy,
//     orderDirection
// });
export const storeColumnsAndFilters = (identify, columnConfig, filterConfig) => ({
    type: RULE_STORE_COLUMN_FILTER,
    identify,
    columnConfig,
    filterConfig
});

export const multipleChecked = (identify, multipleSelected) => ({
    type: RULE_MULTIPLE_SELECT,
    identify,
    multipleSelected
});

export const columnSortChanged = (identify, orderBy, orderDirection, orderDisplayName) => ({
    type: RULE_SORT_CHANGED,
    identify,
    orderBy,
    orderDirection,
    orderDisplayName
});
// export const deleteRule = (sitename, configname, pageLimit, orderDirection, orderDisplayName, identify) => ({
//     type: RULE_DELETERULE,
//     sitename,
//     configname,
//     pageLimit,
//     orderDirection, 
//     orderDisplayName,
//     identify,
//     refreshRuleSuccess: false
// });
// export const deleteRuleDataSuccess = (identify) => ({
//     type: RULE_DELETERULE_SUCCESS,
//     multipleSelected: [],
//     identify,
//     refreshRuleSuccess: true
// });
export const deleteRule = (sitename, modulename, submodulename, config, pageLimit, orderDirection, orderDisplayName, identify) => ({
    type: RULE_DELETERULE,
    sitename,
    modulename,
    submodulename,
    config,
    pageLimit,
    orderDirection, 
    orderDisplayName,
    identify,
    refreshRuleSuccess: false
});
export const deleteRuleDataSuccess = (identify) => ({
    type: RULE_DELETERULE_SUCCESS,
    multipleSelected: [],
    identify,
    refreshRuleSuccess: true
});
export const deleteRuleDataFailure = (identify) => ({
    type: RULE_DELETERULE_FAILURE,
    multipleSelected: [],
    identify,
    refreshRuleSuccess: true
});
export const changeAddMode = (addMode, identify) =>({
    type: RULE_CHANGE_ADDMODE,
    addMode,
    identify
});

export const getRuleSchema = (sitename, identify) =>({
    type: RULE_RULE_SCHEMA,
    sitename, identify
});

export const getRuleSchemaSuccess = (ruleSchema, identify) =>({
    type: RULE_RULE_SCHEMA_SUCCESS,
    ruleSchema, identify
});
export const getActionSchema = (sitename, identify) =>({
    type: RULE_ACTION_SCHEMA,
    sitename, identify
});

export const getActionSchemaSuccess = (actionSchema, identify) =>({
    type: RULE_ACTION_SCHEMA_SUCCESS,
    actionSchema, identify
});

export const initAllRedux = identify => ({
    type: RULE_INIT_ALL_REDUX,
    identify
});
export const getActionContent = (sitename, module, submodule, config, alarmType, identify) =>({
    type: RULE_GET_ACTION_CONTENT,
    sitename, module, submodule, config, alarmType, identify
});

export const getActionContentSuccess = (actionContent, configname, identify) =>({
    type: RULE_GET_ACTION_CONTENT_SUCCESS,
    actionContent, configname, identify
});
export const changeTab = (identify, checkedTab, columnConfig) => ({
    type: RULE_CHANGETAB,
    checkedTab,
    identify,
    columnConfig,
    pageNo: 1,
    pageLimit: 10,
    arrayData: [],
    multipleSelected: [],
    selectDeviceId: "",
    showFloatTab: false
});