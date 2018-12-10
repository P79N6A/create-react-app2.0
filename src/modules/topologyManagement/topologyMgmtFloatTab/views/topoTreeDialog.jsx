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
 * Created by xulu on 18/10/2018.
 */

import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { view as TopoTree } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import CardContent from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import { TextField } from "modules/common";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddAppInTreeDialog from "./addAppInTreeDialog";
import RefreshIcon from "@material-ui/icons/Refresh";
import { actions as message } from "modules/messageCenter";
import { connect } from "react-redux";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
class TopoTreeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectAppName: this.props.selectAppName,
            schemaKey: this.props.schemaKey,
            addAppMode: false,
            needReset: false,
            selectAppId: this.props.selectAppId,
            selectAppRespath: this.props.selectAppRespath
        };
    }

    handleClose = () => {
        this.setState({
            selectAppName: "",
            selectId: "",
            selectResourcetype: "",
            selectedData: "",
            addAppMode: false
        });
        this.props.onClose();
        // this.props.onClose(this.state.schemaKey, this.state.selectId, this.state.selectAppName);
    };

    handleFinishClose = () => {
        this.setState({
            addAppMode: false
        });
        if (!this.state.selectedData) {
            this.props.onClose();
            return;
        }
        if (this.state.selectedData.resourcetype === "root") {
            this.props.warn("Can't select root node as application.", this.props.identify);
        } else if (this.state.selectedData.resourcetype === "devices") {
            this.props.warn("Can't select device node as application.", this.props.identify);
        } else {
            this.props.onClose(this.state.schemaKey, this.state.selectId, this.state.selectAppName);
            this.setState({
                selectAppName: "",
                selectId: "",
                selectResourcetype: "",
                selectedData: ""
            });
        }
    };

    getSelectNodeFunc = nodeData => {
        if (nodeData) {
            this.setState({
                selectAppName: nodeData.title,
                selectId: nodeData.id,
                selectResourcetype: nodeData.resourcetype,
                selectedData: nodeData
            });
        } else {
            this.setState({
                selectAppName: "",
                selectId: "",
                selectResourcetype: "",
                selectedData: ""
            });
        }
    };

    handleBackTree = () => {
        this.setState({
            addAppMode: false
        });
    };

    handleAddClick = () => {
        if (!this.state.selectedData) {
            this.props.warn("Please select Application or Address.", this.props.identify);
        } else {
            this.setState({
                selectedData: this.state.selectedData,
                addAppMode: true
            });
        }
    };

    handleResetClick() {
        this.setState({
            needReset: !this.state.needReset
        });
    }

    render() {
        const { onClose, createTitle, title, ...other } = this.props;
        const { selectedData, addAppMode } = this.state;
        const height = !addAppMode ? "calc(100% - 70px)" : "100%";
        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                className="tree-dialog"
                {...other}
                id="tree-dialog"
            >
                <Card className="topo-tree-dialog">
                    <CardHeader
                        action={
                            !addAppMode ? (
                                <div>
                                    <div className="right-item">
                                        <Tooltip title="Add">
                                            <IconButton aria-label="Add" onClick={this.handleAddClick.bind(this)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="right-item">
                                        <Tooltip title="Reset">
                                            <IconButton aria-label="Reset" onClick={this.handleResetClick.bind(this)}>
                                                <RefreshIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )
                        }
                        title={!addAppMode ? title : createTitle}
                        subheader={this.props.subTitle}
                    />
                    <CardContent className="tree-cont">
                        <div className="top-cont" style={{ width: "100%", height: height }}>
                            {!addAppMode ? (
                                <TopoTree
                                    identify={this.props.identify}
                                    getSelectNodeFunc={this.getSelectNodeFunc.bind(this)}
                                    treeMode={this.props.treeMode}
                                    needDefaultSelect={this.props.needDefaultSelect}
                                    needReset={this.state.needReset}
                                    selectAppId={this.state.selectAppId}
                                    selectAppRespath={this.state.selectAppRespath}
                                    disableSearch={false}
                                />
                            ) : (
                                <AddAppInTreeDialog
                                    selectedData={selectedData}
                                    identify={this.props.identify}
                                    showFloatTab={this.props.showFloatTab}
                                    handleFloatTabClose={this.props.handleFloatTabClose}
                                    handleBackTree={this.handleBackTree.bind(this)}
                                />
                            )}
                        </div>
                        {!addAppMode ? (
                            <div className="stepper-footer">
                                <Button onClick={this.handleFinishClose.bind(this)}>Finish</Button>
                            </div>
                        ) : (
                            ""
                        )}
                    </CardContent>
                </Card>
            </Dialog>
        );
    }
}

TopoTreeDialog.defaultProps = {
    treeMode: "address",
    title: "Select Application / Address",
    createTitle: "Create application / Address",
    subTitle: "",
    selectAppName: "",
    needDefaultSelect: true
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        selectApplication: filterProps(state, identify, topoReducerName, "selectApplication")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        warn: (msg, module) => {
            dispatch(message.warn(msg, module));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopoTreeDialog);
