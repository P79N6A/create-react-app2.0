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

import React from "react";
import echarts from "echarts";
import Gauge from "./gauge";
import LineBar from "./lineBar";
import PieDonut from "./pieDonut";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { CardWithTitle } from "modules/basicCardComps";
import { CircularProgress } from "@material-ui/core";
import { getChartThemeConfig } from "commons/utils/settingHelper";
import { FullScreenButton } from "modules/ccms/components";
import Refresh from "modules/charts/views/views-edit/editComps/common-refreshBtn";
// import { westeros, purplePassion, wonderland } from "modules/charts/funcs/theme";
getChartThemeConfig().then(res => {
    // echarts.registerTheme("westeros", res.westeros);
    echarts.registerTheme("shine", res.shine);
    echarts.registerTheme("skittles", res.skittles);
});

const Chart = props => {
    const { type, options,markLines } = props;
    const chartMapping = {
        gauge: <Gauge {...options} />,
        line: <LineBar {...options} markLines={markLines}/>,
        area:<LineBar {...options} markLines={markLines}/>,
        bar: <LineBar {...options} markLines={markLines}/>,
        pie: <PieDonut {...options} />,
        donut: <PieDonut {...options} />
    };
    return chartMapping[type] ? chartMapping[type] : <LineBar {...options} markLines={markLines} />;
};

const View = props => {
    const { title, isLoading, noHeader } = props;
    return (
        <CardWithTitle
            noHeader={noHeader}
            title={title}
            icons={[<Refresh {...props} />, <FullScreenButton {...props} />]}
        >
            <div className="isc-chart">
                <div className="isc-chart-container">
                    {isLoading ? <CircularProgress color="secondary" /> : <Chart {...props} />}
                </div>
            </div>
        </CardWithTitle>
    );
};

export default View;
