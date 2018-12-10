import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import FilterSelect from "./filterSelect";
import { TextField } from "modules/common";
import { RangePicker } from "modules/common";
import { filtersData, filterForOperator, severityAndState, filterForValueType } from "./../funcs/filter";
import "../styles/style.less";
import { I18n } from "react-i18nify";
import { SearchSelect } from "modules/common";
import _ from "lodash";

let timer = null;
const dateFormat = "DD/MM/YYYY HH:mm:ss";
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

class AlarmFilter extends Component {
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
                dateTime: [],
                valuetype: "",
                optsData: []
            }
        ]
    };
    componentWillReceiveProps(nextProps) {
        let ccmsFilterDataList = _.cloneDeep(nextProps.ccmsFilterDataList);
        this.setState({
            ccmsFilterDataList: ccmsFilterDataList
        });
    }
    addFilterItem = () => {
        this.setState(prevState => {
            const data = prevState.dataList;
            data.push({
                filter: "Fields Item",
                severityAndState: "",
                parameterValue: "",
                operator: "",
                value: "",
                dateTime: [],
                valuetype: "",
                optsData: []
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
            dateTime: [],
            valuetype: "",
            optsData: []
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
        let lock = true;
        let msg = I18n.t("alarm.form.warning");
        let ccmsFilterDataList = _.cloneDeep(this.state.ccmsFilterDataList);
        for (let i = 0; i < dataList.length; i++) {
            if (
                (dataList[i].filter !== "Fields Item" &&
                    dataList[i].filter !== "Sent Datetime" &&
                    dataList[i].filter !== "Severity" &&
                    !dataList[i].value) ||
                (dataList[i].filter === "Sent Datetime" && dataList[i].dateTime.length === 0) ||
                (dataList[i].filter === "Parameters" && !dataList[i].parameterValue.trim())
            ) {
                lock = false;
            }
        }
        let newDataList = dataList.concat(ccmsFilterDataList);

        if (lock) {
            this.props.onApplyFilter(newDataList);
        } else {
            this.props.callReminder(msg);
        }
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
        this.setState(
            {
                dataList: []
            },
            () => {
                this.handleSubmit();
            }
        );
    };

    handleInputKeyUp = event => {
        if (event.keyCode === 13) {
            this.handleSubmit();
        }
    };

    // parameter search...
    handleSearch = (index, value) => {
        // this.setState(prevState => {
        //     const data = prevState.dataList;
        //     data[index].parameterValue = value;
        //     return {
        //         dataList: data
        //     };
        // });

        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.setState(
                {
                    loading: true,
                    value
                },
                () => {
                    this.props.callParameters(value);
                }
            );
        }, 1000);
    };
    handleChange = (index, obj) => {
        clearTimeout(timer);
        if (!obj || obj.length === 0) {
            this.props.callParameters("");
            return;
        }
        this.setState(prevState => {
            const data = prevState.dataList;
            data[index].parameterValue = obj.value;
            data[index].valuetype = obj.valueType;
            data[index].operator = filterForValueType(obj.valueType)[0];
            data[index].optsData = obj;
            return {
                dataList: data
            };
        });
    };

    render() {
        const { classes, parametersData, identify } = this.props;
        const { dataList, filtersData } = this.state;
        let opts = _.map(parametersData, item => {
            return {
                value: item.parametername,
                label: item.parametername,
                valueType: item.parametervaluetype,
                operators: item.operators
            };
        });
        return (
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
                                        <SearchSelect
                                            className="alarmSearchSelect"
                                            onInputChange={this.handleSearch.bind(this, index)}
                                            placeholder="Enter a name"
                                            onChange={this.handleChange.bind(this, index)}
                                            label="Enter a name"
                                            value={item.optsData}
                                            valueContainerStyle={{ flexWrap: "nowrap", whiteSpace: "nowrap" }}
                                            options={opts}
                                            isMulti={false}
                                            // valueComponent={{
                                            //     onRemove: false
                                            // }}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {!["Fields Item", "Sent Datetime"].includes(item.filter) ? (
                                        <FilterSelect
                                            selctOptions={
                                                item.filter === "Parameters"
                                                    ? filterForValueType(item.valuetype)
                                                    : filterForOperator(item.filter)
                                            }
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
                                            <RangePicker
                                                label="Date Range"
                                                showTime={{ format: "HH:mm:ss" }}
                                                format={dateFormat}
                                                onChange={this.handleDateTime.bind(this, index)}
                                                id={identify + index}
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {!["Sent Datetime", "Severity", "State", "Fields Item"].includes(item.filter) ? (
                                        <TextField
                                            label="Search for"
                                            value={item.value}
                                            onChange={this.valueChange.bind(this, index)}
                                            className={classes.filter_item_per}
                                            onKeyUp={this.handleInputKeyUp.bind(this)}
                                        />
                                    ) : (
                                        ""
                                    )}
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
        );
    }
}

export default withStyles(styles)(AlarmFilter);
