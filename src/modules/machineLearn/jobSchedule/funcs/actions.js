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
 * Created by hl on 09/07/2018.
 */
import * as actionTypes from "./actionTypes";

//set add jobs
export const setAddOpenDrawer = (isAddOpenDrawer, activeStep, identify) => {
    return {
        type: actionTypes.SETADDOPENDRAWER,
        isAddOpenDrawer,
        activeStep,
        identify
    };
};

//set device type
export const setRequestDeviceName = (sitename, identify) => {
    return {
        type: actionTypes.SETREQUESTDEVICENAME,
        sitename,
        identify
    };
};

//get device type
export const getRequestDeviceName = (configs, identify) => {
    return {
        type: actionTypes.GETREQUESTDEVICENAME,
        configs,
        identify
    };
};

//set setDataProcessInfo
export const setDataProcessInfo = (taskId, identify) => {
    return {
        type: actionTypes.SETDATAPROCESSINFO,
        taskId,
        refreshInfoSuccess: false,
        identify
    };
};

//get setDataProcessInfo
export const getDataProcessInfo = (dataProcessInfo, identify) => {
    return {
        type: actionTypes.GETDATAPROCESSINFO,
        dataProcessInfo,
        refreshInfoSuccess: true,
        identify
    };
};

//set handleBack
export const setHandleBack = (activeStep, identify) => {
    return {
        type: actionTypes.SETHANDLEBACK,
        activeStep,
        identify
    };
};

//set basicInfo
export const setBasicInfo = (
    name,
    description,
    deviceName,
    deviceTypeValue,
    jobType,
    chooseModel,
    appid,
    activeStep,
    identify
) => {
    return {
        type: actionTypes.SETBASICINFO,
        name,
        description,
        deviceName,
        deviceTypeValue,
        jobType,
        chooseModel,
        appid,
        activeStep,
        identify
    };
};

//setModelPredictionDesOut
export const setModelPredictionDesOut = (modelId, identify) => {
    return {
        type: actionTypes.SETMODELPREDICTIONDESOUT,
        modelId,
        identify
    };
};

//getModelPredictionDesOut
export const getModelPredictionDesOut = (
    deviceTypeModelName,
    venderName,
    predictionDeviceId,
    mlOutputStructure,
    swaggerJson,
    identify
) => {
    return {
        type: actionTypes.GETMODELPREDICTIONDESOUT,
        deviceTypeModelName,
        venderName,
        predictionDeviceId,
        mlOutputStructure,
        swaggerJson,
        identify
    };
};

//set model input output parameter
export const setModelInputOutputParameters = (modelId, identify) => {
    return {
        type: actionTypes.SETMODELINPUTOUTPUTPARAMETERS,
        modelId,
        refreshSuccess: false,
        identify
    };
};

//get model input output parameter
export const getModelInputOutputParameters = (modelInputOutputParameters, identify) => {
    return {
        type: actionTypes.GETMODELINPUTOUTPUTPARAMETERS,
        modelInputOutputParameters,
        refreshSuccess: true,
        identify
    };
};

//set choose model
export const setChooseModelValue = (page, rowsPerpage, orderBy, order, identify) => {
    return {
        type: actionTypes.SETCHOOSEMODELVALUE,
        page,
        rowsPerpage,
        orderBy,
        order,
        identify
    };
};

//get choose model
export const getChooseModelValue = (modelTableInfo, identify) => {
    return {
        type: actionTypes.GETCHOOSEMODELVALUE,
        modelTableInfo,
        identify
    };
};

//set deviceValue
export const setDeviceValue = (sitename, deviceValue, identify) => {
    return {
        type: actionTypes.SETDEVICEVALUE,
        sitename,
        deviceValue,
        identify
    };
};

//get deviceTypeValue
export const getDeviceValue = (deviceValue, identify) => {
    return {
        type: actionTypes.GETDEVICETYPEVALUE,
        deviceValue,
        identify
    };
};

//set RequestDeviceValue
export const setRequestDeviceValue = (deviceValue, identify) => {
    return {
        type: actionTypes.SETREQUESTDEVICEVALUE,
        deviceValue,
        identify
    };
};

