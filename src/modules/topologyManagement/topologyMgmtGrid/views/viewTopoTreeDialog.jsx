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
import { MuiThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { theme } from "modules/theme";
import { view as TopoTree } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import CardContent from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import { TextField } from "modules/common";

class ViewTopoTreeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectAppName: this.props.selectAppName,
            schemaKey: this.props.schemaKey,
            currentDevice: this.props.currentDevice
        };
    }
    handleClose = () => {
        this.props.onClose(this.state.schemaKey, this.state.selectId, this.state.selectAppName);
    };

    getSelectNodeFunc = nodeData => {
        this.setState({
            selectAppName: nodeData.title,
            selectId: nodeData.id
        });
    };

    render() {
        const { onClose, ...other } = this.props;
        // const { selectAppName } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"
                    className="tree-dialog"
                    {...other}
                    id="tree-dialog-view"
                >
                    <Card className="topo-tree-dialog">
                        <CardHeader title={this.props.title} subheader={this.props.subTitle} />
                        <CardContent className="tree-cont">
                            <div className="top-cont" style={{ width: "100%", height: "calc(100% - 70px)" }}>
                                <div className="left-tree">
                                    <TopoTree
                                        identify={this.props.identify}
                                        getSelectNodeFunc={this.getSelectNodeFunc.bind(this)}
                                        treeMode={this.props.treeMode}
                                        needDefaultSelect={this.props.needDefaultSelect}
                                        currentDevice={this.state.currentDevice}
                                    />
                                </div>
                                {/* <div className="right-cont">
                                    <Card className="cont-card" style={{ width: "100%", height: "100%" }}>
                                        <CardContent style={{ height: "100%", padding: "0 24px" }}>
                                            <TextField
                                                label="Application ID"
                                                value={selectAppName || ""}
                                                fullWidth
                                                required={true}
                                                disabled={true}
                                            />
                                        </CardContent>
                                    </Card>
                                </div> */}
                            </div>
                            <div className="stepper-footer">
                                <Button onClick={this.handleClose.bind(this)}>Close</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

ViewTopoTreeDialog.defaultProps = {
    treeMode: "device",
    title: "Tree",
    subTitle: "",
    selectAppName: "",
    needDefaultSelect: true
};

export default ViewTopoTreeDialog;
