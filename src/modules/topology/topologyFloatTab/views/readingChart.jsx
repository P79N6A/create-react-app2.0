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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import { view as ChartView, editerView as Editor } from "modules/charts";
import CardContent from "@material-ui/core/Card";
import { connect } from "react-redux";
import { setFloatTabTitle } from "../funcs/actions";

class ReadingChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    componentDidMount() {
        this.props.setFloatTabTitle(this.props.identify, "Device Reading Chart");
    }

    handleExpandFilters() {
        this.setState({ expanded: !this.state.expanded });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== parseInt(nextProps.currentTab, 10) || !nextProps.showFloatTab) {
            return;
        }
        this.props.setFloatTabTitle(nextProps.identify, "Device Reading Chart");
    }

    render() {
        let property = {
            identify: this.props.identify,
            timeMode: "realTime",
            type: "line",
            title: "",
            timeFormat: ["MM/DD/YYYY", ""],
            configList: ["Aggregation", "Parameter", "Interval", "Time", "Format"],
            source: "event",
            predicates: {
                interval: "Days",
                aggregation: "",
                dateRange: ["isc::{Today(00:00:00)-iso8601::(PT1H)}"],
                iotIds: [{ key: this.props.selectDeviceId, label: this.props.selectDeviceName }]
            },
            noHeader: true
        };
        return (
            <div className="topo-chart">
                {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit style={{ height: "300px", overflowY: "auto" }}>
                    <CardContent style={{ height: "300px", overflowY: "auto", padding: "16px 24px" }}>
                        <Editor {...property} />
                    </CardContent>
                </Collapse> */}
                <CardContent className="topo-chart-cont">
                    <div className="chart-config">
                        <Editor {...property} />
                    </div>
                    <div className="chart">
                        <ChartView {...property} />
                    </div>
                </CardContent>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ReadingChart);
