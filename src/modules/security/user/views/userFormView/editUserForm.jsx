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
import { Upload } from "../../../common/index";
import { connect } from "react-redux";
// import { Select, Spin } from "antd";
import { REDUCER_NAME as FilterReducer } from "../../funcs/constants";
// import * as actions from "../../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import { JSONSchema, validation as schemaValidation } from "modules/accountmanagement/common/jsonSchema/index";
import SearchSelect from "../common/searchSelect";
import { Switch, FormControlLabel } from "@material-ui/core";
import initJson from "../schema.json";
import _ from "lodash";
// import { validator } from "../../common/validator";
import { Icon, Avatar } from "@material-ui/core";
let rootJson = {};
for (let key in initJson) {
    if (key === "userid" && initJson[key].hasOwnProperty("operations") && ~initJson[key]["operations"].indexOf("w")) {
        rootJson[key] = Object.assign({}, initJson[key], { operations: "r" });
    } else {
        rootJson[key] = initJson[key];
    }
}
const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px",
        display: "flex",
        "&>div:first-child": {
            marginRight: theme.spacing.unit * 2
        }
    },
    image: {
        width: "120px",
        height: "120px",
        margin: "0 auto 8px"
    },
    icon: {
        fontSize: "120px"
    },
    twoItem: {
        display: "flex",
        "&>div:first-child": {
            // marginRight: theme.spacing.unit * 2
        }
    },
    therrItem: {
        display: "flex",
        "&>div:nth-child(2)": {
            marginRight: theme.spacing.unit * 2,
            marginLeft: theme.spacing.unit * 2
        }
    },
    "user-upload": {
        display: "inline-block",
        marginRight: "24px",
        position: "absolute",
        left: 0
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
    switch: {
        marginBottom: 0
    },
    ulStyle: {
        width: "50%"
    },
    padding: {
        padding: theme.spacing.unit * 2
    },
    search: {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px"
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


const property = {
    containers: {
        justify: "flex-end"
    }
};
class AddUserForm extends React.Component {
    state = {
        schema: _.cloneDeep(rootJson),
        groupvalue: [],
        origin: [],
        currList: [],
        initState: {},
        loading: false,
        disabled: false
    };
    componentWillReceiveProps(nextProps) {
        const { currUserData = {}, avator = [], editMode } = nextProps;
        const { groups = [], ...otherData } = currUserData;
        const { schema } = this.state;
        if (!_.isEqual(nextProps.currUserData, this.props.currUserData || editMode !== this.props.editMode)) {
            let flag = false;
            if (otherData.userexpiredate && otherData.userexpiredate.substring(0, 10) === "2999-12-31") {
                flag = true;
            }
            this.setState(
                {
                    initState: Object.assign({}, otherData, { dateofexpiry: flag }),
                    groupvalue: groups.map(n => ({ value: n["grpid"], label: n["grpname"] })),
                    origin: groups.map(n => ({ value: n["grpid"], label: n["grpname"] }))
                },
                () => {
                    this.props.getFormData(otherData, schemaValidation(otherData, schema));
                }
            );
        }
        if (_.isEqual(this.props.opts, nextProps.opts)) {
            this.setState({
                loading: false,
                disabled: false
            });
        }
        if (avator && avator.length) {
            const urlCreator = window.URL || window.webkitURL;
            let url = avator && avator[0] ? urlCreator.createObjectURL(avator[0]) : undefined;
            this.setState({
                url: url
            });
        }
    }
    getDatas = (values, schema, validation) => {
        this.props.getFormData(values, validation);
    };
    render() {
        const { classes, getFiles, fileList } = this.props;
        const { url, initState = {}, schema = {} } = this.state;
        const replace = (
            <div className={classes.image}>
                {url ? (
                    <Avatar alt="" src={url} className={classes.image} />
                ) : (
                    <Avatar className={classes.image}>
                        <Icon className={classes.icon}>person</Icon>
                    </Avatar>
                )}
            </div>
        );
        return (
            <div className={classes["schem-container"]}>
                <JSONSchema
                    property={property}
                    schema={schema}
                    initState={initState}
                    getDatas={this.getDatas}
                    aop={{
                        upload: {
                            comp: "upload",
                            view: props => {
                                return (
                                    <div className={classes["user-upload"]}>
                                        <Upload
                                            type="circle"
                                            isUpload={true}
                                            replace={replace}
                                            beforeUpload={() => false}
                                            disabled={false}
                                            multiple={false}
                                            maxSize={200}
                                            getFiles={getFiles}
                                            fileList={fileList}
                                        />
                                    </div>
                                );
                            }
                        },
                        liveSearchSelect: {
                            comp: "liveSearchSelect",
                            view: props => {
                                const { _updatevalue, schema } = props;
                                return <SearchSelect {...this.props} _updatevalue={_updatevalue} name={schema.name} />;
                            }
                        },
                        switchs: {
                            comp: "switchs",
                            view: props => {
                                let required = props.schema.mandatory ? "*" : "";
                                const { value, displayname, name } = props.schema;
                                return (
                                    <FormControlLabel
                                        classes={{ root: classes.switch }}
                                        control={
                                            <Switch
                                                disabled={initState.userstatus === "0"}
                                                checked={!!value}
                                                onChange={e => {
                                                    props._updatevalue(e.target.checked, name);
                                                }}
                                                value={name}
                                            />
                                        }
                                        label={displayname + required}
                                    />
                                );
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

AddUserForm.propTypes = {
    classes: PropTypes.object,
    getFormData: PropTypes.func.isRequired
};
AddUserForm.defaultProps = {
    placeholder: "Search Group",
    label: "Group",
    getGroupValue: () => {}
};

const mapStateToProps = state => {
    return state[FilterReducer] || {};
};

export default connect(mapStateToProps)(withStyles(styles)(AddUserForm));
