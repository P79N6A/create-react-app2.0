import React from "react";
import { connect } from "react-redux";
import {
    getUsersDataFromAPI,
    getOneWeekUsersDataFromAPI,
    getOneMonthUsersDataFromAPI,
    getSixMonthsUsersDataFromAPI,
    getOneYearUsersDataFromAPI
} from "../funcs/actions";
import { Search, REDUCER_NAME as reducerName } from "../funcs/constants";

import Typography from "@material-ui/core/Typography";
//Pagination
import { TablePagination } from "modules/common";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";

// import CardContent from "@material-ui/core/Card";

import Card from "@material-ui/core/Card";

import StateCount from "modules/dashboardLibrary/views/stateCount";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import Fade from "@material-ui/core/Fade";

import "font-awesome/css/font-awesome.css";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import "../styles/style.less";

import moment from "moment";

import _ from "lodash";
import classnames from "classnames";

import TextField from "@material-ui/core/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import ReactEcharts from "echarts-for-react";

// imports for Radio button
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import { REDUCER_NAME as usageReducerName } from "modules/usage/usage/funcs/constants";

import { reducerName as themeReducer } from "modules/theme";

let userId = {};

const styles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        height: "100%",
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        display: "flex",
        flexWrap: "wrap",
        height: "100%",
        backgroundColor: theme.palette.background.paper
    },

    formControl: {
        margin: theme.spacing.unit * 3
    }
});

/* Total device Count */
const ShowStatistics = ({ statusUsersDatas, animate }) => {
    return statusUsersDatas.map((item, index) => {
        let { totalCount } = {};
        if (item.count) {
            totalCount = item.count.users.totalCount;
        } else {
            totalCount = "0";
        }
        return <StateCount key={index} icon={item.icon} status={item.status} count={totalCount} />;
    });
};

const UsersList = props => {
    let { users } = props;
    return _.map(users, item => {
        return (
            <TableRow>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.count}</TableCell>
            </TableRow>
        );
    });
};

const LineChart = props => {
    let { users, theme } = props;
    const textColor = theme.typography.display1.color;
    const backgroundColor = theme.palette.background.paper;

    let result = {
        xList: [],
        seriesData: []
    };

    result.seriesData = _.map(users, n => n["count"]);
    let getDates = _.map(users, n => n["date"]);
    result.xList = _.map(getDates, n => moment(n).format("DD/MM/YY"));

    let checkMaxData = Math.max(...result.seriesData);
    let setxAxisMax = "";
    if (checkMaxData <= 5) {
        setxAxisMax = 5;
    } else {
        setxAxisMax = checkMaxData;
    }

    const option = {
        title: {
            text: "",
            color: textColor
            // color: "#fff"
        },
        color: "#ffd230",
        tooltip: {},
        legend: {
            data: ["Users Count"],
            textStyle: {
                color: textColor
                // color: "#fff"
            },
            pageTextStyle: {
                color: textColor
                // color: "#fff"
            }
        },
        xAxis: {
            data: result.xList,
            name: "Date"
        },
        textStyle: {
            color: textColor
            // color: "#fff"
        },
        yAxis: {
            name: "Users",
            max: setxAxisMax
        },
        series: [
            {
                name: "Users Count",
                type: "bar",
                barWidth: 50,
                data: result.seriesData,
                label: {
                    normal: {
                        show: true,
                        position: "top"
                    }
                }
            }
        ]
    };

    return (
        <ReactEcharts
            option={option}
            notMerge
            lazyUpdate
            className="chart-allWh"
            theme={theme === "default" ? "" : theme}
        />
    );
};

class Users extends React.Component {
    static defaultProps = {
        totalItems: 0,
        page: 1,
        limit: 10,
        rowsPerPage: 10
    };
    constructor(props) {
        super(props);

        this.state = {
            users: "No Users",
            startTime: moment().format("YYYY-MM-DD"),
            endTime: moment().format("YYYY-MM-DD"),
            isClick: false,
            selectedUserId: "",
            expanded: false,
            customTimeRange: false,
            btnValue: "Last Week",
            customStartDate: "",
            customEndDate: "",
            statusUsersDatas: Search.statusUsersDatas,
            page: "",
            rowsPerPage: "",
            usersPagination: {
                page: this.props.page,
                limit: this.props.limit
            }
        };
        // this.handleDateTime = this.handleDateTime.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.passedAccountVal !== this.props.passedAccountVal) {
            this.setState({ selectedUserId: nextProps.passedAccountVal });
            // console.log(this.state);
            this.Applyfilter();
        }
        this.setState({ currentDate: new Date() });
        if (_.isEqual(nextProps.users, this.props.users)) {
            return;
        }
        if (nextProps.usersPagination) {
            this.setState({
                usersPagination: nextProps.usersPagination
            });
        }

