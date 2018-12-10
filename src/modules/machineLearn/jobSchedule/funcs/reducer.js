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
 * Created by HuLin on 20/05/2018.
 */
import * as actionTypes from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};

const data = {
    [actionTypes.SETADDOPENDRAWER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isAddOpenDrawer: action.isAddOpenDrawer,
                activeStep: action.activeStep,
                basicInfo: {},
                sourceMessage: {},
                output: {},
                engineInfo: {},
                other: {}
            }
        };
    },
    [actionTypes.SETREQUESTDEVICENAME](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    }, 
    [actionTypes.GETREQUESTDEVICENAME](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceType: action.configs
            }
        };
    },
    [actionTypes.SETDATAPROCESSINFO](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshInfoSuccess: action.refreshInfoSuccess
            }
        };
    },
    [actionTypes.GETDATAPROCESSINFO](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshInfoSuccess: action.refreshInfoSuccess,
                dataProcessInfo: action.dataProcessInfo
            }
        };
    },
    [actionTypes.SETHANDLEBACK](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep
            }
        };
    },
    [actionTypes.SETBASICINFO](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep,
                basicInfo: {
                    name: action.name,
                    description: action.description,
                    deviceName: action.deviceName,
                    deviceTypeValue: action.deviceTypeValue,
                    jobType: action.jobType,
                    chooseModel: action.chooseModel,
                    appid: action.appid
                }
            }
        };
    },
    [actionTypes.GETMODELPREDICTIONDESOUT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                modelPredictionDesOut: {
                    deviceTypeModelName: action.deviceTypeModelName,
                    venderName: action.venderName,
                    predictionDeviceId: action.predictionDeviceId,
                    mlOutputStructure: action.mlOutputStructure,
                    predictionDseTemplate: action.predictionDseTemplate,
                    swaggerJson: action.swaggerJson
                }
            }
        };
    },
    [actionTypes.GETCHOOSEMODELVALUE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                modelTableInfo: action.modelTableInfo
            }
        };
    },
    [actionTypes.GETDEVICETYPEVALUE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceTypeValue: action.deviceValue
            }
        };
    },
    [actionTypes.GETREQUESTDEVICEVALUE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceValue: action.deviceValue
            }
        };
    },
    [actionTypes.SETMODELINPUTOUTPUTPARAMETERS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshSuccess: action.refreshSuccess
            }
        };
    },
    [actionTypes.GETMODELINPUTOUTPUTPARAMETERS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshSuccess: action.refreshSuccess,
                modelInputOutputParameters: action.modelInputOutputParameters
                
            }
        };
    },
    [actionTypes.SETSOURCEMESSAGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep,
                sourceMessage: {
                    modelAPIInput: action.modelAPIInput,
                    deviceType: action.deviceType,
                    modelId: action.modelId
                }
            }
        };
    },
    [actionTypes.SETOUTPUT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep,
                output: {
                    modelAPIOutput: action.modelAPIOutput,
                    deviceType: action.deviceType
                }
            }
        };
    },
    [actionTypes.SETENGINEINFO](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep,
                engineInfo: {
                    driverCores: action.driverCores,
                    driverMemory: action.driverMemory,
                    engineType: action.engineType,
                    engineUrl: action.engineUrl,
                    executorCores: action.executorCores,
                    executorMemory: action.executorMemory
                }
            }
        };
    },
    [actionTypes.SETOTHER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep,
                other: {
                    configFilePath: action.configFilePath,
                    fileSystemUrl: action.fileSystemUrl
                }
            }
        };
    },
    [actionTypes.SETCREATEJOB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshDrawerSuccesss: action.refreshDrawerSuccesss
            }
        };
    },
    [actionTypes.GETJUDGESUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshDrawerSuccesss: action.refreshDrawerSuccesss,
                createResult: action.createSuccess
            }
        };
    },
    [actionTypes.SETRELASHJOBSCHEDULE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                reflashSuccess: action.reflashSuccess
            }
        };
    },
    [actionTypes.GETJOBSCHEDULETABLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                jobScheduleTable: action.jobScheduleTable,
                pagination: action.pagination,
                reflashSuccess: action.reflashSuccess
            }
        };
    },
    [actionTypes.GETJOBSCHEDULEHEAD](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                AscTitle: action.AscTitle,
                DescTitle: action.DescTitle
            }
        };
    },
    [actionTypes.SETOPENDIALOG](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isOpenDialog: action.isOpenDialog
            }
        };
    }
};

const dataReducer = createReducer(initialState, Object.assign({}, data));

export default dataReducer;
