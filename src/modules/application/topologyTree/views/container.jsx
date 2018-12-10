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
import { connect } from "react-redux";
import "../styles/style.less";
import { CardHeader, Card } from "@material-ui/core";
// import TopologyCont from "./topologyCont";
// import { view as FloatTab } from "modules/application/applicationFloatTab";
import { treeSelect, initTopologyTree } from "../funcs/actions";
// import Card from "@material-ui/core/Card";
// import { view as TopoEnhanceFilter } from "modules/application/applicationEnhanceFilter";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
import { view as TopologyTree } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import { REDUCER_NAME as topoFloatTabReducer } from "modules/application/applicationFloatTab/funcs/constants";
// import ExportComps from "./exportComps";

class Topology extends React.Component {
    state = { needReset: true };

    componentWillMount() {
        this.props.init(this.props.identify);
        // this.props.storeColumnsAndFilters(this.props.identify, this.props.columnConfig, this.props.filterConfig);
        // this.props.autoRefreshInit(this.props.identify);
    }

    componentWillReceiveProps(nextProps) {
        const { refreshTopology, needRefreshTopology } = nextProps;
        const { needReset } = this.state;
        if (
            (this.props.refreshTopology !== refreshTopology && refreshTopology) ||
            (this.props.needRefreshTopology !== needRefreshTopology && needRefreshTopology)
        ) {
            this.setState({ needReset: !needReset });
        }
        // this.props.ccmsControl(this.props.identify);
    }

    onSelect = selectedNode => {
        const { identify } = this.props;
        this.props.onSelect(identify, selectedNode);
    };

    render() {
        const { identify } = this.props;
        const { needReset } = this.state;
        return (
            <Card id="topology-tree-container" className="topology-tree-container" style={{ height: "100%" }}>
                <TopologyTree identify={identify} getSelectNodeFunc={this.onSelect} needReset={needReset} />
            </Card>
        );
    }
}

Topology.propTypes = {
    identify: PropTypes.string
    // columnConfig: PropTypes.array
};

Topology.defaultProps = {
    title: " ",
    identify: "applicationtest"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        title: filterProps(state, identify, topoReducerName, "title") || ownProps.title,
        subTitle: filterProps(state, identify, topoReducerName, "subTitle") || ownProps.subTitle,
        refreshTopology: filterProps(state, identify, topoReducerName, "refreshTopology"),
        needRefreshTopology: filterProps(state, identify, topoFloatTabReducer, "needRefreshTopology"),
        refreshTopologySuccess:
            filterProps(state, identify, topoReducerName, "refreshTopologySuccess") || ownProps.refreshTopologySuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        init: identify => {
            dispatch(initTopologyTree(identify));
        },
        onSelect: (identify, selectedNode) => {
            dispatch(treeSelect(identify, selectedNode));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topology);
