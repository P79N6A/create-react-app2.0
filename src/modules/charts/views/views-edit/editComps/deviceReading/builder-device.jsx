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
 * Created by KaiDi on 25/05/2018.
 */

// import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { Filter as TopologySearch } from "modules/filter/topologyFilter";

const langPath = "chart.editView.device.";
const Device = props => {
    const { predicates, identify, onChangeProperty, isLoading, multiDevice } = props,
        { iotIds } = predicates;
    return (
        <div className="chart-query">
            <TopologySearch
                value={iotIds || undefined}
                identify={identify}
                label={I18n.t(langPath + "selectTitle")}
                disabled={isLoading}
                isMulti={multiDevice}
                placeholder={I18n.t(langPath + "placeholder")}
                getChoosedData={value => {
                    // let value = _.map(iots, item => item.key);
                    const opt = {
                        ...predicates,
                        aggregation: "None",
                        keyList: [],
                        interval: "",
                        grouping: "None",
                        iotIds: value
                    };
                    onChangeProperty(identify, { predicates: opt });
                }}
            />
        </div>
    );
};

Device.propTypes = {
    isLoading: PropTypes.bool,
    predicates: PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Device;
