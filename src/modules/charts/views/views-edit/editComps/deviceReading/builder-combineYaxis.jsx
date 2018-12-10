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
// import { TextField, Select, InputLabel } from "modules/common";

const langPath = "chart.editView.combineAxes.";
class CombineYaxis extends React.Component {
    state = { checked: false };
    componentWillReceiveProps(nextProps) {
        const { combineYaxis, predicates } = nextProps,
            { keyList } = predicates;
        let checked;
        if (_.isEmpty(keyList) || _.isEmpty(combineYaxis) || !_.isEqual(keyList, this.props.predicates.keyList)) {
            checked = false;
        } else {
            checked = true;
        }
        this.state.checked !== checked && this.handleSwitch();
    }
    handleSwitch = () => {
        const { checked } = this.state,
            { onChangeProperty, identify, readingLabel, customizeReading } = this.props;
        this.setState({ checked: !checked }, () => {
            if (this.state.checked) {
                const combineResult = this.handleCombine(this.props),
                    readingLab = this.checkReadingLabel(combineResult, customizeReading, readingLabel);
                onChangeProperty(identify, { combineYaxis: combineResult, readingLabel: readingLab });
            } else {
                onChangeProperty(identify, { combineYaxis: [], readingLabel: [] });
            }
            // !this.state.checked && onChangeProperty(identify, { readingLabel: result || [] });
        });
    };
    handleCombine = props => {
        const { predicates } = props,
            { keyList } = predicates,
            group = _.groupBy(keyList, item => item.units);
        const result = _.map(group, (item, key) => ({
            units: key,
            name: _.reduce(item, (sum, n) => (sum ? sum + "/" : "") + n.displayName, ""),
            readings: item
        }));
        return result;
    };
    checkReadingLabel = (combinedAxis, customizeReading, readingLabel) => {
        let result = [];
        const originalList = customizeReading ? [...combinedAxis, ...customizeReading] : combinedAxis;
        _.forEach(originalList, item => {
            const reading = _.find(readingLabel, label => label.reading === item.name);
            result = reading ? [...result, reading] : result;
        });
        return result;
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

CombineYaxis.propTypes = {
    isLoading: PropTypes.bool,
    predicates: PropTypes.object,
    readingLabel: PropTypes.array,
    combineYaxis: PropTypes.array,
    customizeReading: PropTypes.array,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default CombineYaxis;
