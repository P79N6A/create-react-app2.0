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
    RULEFLOATTAB_INIT,
    RULEFLOATTAB_SET,
    RULEFLOATTAB_CHANGETAB,
    RULEFLOATTAB_GETDETAIL,
    RULEFLOATTAB_GETDETAIL_SUCCESS,
    RULEFLOATTAB_UPDATERULE,
    RULEFLOATTAB_UPDATERULE_SUCCESS,
    RULEFLOATTAB_ADDRULE,
    RULEFLOATTAB_ADDRULE_SUCCESS,
    RULEFLOATTAB_GET_TOPOLOGY_LIST,
    RULEFLOATTAB_GET_TOPOLOGY_LIST_SUCCESS,
    RULEFLOATTAB_GET_DEVICEMODEL_INFO,
    RULEFLOATTAB_GET_DEVICEMODEL_INFO_SUCCESS,
    RULEFLOATTAB_GET_RULE_CONDITION_CONFIG,
    RULEFLOATTAB_UPDATE_NOTIFICATION,
    RULEFLOATTAB_GET_ACTION_CONTENT,
    RULEFLOATTAB_GET_ACTION_CONTENT_SUCCESS,
    RULEFLOATTAB_CREATE_NOTIFICATION_CONFIG,
    RULEFLOATTAB_CREATE_WORKFLOW_CONFIG,
    RULEFLOATTAB_SAVE_CONFIGS
} from "./actionTypes";

export const initRuleFloatTab = identify => ({
    type: RULEFLOATTAB_INIT,
    identify
});
export const setRuleFloatTab = (configname, defaultTab, identify) => ({
    type: RULEFLOATTAB_SET,
    getDetailSuccess: false,
    configname,
    defaultTab,
    identify
});

export const changeTab = (checkedTab, identify) => ({
    type: RULEFLOATTAB_CHANGETAB,
    checkedTab,
    identify
});

export const getConfigDetail = (sitename, configname, identify) => ({
    type: RULEFLOATTAB_GETDETAIL,
    sitename,
    configname,
    identify
});

export const getRuleDetailSuccess = (arrayData, identify) => ({
    type: RULEFLOATTAB_GETDETAIL_SUCCESS,
    getDetailSuccess: true,
    arrayData,
    identify
});

export const updateRule = (sitename, configname, configvaldesc, configval, user, pageLimit, pageNo, identify) => ({
    type: RULEFLOATTAB_UPDATERULE,
    sitename,
    configname,
    configvaldesc,
    configval,
    user,
    pageLimit,
    pageNo,
    identify,
    // refreshRuleFloatSuccess: false
});
export const updateRuleSuccess = (identify) => ({
    type: RULEFLOATTAB_UPDATERULE_SUCCESS,
    identify,
    refreshRuleFloatSuccess: true
});
export const addRule = (sitename, configName, configvaldesc, configValue, userid, pageLimit, identify) => ({
    type: RULEFLOATTAB_ADDRULE,
    addRuleDataSuccess: false,
    sitename,
    configName, configvaldesc, configValue, userid, pageLimit, identify,
    refreshRuleFloatSuccess: false
});
export const addRuleSuccess = (identify) => ({
    type: RULEFLOATTAB_ADDRULE_SUCCESS,
    identify,
    refreshRuleFloatSuccess: true
});
export const getTopologyListData = (sitename, iotId,identify) => ({
    type: RULEFLOATTAB_GET_TOPOLOGY_LIST,
    iotId,
    sitename,
    identify
});

// get topology data list success
export const getTopologyListDataSuccess = (properties,identify) => ({
    type: RULEFLOATTAB_GET_TOPOLOGY_LIST_SUCCESS,
    properties,
    identify
});

export const getTopologyModelListData = (sitename, deviceModelId, identify, deviceModelName) => ({
    type: RULEFLOATTAB_GET_DEVICEMODEL_INFO,
    sitename,
    deviceModelId,
    identify,
    deviceModelName
});

export const getTopologyModelInfoSuccess = (conditionSchema,identify, deviceModelName) => ({
    type: RULEFLOATTAB_GET_DEVICEMODEL_INFO_SUCCESS,
    conditionSchema,
    identify,
    deviceModelName
});

export const getRuleConditionConfig = (conditionConfig, identify) =>({
    type: RULEFLOATTAB_GET_RULE_CONDITION_CONFIG,
    conditionConfig, identify
});

export const updateNotification = (sitename, modules, configname, userid, mode, pageLimit, identify) =>({
    type: RULEFLOATTAB_UPDATE_NOTIFICATION,
    sitename, modules, configname, userid, mode, pageLimit, identify
});

export const getActionContent = (sitename, module, submodule, config, alarmType, identify) =>({
    type: RULEFLOATTAB_GET_ACTION_CONTENT,
    sitename, module, submodule, config, alarmType, identify
});

export const getActionContentSuccess = (actionContent, configname, identify) =>({
    type: RULEFLOATTAB_GET_ACTION_CONTENT_SUCCESS,
    actionContent, configname, identify
});

export const controlNotificationConfig = (notificationConfig, mode, identify) =>({
    type: RULEFLOATTAB_CREATE_NOTIFICATION_CONFIG,
    notificationConfig,
    mode,
    identify
});
export const controlWorkflowConfig = (workflowConfig, mode, identify) =>({
    type: RULEFLOATTAB_CREATE_WORKFLOW_CONFIG,
    workflowConfig, mode, identify
});

export const saveConfigsFunc = (configs, identify) =>({
    type: RULEFLOATTAB_SAVE_CONFIGS,
    configs, identify
});