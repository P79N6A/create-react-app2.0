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
import { connect } from "react-redux";
import { REDUCER_NAME as FilterReducer } from "../../funcs/constants";
import { withStyles } from "@material-ui/core/styles";
import initJson from "../schema.json";
// import _ from "lodash";
// import classNames from "classnames";

import { JSONSchema } from "modules/accountmanagement/common/jsonSchema/index";
import { Icon } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
const styles = theme => ({
    avatar: {
        display: "flex",
        width: 120,
        height: 120,
        "&>div:first-child": {
            marginRight: theme.spacing.unit * 2
        }
    },
    image: {
        width: "120px",
        height: "120px"
    },
    icon: {
        fontSize: "120px"
    },
    twoItem: {
        display: "flex",
        "&>div:first-child": {
            marginRight: theme.spacing.unit * 2
        }
    },
    logo: {
        // width: "100%",
        height: "170px",
        width: "170px",
        textAlign: "center",
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit,
        position: "absolute",
        lineHeight: "100px",
        overflow: "hidden",
        left: 0,
        "& img": {
            width: "100%",
            borderRadius: "50%"
            // height: "100%"
        },
        "& span": {
            fontSize: "120px",
            width: "100%",
            textAlign: "center"
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
            whiteSpace: "pre",
            wordBreak: "break-all",
            fontSize: "1rem!important"
        },
        "& p": {
            fontSize: "0.875rem!important"
        }
    },
    avatars: {
        margin: 10
    },
    bigAvatar: {
        width: 60,
        height: 60
    },
    ulStyle: {
        width: "50%"
    },
    padding: {
        padding: theme.spacing.unit * 2 + "px 0px"
    }
});

const property = {
    containers: {
        justify: "flex-end"
    }
};
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
class AddUserForm extends React.Component {
    state = {
        groupvalue: [],
        origin: [],
        fileList: [],
        currList: [],
        loading: false,
        disabled: false
    };
    componentWillReceiveProps(nextProps) {
        const { avator } = nextProps;
        if (avator && avator.length) {
            const urlCreator = window.URL || window.webkitURL;
            let url = avator && avator[0] ? urlCreator.createObjectURL(avator[0]) : undefined;
            this.setState({
                url: url
            });
        } else {
            this.setState({
                url: ""
            });
        }
    }
    render() {
        let { classes, currUserData = {} } = this.props;
        const { url } = this.state;
        let { userstatus, userstartdate, userexpiredate } = currUserData;
        const { groups = [] } = currUserData;
        const status = userstatus === "0" ? "Pending" : userstatus === "1" ? "Active" : "Inactive";
        userstartdate = userstartdate ? userstartdate.substring(0, 10).replace(/-/g, ".") : "";
        userexpiredate = userexpiredate ? userexpiredate.substring(0, 10).replace(/-/g, ".") : "";
        let flag = false;
        if (userexpiredate === "2999-12-31") {
            flag = true;
        }
        let initState = Object.assign({}, currUserData, {
            group: groups.map(n => n["grpname"]).join(", "),
            active: status,
            timerange: [userstartdate, userexpiredate].join("-"),
            dateofexpiry: flag
        });
        return (
            <React.Fragment>
                <JSONSchema
                    property={property}
                    schema={initJson}
                    initState={initState}
                    mode="view"
                    aop={{
                        upload: {
                            comp: "upload",
                            view: props => {
                                return (
                                    <div className={classes.logo}>
                                        {url ? (
                                            <Avatar alt="" src={url} className={classes.avatar} />
                                        ) : (
                                            <Avatar className={classes.avatar}>
                                                <Icon className={classes.icon}>person</Icon>
                                            </Avatar>
                                        )}
                                    </div>
                                );
                            }
                        }
                    }}
                />
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
