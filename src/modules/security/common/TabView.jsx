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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { Paper, AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { theme as themes } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
const styles = theme => ({
    root: {
        height: "100%"
    },
    paperRoot: {
        // height: "100%",
        height: 500,
        // padding: themes.spacing.unit * 1.5,
        overflow: "hidden",
        background: theme.palette.background.paper
        // background: themes.palette.primary.main
    },
    tabRoot: {
        padding: theme.spacing.unit * 1.5 + "px 0px 0px!important",
        height: "100%",
        "&>div": {
            height: "100%"
        }
    },
    view: {
        height: "calc(100% - 48px)",
        // overflow: "hidden",
        "&>div": {
            height: "100%"
        }
    }
});

function TabContainer({ children, dir, classes }) {
    return (
        <Typography classes={{ root: classes.tabRoot }} component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

/**
 * TabView component
 * @example
 *
 * @param {array<object>} tabs
 * @returns Component
 */
class TabView extends React.Component {
    state = {
        value: 0
    };
    componentWillReceiveProps(nextProps) {
        const { tabs } = nextProps;
        if (!_.isEqual(tabs, this.props.tabs)) {
            this.setState({
                value: 0
            });
        }
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render() {
        const { classes, tabs, height } = this.props;
        return (
            <Paper className={classes.paperRoot} style={{ height: height || "500" }} elevation={1}>
                <AppBar position="static" color="inherit">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        fullWidth
                    >
                        {tabs.filter(n => n.visible !== false).map(tab => {
                            return <Tab key={tab.label} label={tab.label} />;
                        })}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    className={classes.view}
                    axis={themes.direction === "rtl" ? "x-reverse" : "x"}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    {tabs.filter(n => n.visible !== false).map((tab, i) => {
                        return (
                            <TabContainer key={i} classes={classes} dir={themes.direction}>
                                <div>{tab.view()}</div>
                            </TabContainer>
                        );
                    })}
                </SwipeableViews>
            </Paper>
        );
    }
}
TabView.propTypes = {
    classes: PropTypes.object.isRequired
};
TabView.defaultProps = {};
export default withStyles(styles)(TabView);
