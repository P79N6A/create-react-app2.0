import React from "react";
import { view as LoginTemplate } from "modules/login";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/login.less";

class LoginPage extends React.Component {
    render = () => {
        return <LoginTemplate />;
    };
}

export default LoginPage;
