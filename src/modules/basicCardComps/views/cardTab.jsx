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
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs, { Tab } from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
// import theme from "commons/components/theme";
// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    paper: { background: theme.palette.background.paper },
    appBar: { background: theme.palette.secondary.dark }
});

export class CardTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.getTabs = this.getTabs.bind(this);
    }
    static defaultProps = {
        items: [
            {
                content: <Typography component="div" />,
                label: "item1"
            }
        ]
    };
    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({ label: PropTypes.string, icon: PropTypes.element, content: PropTypes.element.isRequired })
        ).isRequired
    };
    handleChange(evt, value) {
        this.setState({ value });
    }
    getTabs() {
        return this.props.items && this.props.items.map((item, index) => <Tab label={item.label} icon={item.icon} />);
    }
    getContent() {
        let result;
        const { classes, items } = this.props;
        items &&
            items.forEach((item, index) => {
                result =
                    this.state.value === index && item.content ? (
                        <Paper classes={{ root: classes.paper }}>{item.content}</Paper>
                    ) : (
                        result
                    );
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="tabBar">
                <AppBar position="static" classes={{ root: classes.appBar }}>
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        {this.getTabs()}
                    </Tabs>
                </AppBar>
                {this.getContent()}
            </div>
        );
    }
}

export default withStyles(styles)(CardTab);
