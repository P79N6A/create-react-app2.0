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
import { Form, Icon, Input, Button, Checkbox, Select } from "antd";
import { connect } from "react-redux";
import { loginRequest } from "../../auth/funcs/actions";
import themes from "commons/components/theme";
import "../styles/loginForm.less";

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log("Received values of form: ", values);
                let { password, userName, group } = values;
                this.props.onSignIn(userName, password, group);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator("group", {
                        valuePropName: "value",
                        initialValue: "default",
                        rules: [
                            {
                                required: true,
                                message: "Please select your group!"
                            }
                        ]
                    })(
                        <Select showSearch placeholder="Select group">
                            <Select.Option value="default">default</Select.Option>
                            <Select.Option value="singtel">singtel</Select.Option>
                            <Select.Option value="ncs">ncs</Select.Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("userName", {
                        rules: [{ required: true, message: "Please input your username!" }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your Password!" }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true
                    })(
                        <Checkbox
                            style={{
                                color: this.props.formProp.btnStyle.color || themes.palette.primary.dark
                            }}
                        >
                            Remember me
                        </Checkbox>
                    )}
                    <a
                        className="login-form-forgot"
                        href=""
                        style={{
                            color: this.props.formProp.btnStyle.color || themes.palette.primary.dark
                        }}
                    >
                        Forgot password
                    </a>
                    <Button
                        // type="primary"
                        style={{
                            border: "none",
                            background: this.props.formProp.btnStyle.backgroundColor || themes.palette.primary.light,
                            color: this.props.formProp.btnStyle.color || themes.palette.primary.dark
                        }}
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    Or
                    <a
                        href=""
                        style={{
                            color: this.props.formProp.btnStyle.color || themes.palette.primary.dark
                        }}
                    >
                        register now!
                    </a>
                </FormItem>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (userName, password, accountId) => {
            dispatch(loginRequest(userName, password, accountId));
        }
    };
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default connect(null, mapDispatchToProps)(WrappedNormalLoginForm);
