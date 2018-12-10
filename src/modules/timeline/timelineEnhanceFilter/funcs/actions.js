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
    TIMELINE_PREDICATE_CHANGED,
    TIMELINE_COLUMNS_CHANGED,
    TIMELINE_STORE_FILTER,
    TIMELINE_FILTERVALUE_CHANGES,
    TIMELINEFILTER_REFRESH_TIMELINE
} from "./actionTypes";

export const storeFilters = (identify, filterConfig) => ({
    type: TIMELINE_STORE_FILTER,
    identify,
    filterConfig
});

export const predicateChanged = (identify, predicate, filterArr) => ({
    type: TIMELINE_PREDICATE_CHANGED,
    identify,
    predicate,
    filterArr
});

export const columnsChanged = (identify, currentCheckColumns) => ({
    type: TIMELINE_COLUMNS_CHANGED,
    identify,
    currentCheckColumns
});

export const filtersValueChanged = (identify, filterConfig) => ({
    type: TIMELINE_FILTERVALUE_CHANGES,
    identify,
    filterConfig
});

export const refreshTimeline = (identify, refreshTimeline) => ({
    type: TIMELINEFILTER_REFRESH_TIMELINE,
    identify,
    refreshTimeline: refreshTimeline
});