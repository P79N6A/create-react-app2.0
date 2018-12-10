import React, { Component } from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import FilterSelect from "./filterSelect";
import { TextField,DatePickers } from "modules/common";
import { theme } from "modules/theme";
import {
    filtersData,
    // filtersNoParameters,
    filterForOperator,
    severityAndState,
    handleDataForRequest
} from "./../funcs/filter";
import getTimeString from "commons/utils/isc8601Generator";
import "../styles/style.less";

const styles = () => ({
    alarm_filter_wrapper: {
        padding: "20px 0 20px 20px"
    },
    apply_filter: {
        marginLeft: "10px"
    },
    reset_filter: {
        marginLeft: "10px"
    },
    filter_item: {
        display: "flex",
        alignItems: "flex-end",
        marginTop: "20px"
    },
    delete_one: {
        height: "40px"
    },
    filter_item_left: {
        flex: 1,
        display: "flex",
        overflow: "hidden"
    },
    filter_item_per: {
        flex: 1,
        marginRight: "15px"
    },
    main: {
        maxHeight: "200px",
        overflowY: "scroll",
        paddingRight: "20px"
    }
});

class AuditFilter extends Component {
    static defaultProps = {
        onApplyFilter: () => {}
    };
    static propTypes = {
        onApplyFilter: PropTypes.func
    };
    state = {
        filtersData: filtersData,
        dataList: [
            {
                filter: "Fields Item",
                parameterValue: "",
                operator: "",
                value: "",
                dateTime: []
            }
        ]
    };
    addFilterItem = () => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data.push({
                filter: "Fields Item",
                severityAndState: "",
                parameterValue: "",
                operator: "",
                value: "",
                dateTime: []
            });
            return {
                dataList: data
            };
        });
    };
    removeFilterItem = index => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data.splice(index, 1);
            return {
                dataList: data
            };
        });
    };
    initFilterData = (operator, filter) => {
        return {
            filter,
            severityAndState: filter === "Severity" || filter === "State" ? severityAndState(filter)[0] : "",
            parameterValue: "",
            operator: filter === "Sent Datetime" ? "" : operator[0],
            value: "",
            dateTime:
                filter === "Sent Datetime"
                    ? [getTimeString("isc::{Today(00:00:00)-iso8601::(P1D)}"), getTimeString("isc::{Today()}")]
                    : ""
        };
    };
    filterSelect = (index, filter) => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index] = this.initFilterData(filterForOperator(filter), filter);
            return {
                dataList: data
            };
        });
        if (filter !== this.state.dataList[index].filter) {
            this.setState(prevState => {
                const data = prevState.dataList;
                data[index].value = "";
                return {
                    dataList: data
                };
            });
        }
    };
    operatorSelect = (index, operator) => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index].operator = operator;
            return {
                dataList: data
            };
        });
    };
    valueChange = (index, e) => {
        const { value } = e.target;
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index].value = value;
            return {
                dataList: data
            };
        });
    };
    parameterValueChange = (index, e) => {
        const { value } = e.target;
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index].parameterValue = value;
            return {
                dataList: data
            };
        });
    };
    severityAndState = (index, parameter) => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index].severityAndState = parameter;
            return {
                dataList: data
            };
        });
    };
    handleSubmit = () => {
        const { dataList } = this.state;
        this.props.onApplyFilter(handleDataForRequest(dataList));
    };
    handleDateTime = (index, dateTime) => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index].dateTime = dateTime;
            return {
                dataList: data
            };
        });
    };
    handleData = () => {
        const { filtersData, dataList } = this.state;
        if (dataList.map(item => item.filter).includes("Parameters")) {
            filtersData.splice(filtersData.indexOf("Parameters"), 1);
        }
        return filtersData;
    };
    resetCondition = () => {
        this.setState({
            dataList: []
        });
    };

    handleInputKeyUp = event => {
        if (event.keyCode === 13) {
            this.handleSubmit();
        }
    };

    render() {
        const { classes } = this.props;
        const { dataList, filtersData } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.alarm_filter_wrapper}>
                    <header>
                        <Button className={classes.add_filter} onClick={this.addFilterItem}>
                            <Icon>add</Icon>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.apply_filter}
                            onClick={this.handleSubmit}
                        >
                            APPLY FILTER
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.reset_filter}
                            onClick={this.resetCondition}
                        >
                            RESET
                        </Button>
                    </header>
                    <main className={classes.main}>
                        {dataList.map((item, index) => {
                            return (
                                <section className={classes.filter_item} key={index}>
                                    <div className={classes.filter_item_left}>
                                        <FilterSelect
                                            selctOptions={filtersData}
                                            onSelect={this.filterSelect.bind(this, index)}
                                            defaultValue={item.filter}
                                            label="Filter by"
                                        />
                                        {item.filter === "Parameters" ? (
                                            <TextField
                                                className={classes.filter_item_per}
                                                label="Enter a name"
                                                value={item.parameterValue}
                                                onChange={this.parameterValueChange.bind(this, index)}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        {!["Fields Item", "Sent Datetime"].includes(item.filter) ? (
                                            <FilterSelect
                                                selctOptions={filterForOperator(item.filter)}
                                                defaultValue={item.operator}
                                                onSelect={this.operatorSelect.bind(this, index)}
                                                label="Operator"
                                            />
                                        ) : (
                                            ""
                                        )}
                                        {["Severity", "State"].includes(item.filter) ? (
                                            <FilterSelect
                                                selctOptions={severityAndState(item.filter)}
                                                defaultValue={item.severityAndState}
                                                onSelect={this.severityAndState.bind(this, index)}
                                                label="Operator"
                                            />
                                        ) : (
                                            ""
                                        )}
                                        {item.filter === "Sent Datetime" ? (
                                            <div className="filter-time">
                                                <DatePickers
                                                    label="Date Range"
                                                    mode="dateTime"
                                                    onChange={this.handleDateTime.bind(this, index)}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {!["Sent Datetime", "Severity", "State", "Fields Item"].includes(
                                            item.filter
                                        ) ? (
                                                <TextField
                                                    label="Search for"
                                                    value={item.value}
                                                    onChange={this.valueChange.bind(this, index)}
                                                    className={classes.filter_item_per}
                                                    onKeyUp={this.handleInputKeyUp.bind(this)}
                                                />
                                            ) : ("")}
                                    </div>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.delete_one}
                                        onClick={this.removeFilterItem.bind(this, index)}
                                    >
                                        <Icon>delete</Icon>
                                    </Button>
                                </section>
                            );
                        })}
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(AuditFilter);
