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
 * Created by wplei on 10/06/18.
 */
import React from "react";
import { Select } from "modules/common";
import proptypes from "prop-types";
import { MenuItem } from "@material-ui/core";

class IscSingleDropdown extends React.Component {
    state = {
        multiple: false,
        selectedValue: []
    };
    static defaultProps = {
        multiple: false,
        options: [
            {
                label: "1",
                selecterValue: "1"
            },
            {
                label: "2",
                selecterValue: "2"
            },
            {
                label: "3",
                selecterValue: "3"
            }
        ]
    };
    static propTypes = {
        multiple: proptypes.bool,
        options: proptypes.arrayOf({
            label: proptypes.oneOfType([proptypes.string, proptypes.number]),
            selecterValue: proptypes.oneOfType([proptypes.string, proptypes.number])
        })
    };
    handleSelecterChange = () => {};
    handleSelectedRender = selected => {
        // render as chips
        return selected;
    };
    render = () => {
        const { multiple, options } = this.state;
        return (
            <div>
                <Select
                    multiple={multiple}
                    onChange={this.handleSelecterChange}
                    renderValue={this.handleSelectedRender}
                >
                    {options &&
                        options.map((item, index) => {
                            return <MenuItem key={index}>{item.label}</MenuItem>;
                        })}
                </Select>
            </div>
        );
    };
}

export default IscSingleDropdown;
