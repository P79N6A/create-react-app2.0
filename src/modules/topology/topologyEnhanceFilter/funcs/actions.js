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
 * Created by xulu on 25/05/2018.
 */
import {
    TOPOFILTER_SEARCH_TYPES,
    TOPOFILTER_SEARCH_TYPES_SUCCESS,
    TOPOFILTER_PREDICATE_CHANGED,
    TOPOFILTER_COLUMNS_CHANGED,
    TOPOFILTER_STORE_FILTER,
    TOPOFILTER_FILTERVALUE_CHANGES,
    TOPOFILTER_REFRESH_TOPOLOGY
} from "./actionTypes";

export const storeFilters = (identify, filterConfig) => ({
    type: TOPOFILTER_STORE_FILTER,
    identify,
    filterConfig
});

export const predicateChanged = (identify, predicate, filterArr) => ({
    type: TOPOFILTER_PREDICATE_CHANGED,
    identify,
    predicate,
    filterArr
});

export const columnsChanged = (identify, currentCheckColumns) => ({
    type: TOPOFILTER_COLUMNS_CHANGED,
    identify,
    currentCheckColumns
});

export const filtersValueChanged = (identify, filterConfig) => ({
    type: TOPOFILTER_FILTERVALUE_CHANGES,
    identify,
    filterConfig
});

export const searchDeviceType = identify => ({
    type: TOPOFILTER_SEARCH_TYPES,
    identify
});

export const searchTopoTypesSuccess = (topoTypeDatas, identify) => ({
    type: TOPOFILTER_SEARCH_TYPES_SUCCESS,
    topoTypeDatas,
    identify
});

export const refreshTopology = (identify, refreshTopology) => ({
    type: TOPOFILTER_REFRESH_TOPOLOGY,
    identify,
    refreshTopology: refreshTopology
});