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
import { Form, Upload, SearchSelect } from "../../common/index";
import { connect } from "react-redux";
// import { Select, Spin } from "antd";
import { REDUCER_NAME as FilterReducer } from "../funcs/constants";
import * as actions from "../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
// import { validator } from "../../common/validator";
import { List, ListItem, ListItemText } from "@material-ui/core";
const styles = theme => ({
    avatar: {
        display: "flex",
        "&>div:first-child": {
            marginRight: theme.spacing.unit * 2
        }
    },
    image: {
        width: "143px",
        height: "143px"
    },
    icon: {
        fontSize: "135px"
    },
    twoItem: {
        display: "flex",
        "&>div:first-child": {
            marginRight: theme.spacing.unit * 2
        }
    },
    therrItem: {
        display: "flex",
        "&>div:nth-child(2)": {
            marginRight: theme.spacing.unit * 2,
            marginLeft: theme.spacing.unit * 2
        }
    },
    listStyle: {
        "& span": {
            wordBreak: "break-all",
            fontSize: "1rem!important"
        },
        "& p": {
            fontSize: "0.875rem!important"
        }
    },
    ulStyle: {
        width: "50%"
    },
    padding: {
        padding: theme.spacing.unit * 2
    }
});
/**
 * AddUserForm split layout form component
 * @example
 *
 *
 * @param {array} getFormData
 * @param {array} columns
 * @param {boolean} readOnly
 * @param {boolean} validate
 * @returns Component
 */

