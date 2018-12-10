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
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { view as TreeViews } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import { view as GraphViews } from "modules/topologyTreeAndGraph/topologyGraph";
import SplitPane from "react-split-pane";
// import TopoTree from "./topoTree";
import CardHeader from "@material-ui/core/CardHeader";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Card from "@material-ui/core/Card";
import { view as FloatTabCont } from "modules/topologyTreeAndGraph/topologyFloatTab";
import { openFloatTab, closeFloatTab } from "../funcs/actions";
import { FullScreenButton } from "modules/ccms/components";
import { reducerName as topoTreeGraphReducerName } from "modules/topologyTreeAndGraph/topologyCont";

const drawerWidth = 400;
const styles = theme => ({
    paper: {
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        transform: `translate(${drawerWidth}px, 0px)`,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    }
});

class TopoTreeAndGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            needReset: this.props.needReset
        };
    }

    componentWillMount() {
        let selectApplication = this.props.currentApplicationInfo;
        let selectAppRespath = (selectApplication && selectApplication["address.resourcePath"]) || "";
        let selectAppId = selectApplication && selectApplication["address.iotTopologyId"];
        this.setState({
            selectAppId: selectAppId,
            selectAppRespath: selectAppRespath
        });
    }

    handleResetClick() {
        // this.props.topoTreeReset(this.props.identify);
        this.setState({
            needReset: !this.state.needReset
        });
    }

    handleFloatTabOpen() {
        this.props.openFloatTab(this.props.identify);
    }

    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }

    render() {
        const { containerType } = this.props;
        return (
            <Card
                className="topo-tree-graph-cont"
                style={{
                    // backgroundColor: Theme.palette.primary.light,
                    overflowX: "hidden",
                    position: "relative",
                    height: "100%"
                }}
            >
                <CardHeader
                    action={
                        <div>
                            {containerType !== "onlyShowGraph" ? (
                                <div className="right-item">
                                    <Tooltip title="Reset">
                                        <IconButton aria-label="Reset" onClick={this.handleResetClick.bind(this)}>
                                            <RefreshIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            ) : null}
                            {containerType === "onlyShowGraph" ? (
                                <div className="right-item">
                                    <FullScreenButton {...this.props} />
                                </div>
                            ) : null}
                        </div>
                    }
                    title={this.props.title}
                />
                {containerType === "showTreeGraph" ? (
                    <div>
                        <SplitPane split="vertical" minSize={350} maxSize={800}>
                            <div style={{ height: "calc(100% - 72px)" }}>
                                <TreeViews
                                    identify={this.props.identify}
                                    needReset={this.state.needReset}
                                    treeMode={this.props.treeMode}
                                    selectAppId={this.state.selectAppId}
                                    selectAppRespath={this.state.selectAppRespath}
                                />
                            </div>
                            <GraphViews
                                identify={this.props.identify}
                                handleFloatTabOpen={this.handleFloatTabOpen.bind(this)}
                            />
                        </SplitPane>
                        <FloatTabCont
                            identify={this.props.identify}
                            handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                        />
                    </div>
                ) : containerType === "onlyShowTree" ? (
                    <div style={{ height: "calc(100% - 72px)" }}>
                        <TreeViews
                            identify={this.props.identify}
                            needReset={this.state.needReset}
                            treeMode={this.props.treeMode}
                            selectAppId={this.state.selectAppId}
                            selectAppRespath={this.state.selectAppRespath}
                        />
                    </div>
                ) : (
                    <div style={{ height: "100%" }}>
                        <GraphViews
                            identify={this.props.identify}
                            handleFloatTabOpen={this.handleFloatTabOpen.bind(this)}
                        />
                        <FloatTabCont
                            identify={this.props.identify}
                            handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                        />
                    </div>
                )}
            </Card>
        );
    }
}

TopoTreeAndGraph.propTypes = {};

TopoTreeAndGraph.defaultProps = {
    title: "Topology Tree and Graph",
    identify: "Topology Tree and Graph",
    needReset: false,
    treeMode: "device",
    containerType: "showTreeGraph"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        title: filterProps(state, identify, topoTreeGraphReducerName, "title") || ownProps.title
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openFloatTab: identify => {
            dispatch(openFloatTab(identify));
        },
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopoTreeAndGraph));
