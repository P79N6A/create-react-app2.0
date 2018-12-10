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

import React, { Component } from "react";
import { Type, Source, Title, Device, Aggregation, Grouping, Interval, Parameter } from "./editComps";
import { Time, Format, ResourceList, KPIcontainer } from "./editComps";

export class FullQuery extends Component {
    render() {
        const { source } = this.props;
        return (
            <div className="chart-query">
                <Title {...this.props} />
                <Type {...this.props} />
                <Source {...this.props} />
                {source === "topology" && <TopologyQuery {...this.props} />}
                {source === "kpi" && <KPIcontainer {...this.props} />}
                {(source === "event" || source === "alarm") && <EventAlarmQuery {...this.props} />}
                {source === "topologyStatic" && <TopologyStaticQuery {...this.props} />}
            </div>
        );
    }
}

export class EventAlarmQuery extends Component {
    render() {
        const { predicates, type } = this.props,
            { interval, dateRange } = predicates;
        return (
            <div className="chart-query">
                <Device {...this.props} />
                <Aggregation {...this.props} />
                <Grouping {...this.props} />
                {/* {aggregation !== "None" && <Grouping {...this.props} />} */}
                <Interval {...this.props} />
                <Parameter {...this.props} />
                <Time {...this.props} />
                {(type === "line" || type === "bar") && interval && dateRange.length !== 0 && (
                    <Format {...this.props} />
                )}
            </div>
        );
    }
}

export const TopologyQuery = props => {
    return (
        <div className="chart-query">
            <Device {...props} />
            <Parameter {...props} />
        </div>
    );
};

export const TopologyStaticQuery = props => {
    return (
        <div className="chart-query">
            <ResourceList {...props} />
        </div>
    );
};
