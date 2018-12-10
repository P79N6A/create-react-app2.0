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
import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import {REDUCER_NAME as reducerName} from "./funcs/constants";
import {configTheme as theme, retheme as view} from "./views/theme";
import IscThemes from "./views/themes";
import sagas from "./funcs/sagas";

export {
    actions,
    reducer,
    view,
    theme,
    sagas,
    reducerName,
    IscThemes
};