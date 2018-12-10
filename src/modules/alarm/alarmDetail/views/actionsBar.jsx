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
 * Created by SongCheng on 10/18/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
class ActionsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    acknowledge = () => {
        let id = this.props.detail && this.props.detail[0].id;
        let owner = this.props.detail && this.props.detail[0].owner;
        let state = this.props.detail && this.props.detail[0].state;
        this.props.handleAcknowledge(id, owner, state);
    };
    handleExportAlarmData = () => {
        this.props.handleExportAlarmData();
    };
    handleDashboardData = () => {
        this.props.handleDashboardData(this.props.pageKey);
    };

    save = () => {
        this.props.handleEditData();
        this.props.handleDrawerClose();
    };
    cancel = () => {
        this.props.handleDrawerClose();
    };
    render() {
        const { editState, pageKey } = this.props;
        return (
            <CardActions style={{ justifyContent: "flex-end" }}>
                {!editState ? (
                    <div>
                        {/* <Button size="small" color="secondary">
                            Location
                        </Button> */}
                        {pageKey ? (
                            <Button size="small" color="secondary" onClick={this.handleDashboardData}>
                                Dashboard
                            </Button>
                        ) : null}

                        <Button size="small" color="secondary" onClick={this.handleExportAlarmData}>
                            Export
                        </Button>
                        <Button size="small" color="secondary" onClick={this.acknowledge}>
                            Acknowledge
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button size="small" color="secondary" onClick={this.cancel}>
                            Cancel
                        </Button>
                        <Button size="small" color="secondary" onClick={this.save}>
                            Save
                        </Button>
                    </div>
                )}
            </CardActions>
        );
    }
}

export default ActionsBar;
