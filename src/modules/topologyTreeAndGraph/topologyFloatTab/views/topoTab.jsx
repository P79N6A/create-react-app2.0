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
import AlarmGrid from "./alarmGrid";
import EventGrid from "./eventGrid";
// import MapView from "./mapView";
import { connect } from "react-redux";
import { changeTab } from "../funcs/actions";
import { REDUCER_NAME as topoGraphFloatTabReducer } from "../funcs/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeviceDetailList from "./deviceDetailList";
import CardContent from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class FloatTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            currentTab: "",
            anchor: "right"
        };
    }

    componentDidMount() {
        if (!this.props.tabTypes) {
            return;
        }
        let tabs = [];
        this.props.tabTypes.map((item, index) => {
            if (this.props.defaultTabLists[item]) {
                tabs.push(this.props.defaultTabLists[item]);
            }
            return null;
        });
        this.setState({
            currentTab: tabs[this.props.defaultTab].type,
            tabs: tabs
        });
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.tabTypes) {
            return;
        }
        let tabs = [];
        this.props.tabTypes.map((item, index) => {
            if (this.props.defaultTabLists[item]) {
                tabs.push(this.props.defaultTabLists[item]);
            }
            return null;
        });
        this.setState({
            currentTab: newProps.currentTab,
            tabs: tabs
        });
    }

    tabPaneClick(event, checkedTab) {
        this.props.changeTab(checkedTab, this.props.identify);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showFloatTab ? true : false;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="topo-tab">
                <AppBar position="static" className={classes.root}>
                    <Tabs
                        value={this.state.currentTab}
                        onChange={this.tabPaneClick.bind(this)}
                        indicatorColor="secondary"
                        textColor="secondary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {this.state.tabs.map((item, index) => {
                            return <Tab style={{ minWidth: "100px" }} key={index} label={item.tabDisName} />;
                        })}
                    </Tabs>
                </AppBar>
                <CardContent className="detail-cont">
                    {this.state.currentTab === 0 ? <DeviceDetailList index={0} {...this.props} /> : null}
                    {this.state.currentTab === 1 ? <AlarmGrid index={1} {...this.props} /> : null}
                    {this.state.currentTab === 2 ? <EventGrid index={2} {...this.props} /> : null}
                </CardContent>
            </div>
        );
    }
}

FloatTab.propTypes = {
    defaultTab: PropTypes.number.isRequired,
    tabTypes: PropTypes.array.isRequired
};

FloatTab.defaultProps = {
    title: "Detail Tab",
    showFloatTab: false,
    defaultTab: 0,
    currentTab: 0,
    tabTypes: ["detail", "alarm", "event"],
    defaultTabLists: {
        detail: {
            type: "detail",
            icon: "bars",
            tabDisName: "Details"
        },
        alarm: {
            type: "alarm",
            icon: "notification",
            tabDisName: "Alarms"
        },
        event: {
            type: "event",
            icon: "star-o",
            tabDisName: "Events"
        },
        map: {
            type: "location",
            icon: "environment-o",
            tabDisName: "Map"
        },
        chart: {
            type: "chart",
            icon: "bar-chart",
            tabDisName: "Chart"
        }
    },
    alarmOrderBy: "severity",
    alarmOrderDirection: "asc",
    alarmOrderDisplayName: "Severity",
    eventOrderBy: "severity",
    eventOrderDirection: "asc",
    eventOrderDisplayName: "Severity"
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentTab:
            state[topoGraphFloatTabReducer] &&
            state[topoGraphFloatTabReducer][identify] &&
            state[topoGraphFloatTabReducer][identify].currentTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTab: (checkedTab, idenfity) => {
            dispatch(changeTab(checkedTab, idenfity));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FloatTab));