//get RequestDeviceValue
export const getRequestDeviceValue = (deviceValue, identify) => {
    return {
        type: actionTypes.GETREQUESTDEVICEVALUE,
        deviceValue,
        identify
    };
};

//set sourceMessage
export const setSourceMessage = (modelAPIInput, deviceType, modelId, activeStep, identify) => {
    return {
        type: actionTypes.SETSOURCEMESSAGE,
        modelAPIInput,
        deviceType,
        modelId,
        activeStep,
        identify
    };
};

//set output
export const setOutput = (modelAPIOutput, deviceType, activeStep, identify) => {
    return {
        type: actionTypes.SETOUTPUT,
        modelAPIOutput,
        deviceType,
        activeStep,
        identify
    };
};

//set engineInfo
export const setEngineInfo = (
    driverCores,
    driverMemory,
    engineType,
    engineUrl,
    executorCores,
    executorMemory,
    activeStep,
    identify
) => {
    return {
        type: actionTypes.SETENGINEINFO,
        driverCores,
        driverMemory,
        engineType,
        engineUrl,
        executorCores,
        executorMemory,
        activeStep,
        identify
    };
};

// set other
export const setOther = (configFilePath, fileSystemUrl, activeStep, identify) => {
    return {
        type: actionTypes.SETOTHER,
        configFilePath,
        fileSystemUrl,
        activeStep,
        identify
    };
};

//set setCreateJob
export const setCreateJob = (
    name,
    description,
    deviceName,
    deviceTypeValue,
    jobType,
    appid,
    inputDeviceType,
    modelAPIInput,
    modelId,
    swaggerJson,
    driverCores,
    driverMemory,
    engineType,
    engineUrl,
    executorCores,
    executorMemory,
    configFilePath,
    fileSystemUrl,
    accountId,
    deviceTypeModelName,
    venderName,
    predictionDeviceId,
    mlOutputStructure,
    identify
) => {
    return {
        type: actionTypes.SETCREATEJOB,
        name,
        description,
        deviceName,
        deviceTypeValue,
        jobType,
        appid,
        inputDeviceType,
        modelAPIInput,
        modelId,
        swaggerJson,
        driverCores,
        driverMemory,
        engineType,
        engineUrl,
        executorCores,
        executorMemory,
        configFilePath,
        fileSystemUrl,
        accountId,
        deviceTypeModelName,
        venderName,
        predictionDeviceId,
        mlOutputStructure,
        refreshDrawerSuccesss: false,
        identify
    };
};

// judge create job success
export const getJudgeSuccess = (createSuccess, identify) => {
    return {
        type: actionTypes.GETJUDGESUCCESS,
        createSuccess,
        refreshDrawerSuccesss: true,
        identify
    };
};

// set setReflashJobSchedule
export const setReflashJobSchedule = (page, rowsPerpage, orderBy, order, identify) => {
    return {
        type: actionTypes.SETRELASHJOBSCHEDULE,
        page,
        rowsPerpage,
        orderBy,
        order,
        reflashSuccess: false,
        identify
    };
};

//get getJobSchedule table value
export const getJobScheduleTable = (jobScheduleTable, pagination, identify) => {
    return {
        type: actionTypes.GETJOBSCHEDULETABLE,
        jobScheduleTable,
        pagination,
        reflashSuccess: true,
        identify
    };
};

//set job schedule table head
export const setJobScheduleHead = (flag, identify) => {
    return {
        type: actionTypes.SETJOBSCHEDULEHEAD,
        flag,
        identify
    };
};

//get job schedule table head
export const getJobScheduleHead = (AscTitle, DescTitle, identify) => {
    return {
        type: actionTypes.GETJOBSCHEDULEHEAD,
        AscTitle,
        DescTitle,
        identify
    };
};

//set delete schedule
export const setMachineDelete = (taskId, identify) => {
    return {
        type: actionTypes.SETMACHINEDELETE,
        taskId,
        identify
    };
};

//set setOpenDialog
export const setOpenDialog = (isOpenDialog, identify) => {
    return {
        type: actionTypes.SETOPENDIALOG,
        isOpenDialog,
        identify
    };
};

//set setMachineJobStatus
export const setMachineJobStatus = (taskId, identify) => {
    return {
        type: actionTypes.SETMACHINEJOBSTATUS,
        taskId,
        identify
    };
};
