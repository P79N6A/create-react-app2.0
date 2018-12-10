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
import { connect } from "react-redux";
import { changeTab, openFloatTab } from "../funcs/actions";
// import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardContent from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import TopologyList from "./topologyList";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class TopologyTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            currentTab: 0,
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
            currentTab: this.props.defaultTab,
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
        let columnConfig = [];
        if (!checkedTab) {
            columnConfig = this.props.deviceColumnConfig;
        } else {
            columnConfig = this.props.deviceTypeColumnConfig;
        }
        this.props.changeTab(this.props.identify, checkedTab, columnConfig);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.showFloatTab ? true : false;
        return true;
    }

    handleAddButtonClick() {
        this.props.openFloatTab(this.props.identify, "add");
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="topo-tab" style={{ height: "100%" }}>
                <AppBar position="static" className={classes.root}>
                    <Tabs
                        value={this.state.currentTab}
                        onChange={this.tabPaneClick.bind(this)}
                        // indicatorColor="secondary"
                        // textColor="secondary"
                    >
                        {this.state.tabs.map((item, index) => {
                            return <Tab style={{ minWidth: "100px" }} key={index} label={item.tabDisName} />;
                        })}
                        {/* <div style={{ width: "100%", height: "100%", padding: "6px 24px" }}>
                            <Button
                                style={{ float: "right" }}
                                variant="outlined"
                                onClick={this.handleAddButtonClick.bind(this)}
                            >
                                Add Device
                            </Button>
                        </div> */}
                    </Tabs>
                </AppBar>
                <CardContent className="detail-cont" style={{ height: "calc(100% - 48px)" }}>
                    <TopologyList
                        index={0}
                        identify={this.props.identify}
                        columnConfig={this.props.columnConfig}
                        datas={this.props.datas}
                        pagination={this.props.pagination}
                        searchTopoFunc={this.props.searchTopoFunc}
                        multipleSelect={this.props.multipleSelect}
                        checkedTab={this.state.currentTab}
                    />
                </CardContent>
            </div>
        );
    }
}

TopologyTab.propTypes = {
    defaultTab: PropTypes.number.isRequired,
    tabTypes: PropTypes.array.isRequired
};

TopologyTab.defaultProps = {
    defaultTab: 0,
    currentTab: 0,
    tabTypes: ["devices", "deviceType"],
    defaultTabLists: {
        devices: {
            type: "devices",
            icon: "bars",
            tabDisName: "Devices"
        },
        deviceType: {
            type: "deviceType",
            icon: "notification",
            tabDisName: "Device Type"
        }
    },
    deviceColumnConfig: [
        {
            columnName: "Icon",
            defaultSelect: true
        },
        {
            columnName: "Device Name",
            defaultSelect: true
        },
        {
            columnName: "Real World Resource Name",
            defaultSelect: false
        },
        {
            columnName: "Device Type Name",
            defaultSelect: true
        },
        {
            columnName: "Status",
            defaultSelect: true
        },
        {
            columnName: "Application ID / Address ID",
            defaultSelect: true
        },
        {
            columnName: "Parent Device",
            defaultSelect: true
        },
        {
            columnName: "System Resource ID",
            defaultSelect: false
        },
        {
            columnName: "Action",
            defaultSelect: true
        }
    ],
    deviceTypeColumnConfig: [
        {
            columnName: "Icon",
            defaultSelect: true
        },
        {
            columnName: "Device Type Name",
            defaultSelect: true
        },
        {
            columnName: "Device Type",
            defaultSelect: true
        },
        {
            columnName: "Description",
            defaultSelect: true
        },
        {
            columnName: "Action",
            defaultSelect: true
        }
    ]
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentTab:
            state[topoReducerName] && state[topoReducerName][identify] && state[topoReducerName][identify].currentTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTab: (identify, checkedTab, columnConfig) => {
            dispatch(changeTab(identify, checkedTab, columnConfig));
        },
        openFloatTab: (identify, floatTabType) => {
            dispatch(openFloatTab(identify, floatTabType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopologyTab));
