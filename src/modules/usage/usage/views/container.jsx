import React from "react";
import { connect } from "react-redux";
import { getDeviceCount, getEventsCount, getAcountsList, passAccountID } from "../funcs/actions";
import { SearchSelect } from "../../../common/index";
import { Search, REDUCER_NAME } from "../funcs/constants";
import { withStyles } from "@material-ui/core/styles";
import "../styles/style.less";
import theme from "commons/components/theme";

import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { DeviceView } from "modules/usage/devices";
import { EventsView } from "modules/usage/events";
import { SmsView } from "modules/usage/sms";
import { EmailView } from "modules/usage/email";
import { UsersView } from "modules/usage/users";
import { reducerName as themeReducer } from "modules/theme";
// import Card from "@material-ui/core/Card";

import PropTypes from "prop-types";

// import { RangePicker } from "modules/common";

import _ from "lodash";

let userId = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER")).accountid || {};
const styles = {
    paper: {
        backgroundColor: theme.palette.background.paper,

        height: "100%",
        // padding: themes.spacing.unit * 1.5,
        overflow: "hidden"
    }
    // ,
    // TabBgColor:{
    //     backgroundColor: this.props.MuiTheme.palette.background.paper
    // }
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ paddingTop: 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class Usage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countData: "",
            accountsData: "",
            statusDatas: Search.statusDatas,
            value: "0",
            accounts: []
        };
    }
    componentDidMount() {
        this.props.getDeviceData();
        this.props.getEventsData();
        this.props.getAcountsList();
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };
    SelecthandleChange = (event, value) => {
        // console.log("event", event);
        // console.log("event value", value);
        this.props.passAccountID(event.value);
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.countDeviceData) {
            this.setState({
                countDeviceData: JSON.stringify(nextProps.countDeviceData)
            });
        }
        if (nextProps.countEventsData) {
            this.setState({
                countEventsData: JSON.stringify(nextProps.countEventsData)
            });
        }
        if (nextProps.accountsData) {
            this.setState({
                accountsData: JSON.stringify(nextProps.accountsData)
            });
        }
    };

    handleSelectClick(event) {
        // console.log("selected event", event);

        this.setState(
            Object.assign(this.state, {
                // currentSelect: devicetypeId
            })
        );
    }

    render() {
        const { classes, countData, accountsData } = this.props;

        const { value } = this.state;
        // console.log("countData", countData);

        let opts = _.map(accountsData, item => {
            return {
                value: item.id,
                label: item.displayname
            };
        });
        return (
            <div className="master-container">
                <div className="meterSelection-container">
                    {userId === "Default" ? (
                        <div className="filter-teanat">
                            <SearchSelect
                                className="searchSelect"
                                // onSearch={this.handleSearch.bind(this)}
                                placeholder="Select Tenant"
                                onChange={this.SelecthandleChange.bind(this)}
                                defaultValue={"Default"}
                                // label="Select Tenant"
                                selectProps={{
                                    isLoading: false,
                                    multi: false,
                                    openOnFocus: true
                                }}
                                options={opts}
                            />
                        </div>
                    ) : null}
                </div>
                <div className="meterTab-container">
                    <AppBar position="static" color="inherit">
                        <Tabs
                            value={value}
                            onChange={this.handleTabChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab value="0" label="Devices" />
                            <Tab value="1" label="Events" />
                            <Tab value="2" label="SMS" />
                            <Tab value="3" label="Email" />
                            <Tab value="4" label="Users" />
                        </Tabs>
                    </AppBar>

                    {value === "0" && (
                        <TabContainer>
                            <DeviceView />
                        </TabContainer>
                    )}
                    {value === "1" && (
                        <TabContainer>
                            <EventsView />
                        </TabContainer>
                    )}
                    {value === "2" && (
                        <TabContainer>
                            <SmsView />
                        </TabContainer>
                    )}
                    {value === "3" && (
                        <TabContainer>
                            <EmailView />
                        </TabContainer>
                    )}
                    {value === "4" && (
                        <TabContainer>
                            <UsersView />
                        </TabContainer>
                    )}
                </div>
            </div>
        );
    }
}
Usage.propTypes = {
    classes: PropTypes.object.isRequired
};

Usage.defaultProps = {
    deviceData: []
};

const mapStateToProps = (state, ownProps) => {
    return {
        // state[REDUCER_NAME] || {};
        countDeviceData: state[REDUCER_NAME] && state[REDUCER_NAME].countDeviceData,
        countEventsData: state[REDUCER_NAME] && state[REDUCER_NAME].countEventsData,
        accountsData: state[REDUCER_NAME] && state[REDUCER_NAME].accountsData,
        MuiTheme: state && state[themeReducer] && state[themeReducer].MuiTheme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAcountsList: () => {
            dispatch(getAcountsList());
        },
        getEventsData: () => {
            dispatch(getEventsCount());
        },
        getDeviceData: () => {
            dispatch(getDeviceCount());
        },
        passAccountID: passedAccountVal => {
            dispatch(passAccountID(passedAccountVal));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Usage));