let timer = null;
class AddUserForm extends React.Component {
    state = {
        groupvalue: [],
        origin: [],
        currList: [],
        loading: false,
        disabled: false,
        fileList: []
    };
    componentDidMount() {
        const { dispatch } = this.props;
        let grpSearchData = Object.assign({}, this.props.grpSearchData, { pageno: 1 });
        dispatch(actions.reset({ grpSearchData }));
        dispatch(actions.getGroup(grpSearchData));
    }
    handleSearch = grpname => {
        const { dispatch } = this.props;
        let grpSearchData = Object.assign({}, this.props.grpSearchData, { grpname, pageno: 1 });
        timer && clearTimeout(timer);
        this.setState({
            data: [],
            loading: true,
            disabled: true
        });
        timer = setTimeout(() => {
            dispatch(actions.reset({ grpSearchData }));
            dispatch(actions.getGroup(grpSearchData));
        }, 1000);
    };
    handleFilter = selected => {
        clearTimeout(timer);
        let rootCheck = selected.map(n => n["value"]);
        this.setState(
            {
                groupvalue: rootCheck,
                currList: selected
            },
            () => {
                this.props.getGroupValue(this.state.groupvalue);
            }
        );
    };
    handleScrollToBtm = () => {
        const { dispatch } = this.props;
        const { pageno = 1 } = this.props.grpSearchData;
        const { totalpages } = this.props.grpPagination;
        if (totalpages < pageno + 1) return;
        let grpSearchData = Object.assign({}, this.props.grpSearchData, { pageno: pageno + 1 });
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.setState(
                {
                    loading: true,
                    disabled: true
                },
                () => {
                    dispatch(actions.reset({ grpSearchData }));
                    dispatch(actions.getGroup(grpSearchData, true));
                }
            );
        }, 1000);
    };
    componentWillReceiveProps(nextProps) {
        const { currUserData = {}, avator = [] } = nextProps;
        const { groups = [] } = currUserData;
        if (!_.isEqual(nextProps.currUserData, this.props.currUserData)) {
            this.setState({
                groupvalue: groups.map(n => n["grpid"]),
                origin: groups.map(n => ({ value: n["grpid"], label: n["grpname"] }))
            });
        }
        if (_.isEqual(this.props.opts, nextProps.opts)) {
            this.setState({
                loading: false,
                disabled: false
            });
        }
        if (avator && avator.length) {
            this.setState({
                url: avator[1].url
            });
        }
    }
    render() {
        const {
            getFormData,
            columns,
            readOnly,
            validate,
            classes,
            getFiles,
            // fileList,
            label,
            placeholder,
            opts = [],
            drawerLoading = false,
            editMode
        } = this.props;
        const { groupvalue, origin, currList, fileList, url } = this.state;
        const replace = (
            <div className={classes.image}>
                <img src={url} alt="" />
                {/* <Icon className={classes.icon}>account_box</Icon> */}
            </div>
        );
        let options = opts
            .map(n => ({ value: n["grpid"], label: n["grpname"] }))
            .concat(origin)
            .concat(currList);
        options = _.uniq(options.map(n => JSON.stringify(n))).map(n => JSON.parse(n));
        const { currUserData = {} } = this.props;
        const { groups = [] } = currUserData;
        return (
            <React.Fragment>
                {columns.length && (
                    <React.Fragment>
                        <div className={classes.avatar}>
                            {/* <UploadContainer /> */}
                            <Upload
                                isUpload={!readOnly}
                                replace={replace}
                                beforeUpload={() => false}
                                disabled={readOnly}
                                multiple={false}
                                maxSize={1}
                                getFiles={getFiles}
                                fileList={fileList}
                            />
                            <div style={{ width: "100%" }}>
                                {editMode === "view" ? (
                                    <List dense={true}>
                                        {columns.slice(0, 2).map(n => (
                                            <ListItem button key={n.name} classes={{ root: classes.listStyle }}>
                                                <ListItemText primary={n.value} secondary={n.label} />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Form
                                        readOnly={readOnly}
                                        validate={validate}
                                        columns={columns.slice(0, 2)}
                                        getFormData={getFormData}
                                    />
                                )}
                            </div>
                        </div>
                        {editMode !== "view" ? (
                            <React.Fragment>
                                <div className={classes.twoItem}>
                                    <Form
                                        readOnly={readOnly}
                                        validate={validate}
                                        columns={columns.slice(2, 4)}
                                        getFormData={getFormData}
                                    />
                                </div>
                                <div className={classes.twoItem}>
                                    <Form
                                        readOnly={readOnly}
                                        validate={validate}
                                        columns={columns.slice(4, 6)}
                                        getFormData={getFormData}
                                    />
                                </div>
                                <div>
                                    <Form
                                        readOnly={readOnly}
                                        validate={validate}
                                        columns={columns.slice(6, 7)}
                                        getFormData={getFormData}
                                    />
                                </div>
                                <Form
                                    readOnly={readOnly}
                                    validate={validate}
                                    columns={columns.slice(7, editMode === "edit" ? 8 : 9)}
                                    getFormData={getFormData}
                                />
                                <SearchSelect
                                    onSearch={this.handleSearch}
                                    placeholder={placeholder}
                                    onChange={this.handleFilter}
                                    label={label}
                                    value={groupvalue}
                                    selectProps={{
                                        isLoading: drawerLoading,
                                        multi: true,
                                        openOnFocus: true,
                                        autoBlur: true,
                                        // disabled: disabled,
                                        onMenuScrollToBottom: this.handleScrollToBtm
                                        // onFocus: this.handleFocus
                                    }}
                                    options={options}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <List dense={true}>
                                    {columns.slice(2, 10).map((n, i) => {
                                        if (typeof n.value === "boolean") {
                                            n.value = String(n.value);
                                        } else if (n.name === "timerange" && Array.isArray(n.value)) {
                                            n.value = n.value.join("-");
                                        } else if (Array.isArray(n.value)) {
                                            n.value = groups.map(n => n.grpname).join(",");
                                        }
                                        return (
                                            <ListItem
                                                key={n.name}
                                                button
                                                className={classes.padding}
                                                classes={{ root: classes.listStyle }}
                                            >
                                                <ListItemText primary={n.value} secondary={n.label} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

AddUserForm.propTypes = {
    classes: PropTypes.object,
    getFormData: PropTypes.func.isRequired
};
AddUserForm.defaultProps = {
    placeholder: "search group",
    label: "Group",
    getGroupValue: () => {}
};

const mapStateToProps = state => {
    return state[FilterReducer] || {};
};

export default connect(mapStateToProps)(withStyles(styles)(AddUserForm));
