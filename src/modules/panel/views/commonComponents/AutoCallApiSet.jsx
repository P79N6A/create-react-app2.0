/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { Switch, FormControlLabel } from "@material-ui/core";
import { connect } from "react-redux";
import { SingleSelect } from "modules/mapAndPanelCommon";
import PropTypes from "prop-types";
import {
    panelChangeDurationStatus,
    panelChangeDurationTime
} from "./../../funcs/actions";

class AutoCallApiSet extends Component {
    static defaultProps = {
        onTimeSelect: () => {
        },
        onSwitchSelect: () => {
        },
        selectOptions: ["30 seconds", "60 seconds", "90 seconds"]
    };
    static propTypes = {
        onTimeSelect: PropTypes.func,
        onSwitchSelect: PropTypes.func,
        checked: PropTypes.bool.isRequired,
        defaultValue: PropTypes.string.isRequired,
        identify: PropTypes.string.isRequired
    };
    handleSwitchChange = (event) => {
        const { dispatch, identify } = this.props;
        const { checked } = event.target;
        dispatch(
            panelChangeDurationStatus(checked, identify)
        );
        this.props.onSwitchSelect(checked);
    };

    durationTimeSelect = (durationTime) => {
        const { dispatch, identify } = this.props;
        dispatch(
            panelChangeDurationTime(durationTime, identify)
        );
        this.props.onTimeSelect(durationTime);
    };

    render() {
        const { checked, defaultValue, selectOptions } = this.props;
        return (
            <React.Fragment>
                <FormControlLabel
                    style={{ margin: "0", marginLeft: "-14px" }}
                    control={
                        <Switch
                            checked={checked}
                            onChange={this.handleSwitchChange}
                        />
                    }
                    label="AutoRefresh Duration"
                />
                {
                    checked && (
                        <SingleSelect
                            title="AutoRefresh Duration Time"
                            defaultValue={defaultValue}
                            selctOptions={selectOptions}
                            onSelect={this.durationTimeSelect}
                        />
                    )
                }
            </React.Fragment>
        );
    }
}

export default connect()(AutoCallApiSet);

