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

// get topo tree data
export const getTopoTreeData = (identify, roles, treeMode, callback, iotId) => ({
    type: actionTypes.TOPOTREE_GET_TOPO_TREE_DATA,
    identify,
    roles,
    iotId,
    treeMode,
    getTopoTreeDataSuccess: false,
    callback
});

// get topo tree data success
export const getTopoTreeDataSuccess = (identify, topoTreeData, callback) => ({
    type: actionTypes.TOPOTREE_GET_TOPO_TREE_DATA_SUCCESS,
    identify,
    topoTreeData,
    getTopoTreeDataSuccess: true,
    resetTopoTree: false,
    callback
});

// search topo tree data
export const searchTopoTreeData = (
    identify,
    searchWord,
    pageNo,
    pageLimit,
    treeFilter,
    addressOutPutList,
    selectAppRespath,
    underAppFilter,
    callback
) => ({
    type: actionTypes.TOPOTREE_SEARCH_TOPO_TREE_DATA,
    identify,
    searchWord,
    pageNo,
    pageLimit,
    treeFilter,
    addressOutPutList,
    selectAppRespath,
    underAppFilter,
    searchTopoTreeDataSuccess: false,
    callback
});

// search topo tree data success
export const searchTopoTreeDataSuccess = (identify, searchTopoData, pagination, callback) => ({
    type: actionTypes.TOPOTREE_SEARCH_TOPO_TREE_DATA_SUCCESS,
    identify,
    searchTopoData,
    pagination,
    searchTopoTreeDataSuccess: true,
    resetTopoTree: false,
    callback
});

// search topo tree data
export const searchTopoTreeAddressData = (
    identify,
    searchWord,
    pageNo,
    pageLimit,
    treeFilter,
    addressOutPutList,
    selectAppRespath,
    underAppFilter,
    callback
) => ({
    type: actionTypes.TOPOTREE_SEARCH_TOPO_TREE_ADDRESS_DATA,
    identify,
    searchWord,
    pageNo,
    pageLimit,
    treeFilter,
    addressOutPutList,
    selectAppRespath,
    underAppFilter,
    searchTopoTreeDataSuccess: false,
    callback
});

// select current tree node
export const currentSelectTreeNode = (identify, iotId) => ({
    type: actionTypes.TOPOTREE_CURRENT_SELECT_NODE,
    identify,
    iotId
});

// reset topo tree
export const topoTreeReset = identify => ({
    type: actionTypes.TOPOTREE_RESET_TOPO_TREE,
    identify,
    resetTopoTree: true
});

// ccms editor view control
export const editorControlProps = (identify, editorState) => ({
    type: actionTypes.TOPOTREE_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});

// get sysconfig devicetypes
export const getSysconfigDeviceTypes = (identify, siteName, dataType) => ({
    type: actionTypes.TOPOTREE_GET_SYSCONFIG_DEVICE_TYPE,
    identify,
    siteName,
    dataType
});

// get sysconfig devicetypes success
export const getSysconfigDeviceTypeSuccess = (identify, sysconfigDevicetypes, dataType) => ({
    type: actionTypes.TOPOTREE_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS,
    identify,
    sysconfigDevicetypes,
    dataType
});
