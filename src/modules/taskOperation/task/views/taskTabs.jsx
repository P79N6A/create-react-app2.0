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
 * Created by Chen Ling on 15/10/2018.
 */
import React, {Component} from "react";
// import PropTypes from "prop-types";
// import { view as WorkFlowGraph } from "modules/workFlow/workflow";
// import Task from "./task";
import { withStyles } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import "../styles/container.less";
import { I18n } from "react-i18nify";
const styles = theme => ({
    appBarroot: {
        "& button": {
            flexGrow: 0,
            minWidth: "100px"
        }
    }
});
class TaskTabs extends Component {
    render() {
        const { classes, tabValue } = this.props;
        // console.log(checkTask);
        return (
            <AppBar position="static" color="inherit">
                <Tabs
                    value={tabValue}
                    onChange={this.props.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    className={classes.appBarroot}
                    fullWidth
                >
                    <Tab label={I18n.t("workflow.task.taskTabName")} disabled={false} />
                    {/* <Tab label={I18n.t("workflow.task.BackgroundJobName")} disabled={false} /> */}
                </Tabs>
            </AppBar>
        );
    }
}
export default withStyles(styles)(TaskTabs);