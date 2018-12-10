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
 * Created by KaiDi on 08/10/2018.
 */

import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { Switch, FormControlLabel } from "@material-ui/core";

const langPath = "chart.editView.dataZoom.";
class DataZoom extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        enableDataZoom: PropTypes.bool,
        identify: PropTypes.string.isRequired,
        onChangeProperty: PropTypes.func.isRequired
    };
    state = { checked: false };
    componentWillReceiveProps(nextProps) {
        const { enableDataZoom } = nextProps,
            checked = _.isBoolean(enableDataZoom) ? enableDataZoom : false;
        this.state.checked !== checked && this.handleSwitch();
    }
    handleSwitch = () => {
        const { checked } = this.state,
            { onChangeProperty, identify } = this.props;
        this.setState({ checked: !checked }, () => {
            onChangeProperty(identify, { enableDataZoom: this.state.checked });
        });
    };
    render() {
        const { isLoading } = this.props,
            { checked } = this.state;
        return (
            <FormControlLabel
                className="chart-plugin-switch"
                control={<Switch checked={checked} disabled={isLoading} onChange={this.handleSwitch} value="checked" />}
                label={I18n.t(langPath + "switchTitle")}
            />
        );
    }
}
export default DataZoom;
