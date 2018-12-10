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
import PropTypes from "prop-types";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
import { connect } from "react-redux";
import TopologyCard from "./topologyCard";
// import TopologyListPagination from "./topologyListPagination";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class TopologyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            pagination: this.props.pagination
        };
    }

    componentWillReceiveProps(nextProps) {
        let arrayData = nextProps.datas;
        let pagination = nextProps.pagination;
        if (!arrayData) {
            return;
        }
        this.setState(
            Object.assign(this.state, {
                datas: arrayData,
                pagination: pagination
            })
        );
    }

    render() {
        const { datas } = this.state;
        const { refreshTopologySuccess } = this.props;
        return (
            <div className="topology-grid">
                <div className="topology-grid-wrap">
                    {datas &&
                        datas.map((data, index) => {
                            return <TopologyCard identify={this.props.identify} data={data} key={index} />;
                        })}
                    {!refreshTopologySuccess ? (
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : datas && datas.length > 0 ? null : (
                        <div className="progress-cont">
                            <Typography variant="caption" gutterBottom align="center" className="no-data">
                                No data to display.
                            </Typography>
                        </div>
                    )}
                </div>
                {/* {pagination ? (
                    <TopologyListPagination
                        identify={this.props.identify}
                        pagination={pagination}
                        searchTopoFunc={this.props.searchTopoFunc}
                    />
                ) : null} */}
            </div>
        );
    }
}

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        // selected: filterProps(state, identify, topoReducerName, "multipleSelected"),
        // multipleSelect: filterProps(state, identify, topoReducerName, "multipleSelect"),
        refreshTopologySuccess: filterProps(state, identify, topoReducerName, "refreshTopologySuccess")
    };
};

TopologyTable.propTypes = {
    datas: PropTypes.array,
    pagination: PropTypes.object
};

export default connect(
    mapStateToProps,
    null
)(TopologyTable);
