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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import StringEditor from "./string-editor";
import SwitchEditor from "./switch-editor";
import DatePickerEditor from "./datepicker-editor";
import RangePickerEditor from "./rangepicker-editor";
import TextareaEditor from "./textarea-editor";
import SelectEditor from "./select-editor";

class Editor extends React.Component {
    render() {
        const { comp } = this.props.schema;
        const { aop = null } = this.props;
        switch (comp) {
            case "input":
                return <StringEditor {...this.props} />;
            case "switch":
                return <SwitchEditor {...this.props} />;
            case "datepicker":
                return <DatePickerEditor {...this.props} />;
            case "rangepicker":
                return <RangePickerEditor {...this.props} />;
            case "textarea":
                return <TextareaEditor {...this.props} />;
            case "select":
                return <SelectEditor {...this.props} />;
            default:
                if (aop && typeof aop === "object" && aop.hasOwnProperty(comp)) {
                    return aop[comp].view(this.props);
                }
                return null;
        }
    }
}

export default Editor;
