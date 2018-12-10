import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginRequest } from "../funcs/actions";
import { I18n, Translate } from "react-i18nify";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

class LoginForm extends Component {
    static propTypes = {
        onSignIn: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            userNameInvalid: false,
            passwordInvalid: false
        };
    }

    validateInput(type, value) {
        if (type === "UserName") {
            if (!value) {
                this.setState({
                    userNameInvalid: true
                });
                return false;
            }

            this.setState({
                userNameInvalid: false
            });
            return true;
        }

        if (!value) {
            this.setState({
                passwordInvalid: true
            });
            return false;
        }
        this.setState({
            passwordInvalid: false
        });
        return true;
    }

    handleUserNameChange(e) {
        let userName = e.target.value.trim();
        this.validateInput("UserName", userName);
    }

    handlePasswordChange(e) {
        let password = e.target.value.trim();
        this.validateInput("Password", password);
    }

    handleClick() {
        let userName = this.refs.txtUserName.value.trim();
        let password = this.refs.txtPassword.value.trim();
        let accountId = "default";
        let isValid = this.validateInput("UserName", userName);
        isValid = this.validateInput("Password", password);

        if (!isValid) {
            return;
        }
        this.props.onSignIn(userName, password, accountId);
    }

    componentDidMount() {
        this.refs.txtUserName.focus();
    }

    render() {
        return (
            <form className="login-form" onSubmit={e => e.preventDefault()}>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-user" />
                    </span>
                    <input
                        type="text"
                        ref="txtUserName"
                        placeholder={I18n.t("login.textUserName")}
                        className={this.state.userNameInvalid ? "form-control  is-invalid" : "form-control"}
                        onChange={this.handleUserNameChange}
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-key" />
                    </span>
                    <input
                        type="password"
                        ref="txtPassword"
                        placeholder={I18n.t("login.textPassword")}
                        className={this.state.passwordInvalid ? "form-control  is-invalid" : "form-control"}
                        onChange={this.handlePasswordChange}
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-newspaper-o" />
                    </span>
                    <select defaultValue="0" className="form-control">
                        <option value="0">Default</option>
                        <option value="1">NCS</option>
                        <option value="2">Singtel</option>
                    </select>
                </div>
                <button id="btnSignIn" className="btn btn-block btn-primary" onClick={this.handleClick}>
                    <Translate value="login.buttonSignIn" />
                </button>
            </form>
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
export default connect(null, mapDispatchToProps)(LoginForm);
