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
import PropTypes from "prop-types";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { getTopoEvents, setFloatTabTitle } from "../funcs/actions";
import CommonTablePagination from "./commonTablePagination";
import Typography from "@material-ui/core/Typography";
import { reducerName as topoReducerName } from "modules/topology/topologyGrid";
import DataGridView from "./dataGridView";
import CardContent from "@material-ui/core/CardContent";

class EventGrid extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.index !== parseInt(nextProps.currentTab, 10) ||
            nextProps.getEventSuccess ||
            !nextProps.showFloatTab
        ) {
            return;
        }
        this.searchDeviceEvents(nextProps);
    }
    componentDidMount() {
        this.searchDeviceEvents(this.props);
    }

    searchDeviceEvents(props) {
        let iotId = props.iotId;
        if (!iotId) {
            return;
        }
        this.props.setFloatTabTitle(props.identify, "Device Related Events");
        let orderOpt = this.orderOpt(props.eventOrderBy, props.eventOrderDisplayName, props.eventOrderDirection);
        this.props.getTopoEvents(iotId, props.pageNo, props.pageLimit, props.identify, orderOpt);
    }

    searchEvents(pageNo, pageLimit) {
        let iotId = this.props.iotId;
        let orderOpt = this.orderOpt(
            this.props.eventOrderBy,
            this.props.eventOrderDisplayName,
            this.props.eventOrderDirection
        );
        this.props.getTopoEvents(iotId, pageNo, pageLimit, this.props.identify, orderOpt);
    }

    sortDataFunc(orderBy, orderDisplayName, orderDirection) {
        let iotId = this.props.iotId;
        let pageNo = this.props.eventPagination.currentpage;
        let pageLimit = this.props.eventPagination.limit;
        let orderOpt = this.orderOpt(orderBy, orderDisplayName, orderDirection);
        this.props.getTopoEvents(iotId, pageNo, pageLimit, this.props.identify, orderOpt);
    }

    orderOpt(orderBy, orderDisplayName, orderDirection) {
        let ascending = orderDirection === "asc" ? true : false;
        return {
            eventOrderBy: orderBy,
            eventOrderDisplayName: orderDisplayName,
            eventOrderDirection: orderDirection,
            ascending: ascending
        };
    }

    renderEventLists() {
        let events = this.props.events;
        let eventPagination = this.props.eventPagination;
        let datas = events;
        return (
            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="tab-list-wrap">
                    <CardContent style={{ height: "100%", overflowY: "auto", padding: "2px" }}>
                        {datas &&
                            datas.map((data, index) => {
                                return <DataGridView type="event" data={data} key={index} />;
                            })}
                        {datas && datas.length > 0 ? null : (
                            <Typography variant="caption" gutterBottom align="center" className="no-data">
                                No data to display.
                            </Typography>
                        )}
                    </CardContent>
                </div>
                {eventPagination ? (
                    <CommonTablePagination
                        identify={this.props.identify}
                        pagination={eventPagination}
                        searchType="event"
                        searchEvents={this.searchEvents.bind(this)}
                    />
                ) : null}
            </div>
        );
    }

    render() {
        return <div className="topo-event">{this.props.events && this.renderEventLists()}</div>;
    }
}

EventGrid.propTypes = {
    pageNo: PropTypes.number,
    pageLimit: PropTypes.number
};

EventGrid.defaultProps = {
    pageNo: 1,
    pageLimit: 10,
    configMapping: "eventColumnConfig",
    eventColumnConfig: [
        {
            columnName: "Severity",
            defaultSelect: true
        },
        {
            columnName: "Sentdatetime",
            defaultSelect: true
        },
        {
            columnName: "Eventtype",
            defaultSelect: true
        },
        {
            columnName: "Source",
            defaultSelect: true
        },
        {
            columnName: "Senderid",
            defaultSelect: true
        },
        {
            columnName: "Note",
            defaultSelect: true
        }
    ]
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        resourcePath: filterProps(state, identify, topoFloatTabReducer, "resourcePath"),
        iotId: filterProps(state, identify, topoFloatTabReducer, "deviceId"),
        events: filterProps(state, identify, topoFloatTabReducer, "events"),
        getEventSuccess: filterProps(state, identify, topoFloatTabReducer, "getEventSuccess"),
        eventPagination: filterProps(state, identify, topoFloatTabReducer, "eventPagination"),
        showFloatTab: filterProps(state, identify, topoReducerName, "showFloatTab")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopoEvents: (iotId, pageNo, pageLimit, identify, orderOpt) => {
            dispatch(getTopoEvents(iotId, pageNo, pageLimit, identify, orderOpt));
        },
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventGrid);
