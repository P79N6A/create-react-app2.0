import "../styles/style.less";
import React from "react";

import { LoginLogo, LoginPowered } from "./loginStatic";
import LoginDateTime from "./loginDateTime";
import LoginClock from "./loginClock";
import LoginForm from "./loginForm";

const LoginComponent = () => {
    return (
        <div className="login-component">
            <div className="login-body">
                <LoginLogo />
                <LoginDateTime />
                <LoginClock />
                <LoginForm />
            </div>
            <LoginPowered />
        </div>
    );
};

export default LoginComponent;
