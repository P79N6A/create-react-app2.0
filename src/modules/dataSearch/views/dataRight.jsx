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
 * Created by HuLin on 03/08/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestSearch, setDefaultTableData, noSelect } from "../funcs/actions";
import { REDUCER_NAME as dataSearch } from "../funcs/constants";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Table from "./table";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import classNames from "classnames";
import { I18n } from "react-i18nify";
import { RangePicker } from "modules/common";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        marginTop: theme.spacing.unit * 3
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit,
        color: theme.palette.secondary.main
    },
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 3
    },
    table: {
        width: "100%",
        height: "100%",
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 3
    },
    formControl: {
        marginLeft: 26
    },
    datePicker: {
        width: "100%",
        position: "relative",
        top: "-7px",
        padding: "0",
        "& input": {
            border: "0px!important",
            outline: "none",
            padding: "0",
            background: "none",
            color: theme.palette.text.primary
        }
    },
    label: {
        color: theme.palette.secondary.main + "!important"
    },
    dateLabel: {
        color: theme.palette.text.secondary,
        fontSize: "0.75rem",
        "&:focus": {
            color: theme.palette.secondary.main
        }
    }
});

class DataRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick: false,
            isOpen: false,
            dateValue: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
        };
    }

    handleClick = () => {
        let startTime = this.state.dateValue[0];

        let endTime = this.state.dateValue[1];

        let selectVal = this.props.selectVal;

        let data = moment().format("YYYYMMDDhhmmss");

        let taskName = "EXPORT-" + data;

        let taskDes = "DESC";

        let getDefaultData = this.props.getDefaultData;

        let exportId = this.props.exportId;
        let start = moment().format(startTime);
        let end = moment().format(endTime);

        if (!moment(start).isBefore(end) && !moment(start).isSame(end)) {
            let name = "time";
            this.props.onNoSelect(name);
            return;
        }

        let obj = {
            exportId: exportId,
            taskName: taskName,
            selectVal: selectVal,
            startTime: startTime,
            endTime: endTime,
            taskDes: taskDes,
            page: 0,
            rowSize: getDefaultData.size
        };

        this.setState({
            isClick: true
        });

        if (selectVal.length === 0) {
            let name = "config";
            this.props.onNoSelect(name);
            return;
        }

        if (getDefaultData.length !== 0) {
            if (getDefaultData.totalElements > 0) {
                for (var i = 0; i < getDefaultData.content.length; i++) {
                    if (
                        (JSON.parse(getDefaultData.content[i].provideParams).provideParameter.startTime !== startTime) |
                            (JSON.parse(getDefaultData.content[i].provideParams).provideParameter.endTime !==
                                endTime) &&
                        selectVal.length !== 0
                    ) {
                        this.props.onrequestSearch(obj);
                        return;
                    } else {
                        let name = "same";
                        this.props.onNoSelect(name);
                        return;
                    }
                }
            } else {
                this.props.onrequestSearch(obj);
                return;
            }
        }
    };

    handleChange = (date, dateString) => {
        this.setState({
            dateValue: dateString
        });
    };

    onOpenChange = status => {
        this.setState({
            isOpen: status
        });
    };

    render() {
        const { classes, dateFormat } = this.props;
        const { isOpen, dateValue } = this.state;
        return (
            <div className="data-right">
                <div className={classNames("data-content", { [classes.root]: true })}>
                    <form className={classes.container} noValidate>
                        <FormControl className={ classes.formControl }>
                            <label className={classNames(classes.dateLabel, isOpen ? classes.label : "")}>Start Date ~ End Date</label>
                            <RangePicker
                                allowClear={false}
                                onChange={this.handleChange}
                                onOpenChange={this.onOpenChange}
                                value={[moment(dateValue[0], dateFormat), moment(dateValue[1], dateFormat)]}
                                defaultValue={[moment(dateValue[0], dateFormat), moment(dateValue[1], dateFormat)]}
                                format="YYYY-MM-DD"
                            />
                        </FormControl>
                        <Button color="primary" className={classes.button} onClick={this.handleClick}>
                            {I18n.t("dataExport.exportButton")}
                        </Button>
                    </form>

                    <Divider className={classes.margin} />
                    <div className={ classes.table }>
                        <Table
                            startTime={this.state.startTime}
                            endTime={this.state.endTime}
                            DataRight={this.state.isClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

DataRight.propTypes = {
    classes: PropTypes.object.isRequired
};

DataRight.defaultProps = {
    dateFormat: "YYYY/MM/DD",
    type: "date"
};

const mapStateToProps = (state, ownProps) => {
    if (state[dataSearch] && state[dataSearch].arr) {
        return {
            exportId: state[dataSearch].exportId,
            selectVal: state[dataSearch].arr || [],
            taskId: state[dataSearch].taskId,
            getDefaultData: state[dataSearch].getDefaultData || []
        };
    } else {
        return {
            exportId: "",
            selectVal: [],
            taskId: {},
            getDefaultData: []
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onrequestSearch: obj => {
            dispatch(requestSearch(obj));
        },
        onSetDefaultTableData: panation => {
            dispatch(setDefaultTableData(panation));
        },
        onNoSelect: obj => {
            dispatch(noSelect(obj));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DataRight));