        if (nextProps.oneWeekusers) {
            this.setState({
                oneWeekusers: JSON.stringify(nextProps.oneWeekusers)
            });
        }

        if (nextProps.oneMonthusers) {
            this.setState({
                oneMonthusers: JSON.stringify(nextProps.oneMonthusers)
            });
        }
        if (nextProps.sixMonthsusers) {
            this.setState({
                sixMonthsusers: JSON.stringify(nextProps.sixMonthsusers)
            });
        }

        if (nextProps.oneYearusers) {
            this.setState({
                oneYearusers: JSON.stringify(nextProps.oneYearusers)
            });
        }

        if (nextProps.today !== this.props.today) {
        }
    }
    //handle page
    handleChangePage = (event, page) => {
        let setCurrentPage = "";

        this.setState({
            checkPage: page
        });

        if (page < this.state.checkPage) {
            setCurrentPage = page;
        } else {
            setCurrentPage = this.state.usersPagination.currentpage;
        }

        let rowsPerPage = this.props.usersPagination.limit;
        this.setState({ rowsPerPage: rowsPerPage, page: setCurrentPage + 1 }, () => {
            this.Applyfilter();
        });
    };

    // handle RowsPerPage
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value, page: this.state.usersPagination.currentpage }, () => {
            // this.handleSearchCriteria();
            this.Applyfilter();
        });
    };
    handleChange = event => {
        this.setState({ btnValue: event.target.value });
        if (event.target.value === "Custom") {
            this.setState({
                customTimeRange: true
            });
        } else {
            this.setState({
                customTimeRange: false
            });
        }
    };

    Applyfilter = event => {
        let today = new Date();
        let OneWeekDays = "7";
        let OneMonthDays = "30";
        // let SixMonthDays = "180";
        let OneYearDays = "365";
        let endTime = "";
        let setPage = "";
        let setRowPerPage = "";

        let lastOneWeek = moment(new Date(today.getTime() - OneWeekDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        let lastOneMonth = moment(new Date(today.getTime() - OneMonthDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        // let lastSixMonths = moment(new Date(today.getTime() - SixMonthDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        let lastOneYear = moment(new Date(today.getTime() - OneYearDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");

        let currentTime = moment(today).format("YYYY-MM-DD");

        if (this.state.selectedUserId) {
            userId = this.state.selectedUserId;
        } else {
            userId = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER")).accountid || {};
        }

        switch (this.state.btnValue) {
            case "Last Week":
                endTime = lastOneWeek;
                break;
            case "Last Month":
                endTime = lastOneMonth;
                break;
            case "Last Year":
                endTime = lastOneYear;
                break;
            case "Custom":
                currentTime = this.state.customStartDate;
                endTime = this.state.customEndDate;

                break;
            default:
                break;
        }

        if (this.state.page === (undefined || "")) {
            setPage = this.state.usersPagination.page || this.state.usersPagination.currentpage;
        } else {
            setPage = this.state.page;
        }

        if (this.state.rowsPerPage === (undefined || "")) {
            setRowPerPage = this.state.usersPagination.limit;
        } else {
            setRowPerPage = this.state.rowsPerPage;
        }

        if (this.state.usersPagination.currentpage === 0) {
            setPage = this.state.usersPagination.page;
            // setRowPerPage = "10";
        }
        // if(this.state.usersPagination.currentpage === (0 || undefined) && this.state.usersPagination.limit === (0 || undefined) ){
        // if (
        //     (this.state.usersPagination.currentpage === 0 || this.state.usersPagination.currentpage === undefined) &&
        //     (this.state.usersPagination.limit === 0 || this.state.usersPagination.limit === undefined)
        // ) {
        //     setPage = "1";
        //     setRowPerPage = "10";
        // }

        this.props.getUsersDataFromAPI(userId, currentTime, endTime, setPage, setRowPerPage);
        this.setState({ expanded: false });
    };
    cancelFilter = () => {
        this.setState({ expanded: false });
    };

    handleOpen = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    handleStartDate = event => {
        this.setState({ customStartDate: event.target.value });
    };
    handleEndDate = event => {
        this.setState({ customEndDate: event.target.value });
    };

    componentDidMount() {
        const { page, rowsPerPage } = this.props;
        let today = new Date();
        let OneWeekDays = "7";
        let OneMonthDays = "30";
        let SixMonthDays = "180";
        let OneYearDays = "365";
        let endTime = moment(new Date(today.getTime() - OneWeekDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        // let lastOneWeek = moment(new Date(today.getTime() - OneWeekDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        let lastOneMonth = moment(new Date(today.getTime() - OneMonthDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        let lastSixMonths = moment(new Date(today.getTime() - SixMonthDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        let lastOneYear = moment(new Date(today.getTime() - OneYearDays * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");

        let currentTime = moment(today).format("YYYY-MM-DD");

        if (this.state.selectedUserId) {
            userId = this.state.selectedUserId;
        } else {
            userId = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER")).accountid || {};
        }

        // this.props.getOneWeekUsersDataFromAPI(userId, currentTime, lastOneWeek);
        this.props.getUsersDataFromAPI(userId, currentTime, endTime, page, rowsPerPage);
        this.props.getOneMonthUsersDataFromAPI(userId, currentTime, lastOneMonth, page, rowsPerPage);
        this.props.getSixMonthsUsersDataFromAPI(userId, currentTime, lastSixMonths, page, rowsPerPage);
        this.props.getOneYearUsersDataFromAPI(userId, currentTime, lastOneYear, page, rowsPerPage);
    }

    render() {
        const {
            users,
            // oneWeekevents,
            oneMonthusers,
            sixMonthsusers,
            oneYearusers,
            classes,
            totalItems
        } = this.props;
        const { statusUsersDatas } = this.state;
        const rowsPerPage = this.state.usersPagination.limit;
        const page = this.state.usersPagination.page || this.state.usersPagination.currentpage;

        const statususersData = [
            { status: "Current Month", count: oneMonthusers, icon: statusUsersDatas["0"].icon },
            { status: "Last 6 Months", count: sixMonthsusers, icon: statusUsersDatas["0"].icon },
            { status: "Current Year", count: oneYearusers, icon: statusUsersDatas["0"].icon }
        ];
        return (
            <Card>
                <div className="meterCount-container">
                    <div clclassNameass="meterCountSection">
                        <div className="meterCountLeftSub">
                            <div className={classnames(classes.leftBox, "headerCount")}>
                                <ShowStatistics
                                    statusUsersDatas={statususersData}
                                    animate={!!statusUsersDatas.length}
                                />
                            </div>
                        </div>
                        <div className="meterCountRightSub">{/* right side */}</div>
                    </div>
                </div>
                <div className="meterData-container">
                    <div className="meterChartDataSection">
                        {users && users.users.period.length ? (
                            // <usersList users={users.users.period} />
                            <LineChart users={users.users.period} theme={this.props.MuiTheme} />
                        ) : (
                            <Typography variant="caption" gutterBottom align="center">
                                No Charts...
                            </Typography>
                        )}
                    </div>

                    <div className="meterTableDataSection">
                        <Card>
                            <Fade
                                className="fadeBox"
                                in={this.state.expanded}
                                {...(this.state.expanded
                                    ? { style: { display: "block" } }
                                    : { style: { display: "none" } })}
                            >
                                <Card className="filterButtons">
                                    <Typography className={classes.title} color="textSecondary">
                                        Time Range
                                    </Typography>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender"
                                        className={classes.group}
                                        value={this.state.btnValue}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel
                                            value="Last Week"
                                            control={<Radio />}
                                            label="Last Week"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="Last Month"
                                            control={<Radio />}
                                            label="Last Month"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="Last Year"
                                            control={<Radio />}
                                            label="Last Year"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="Custom"
                                            control={<Radio />}
                                            label="Custom"
                                            labelPlacement="start"
                                            // onChange={this.handleOpenDatePicker}
                                        />
                                    </RadioGroup>
                                    <Fade
                                        className="fadeDatePickerBox"
                                        in={this.state.customTimeRange}
                                        {...(this.state.customTimeRange
                                            ? { style: { display: "block" } }
                                            : { style: { display: "none" } })}
                                    >
                                        <div className="customeDatePicker">
                                            <div>
                                                <TextField
                                                    id="date"
                                                    label="Start Date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    onChange={this.handleStartDate.bind(this)}
                                                />
                                            </div>
                                            <div>
                                                <TextField
                                                    id="date"
                                                    label="End Date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    onChange={this.handleEndDate.bind(this)}
                                                />
                                            </div>
                                        </div>
                                    </Fade>

                                    <div className="actonBtns">
                                        <Button size="small" color="secondary" onClick={this.cancelFilter.bind(this)}>
                                            Cancel
                                        </Button>
                                        <Button size="small" color="secondary" onClick={this.Applyfilter.bind(this)}>
                                            Apply Filter
                                        </Button>
                                    </div>
                                </Card>
                            </Fade>
                            <Typography component="h4" gutterBottom>
                                Users Count
                                <div className="filterItem">
                                    <Tooltip title="Filter list">
                                        <IconButton onClick={this.handleOpen}>
                                            {/* <FilterListIcon /> */}
                                            <FontAwesomeIcon icon={faFilter} size="xs" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                {/* <span>{oneMonthevents.users.totalCount}</span> */}
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Users</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users && users.users.period.length ? (
                                        <UsersList users={users.users.period} />
                                    ) : (
                                        <Typography variant="caption" component="h4" gutterBottom align="center">
                                            No Data...
                                        </Typography>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            component="div"
                                            count={totalItems}
                                            rowsPerPage={rowsPerPage}
                                            page={page - 1}
                                            rowsPerPageOptions={[10, 20, 50, 100, 200]}
                                            onChangePage={this.handleChangePage.bind(this)}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>

                            {/* <div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={2}
                                count={totalCount || count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                            />
                        </div> */}
                        </Card>
                    </div>
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownedProps) => {
    return {
        users: state && state[reducerName] && state[reducerName].users,
        totalItems: state && state[reducerName] && state[reducerName].totalItems,
        usersPagination: state && state[reducerName] && state[reducerName].usersPagination,
        oneWeekusers: state && state[reducerName] && state[reducerName].oneWeekusers,
        oneMonthusers: state && state[reducerName] && state[reducerName].oneMonthusers,
        sixMonthsusers: state && state[reducerName] && state[reducerName].sixMonthsusers,
        oneYearusers: state && state[reducerName] && state[reducerName].oneYearusers,
        passedAccountVal: state && state[usageReducerName] && state[usageReducerName].passedAccountVal,
        MuiTheme: state && state[themeReducer] && state[themeReducer].MuiTheme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // passTextToCompB: text => {
        //     dispatch(passTextToCompB(text));
        // },
        getUsersDataFromAPI: (userId, startTime, endTime, page, rowsPerPage) => {
            dispatch(getUsersDataFromAPI(userId, startTime, endTime, page, rowsPerPage));
        },

        getOneWeekUsersDataFromAPI: (userId, currentTime, endTime, page, rowsPerPage) => {
            dispatch(getOneWeekUsersDataFromAPI(userId, currentTime, endTime, page, rowsPerPage));
        },

        getOneMonthUsersDataFromAPI: (userId, currentTime, endTime, page, rowsPerPage) => {
            dispatch(getOneMonthUsersDataFromAPI(userId, currentTime, endTime, page, rowsPerPage));
        },

        getSixMonthsUsersDataFromAPI: (userId, currentTime, endTime, page, rowsPerPage) => {
            dispatch(getSixMonthsUsersDataFromAPI(userId, currentTime, endTime, page, rowsPerPage));
        },

        getOneYearUsersDataFromAPI: (userId, currentTime, endTime, page, rowsPerPage) => {
            dispatch(getOneYearUsersDataFromAPI(userId, currentTime, endTime, page, rowsPerPage));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Users));
