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
 * Created by wplei on 25/05/18.
 */
import React from "react";
import PropTypes from "prop-types";
import { Dialog, Form, Loading } from "modules/security/common/index";
import * as actions from "modules/auth/funcs/actions";
import { connect } from "react-redux";
import { REDUCER_NAME } from "modules/auth/funcs/constants";
import { changePassword as columns } from "../funcs/constants";
import { reportError } from "modules/security/common/validator";
import _ from "lodash";
class ChangePassword extends React.Component {
    state = { open: true, columns: [], validateResult: false };
    formData = {};
    componentDidMount() {
        this.setState({
            columns: _.cloneDeep(columns)
        });
    }
    getFormData = (datas, validateResult) => {
        this.formData = datas;
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
    componentWillReceiveProps(nextProps) {
        const { open } = nextProps;
        if (!open) {
            this.setState({
                columns: _.cloneDeep(columns)
            });
        }
    }
    cancle = () => {
        this.props.reset({ isOpenPassword: false });
    };
    submit = () => {
        const { password, confirmpassword, oldpassword } = this.formData;
        let postData = {
            format: "ISCResetPasswordDTO",
            newPassword: password,
            confirmPassword: confirmpassword,
            oldPassword: oldpassword
        };
        this.props.reset({ isLoading: true });
        this.props.ChangePassword(postData);
    };
    render() {
        const { isOpenPassword = false, isLoading = false } = this.props;
        const { columns } = this.state;
        let validateResult = !reportError(
            true,
            columns,
            columns.length ? Object.assign.apply({}, columns.map(n => ({ [n.name]: n.value || "" }))) : {}
        );
        return (
            <Dialog
                title={"Reset Password"}
                cancle={this.cancle}
                open={isOpenPassword}
                submit={this.submit}
                submitText="ok"
                minWidth={"auto"}
                isDisabled={validateResult}
            >
                {isLoading && <Loading />}
                <Form validate={true} columns={columns} getFormData={this.getFormData} />
            </Dialog>
        );
    }
}
ChangePassword.propTypes = {
    classes: PropTypes.object
};
ChangePassword.defaultProps = {};

const mapStateToProps = state => {
    return {
        isOpenPassword: state[REDUCER_NAME] && state[REDUCER_NAME].isOpenPassword,
        isLoading: state[REDUCER_NAME] && state[REDUCER_NAME].isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ChangePassword: postData => {
            dispatch(actions.changePasswordRequest(postData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
