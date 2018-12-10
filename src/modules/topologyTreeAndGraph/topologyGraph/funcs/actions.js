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
 * Created by xulu on 31/08/2018.
 */
import * as actionTypes from "./actionTypes";

export const getTopoGraph = (identify, iotId) => ({
    type: actionTypes.TOPOGRAPH_GET_TOPO_GRAPH,
    identify,
    iotId,
    searchGraphSuccess: false
});

export const getTopoGraphSuccess = (identify, topoGraphData) => ({
    type: actionTypes.TOPOGRAPH_GET_TOPO_GRAPH_SUCCESS,
    identify,
    topoGraphData,
    searchGraphSuccess: true
});

export const topoGraphSelectNode = (identify, nodeId) => ({
    type: actionTypes.TOPOGRAPH_SELECT_NODE,
    identify,
    nodeId
});

export const closeFloatTab = identify => ({
    type: actionTypes.TOPOGRAPH_CLOSE_FLOATTAB,
    showFloatTab: false,
    identify,
    selectDeviceId: null
});

// ccms editor view control
export const editorControlProps = (identify, editorState) => ({
    type: actionTypes.TOPOGRAPH_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});

export const searchGraphArea = (identify, areaFormat) => ({
    type: actionTypes.TOPOGRAPH_SEARCH_TOPO_GRAPH_AREA,
    identify,
    areaFormat,
    searchGraphSuccess: false
});

// get sysconfig devicetypes
export const getSysconfigDeviceTypes = (identify, siteName, dataType) => ({
    type: actionTypes.TOPOGRAPH_GET_SYSCONFIG_DEVICE_TYPE,
    identify,
    siteName,
    dataType
});

// get sysconfig devicetypes success
export const getSysconfigDeviceTypeSuccess = (identify, sysconfigDevicetypes, dataType) => ({
    type: actionTypes.TOPOGRAPH_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS,
    identify,
    sysconfigDevicetypes,
    dataType
});
