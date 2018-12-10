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
 * Created by Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { MultipleSelect } from "modules/mapAndPanelCommon";
import { handleDataForSeverity } from "./../../funcs/utils/alarmUtils";

export default class SelectSeverity extends Component {
    onSelect = (e) => {
        const { onSelect } = this.props;
        onSelect(e);
    };
    render() {
        const { selectOptions, label, identify, defaultValue } = this.props;
        const data = handleDataForSeverity(selectOptions);
        return (
            <div style={{marginTop: "8px"}}>
                <MultipleSelect
                    selectOptions={data}
                    identify={identify}
                    label={label}
                    onSelect={this.onSelect}
                    defaultValue={defaultValue}
                />
            </div>
        );
    }
}
