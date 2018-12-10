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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { resetPassword as columns } from "../funcs/constant";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import tokenHelper from "commons/utils/tokenHelper";
import userHelper from "commons/utils/userHelper";
import { I18n } from "react-i18nify";
import { JSONSchema } from "modules/accountmanagement/common/jsonSchema/index";
import schema from "../schema.json";
import Password from "./password";
const styles = theme => ({
    AlignCenter: {
        textAlign: "center",
        paddingTop: theme.spacing.unit * 3,
        "&>span": {
            marginTop: theme.spacing.unit * 3
        },
        "& a": {
            color: theme.palette.secondary.main
        }
    },
    footer: {
        fontSize: "0.75rem"
    },
    form: {
        padding: "0px 0px 16px"
    }
});
class ResetPassword extends React.Component {
    state = { open: true, columns: [], validateResult: false };
    formData = {};
    componentDidMount() {
        this.setState({
            columns: _.cloneDeep(columns)
        });
    }
    getFormData = (datas, validateResult) => {
        this.formData = datas;
        this.props.reset({ data: datas });
        const { columns } = this.state;
        let root = columns.map(n => {
            n.value = datas[n.name];
            return n;
        });
        this.setState({
            columns: root,
            validateResult
        });
    };
    activeHandle = () => {
        const { formDatas } = this.state;
        let postData = {
            ...formDatas
        };
        this.props.submitHandle();
        this.props.changePasswordRequest(postData);
    };
    clickHandle = () => {
        tokenHelper.remove();
        userHelper.remove();
        this.props.reset({ isValid: false });
        // this.props.logout(tokenHelper.get());
    };
    getDatas = (values, schema, validateResult) => {
        let flag = values.newPassword === values.confirmPassword && !!values.confirmPassword;
        this.setState({
            formDatas: values,
            validateResult: flag && validateResult
        });
    };
    render() {
        const { formDatas = {}, validateResult = false } = this.state;
        const { classes } = this.props;
        return (
            <div style={{}}>
                <div className={classes.form}>
                    <JSONSchema
                        initState={{}}
                        getDatas={this.getDatas}
                        schema={schema}
                        aop={{
                            password: {
                                comp: "password",
                                view: props => {
                                    let msg = { errorreg: false, errormsg: "" };
                                    const { schema } = props;
                                    const { name, valueregex, valueerror } = schema;
                                    if (name !== "confirmPassword") {
                                        msg.errorreg = new RegExp(valueregex).test(formDatas[name] || "");
                                        !msg.errorreg && (msg.errormsg = valueerror);
                                    } else {
                                        if (formDatas.newPassword === formDatas.confirmPassword) {
                                            msg = { errorreg: true, errormsg: "" };
                                        } else {
                                            msg = { errorreg: false, errormsg: valueerror };
                                        }
                                    }
                                    return <Password {...props} formDatas={formDatas} error={msg} />;
                                }
                            }
                        }}
                    />
                </div>
                <div className={classes.AlignCenter}>
                    <Button
                        style={{ width: "80%" }}
                        disabled={!validateResult}
                        variant="contained"
                        color="secondary"
                        onClick={this.activeHandle}
                    >
                        {I18n.t("changePassword.activeButtonText")}
                    </Button>
                    <Typography variant="inherit" className={classes.footer} color="textPrimary" align="left">
                        {I18n.t("changePassword.hasBeenActivated")}
                        <Link onClick={this.clickHandle} className={classes.AlinkText} to="/login">
                            {" "}
                            {I18n.t("changePassword.SignIn")}
                        </Link>
                    </Typography>
                </div>
            </div>
        );
    }
}
ResetPassword.propTypes = {
    classes: PropTypes.object
};
ResetPassword.defaultProps = {};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ResetPassword));
