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
import { actions } from "modules/auth/index";
import { reducerName as REDUCER_NAME } from "modules/auth/index";
import ncsBackground from "modules/login/images/login_background_ncs.jpg";
import { withStyles } from "@material-ui/core/styles";
import { Loading } from "../common/index";
import ResetPassword from "./resetPassword";
import Header from "./Header";
import Logo from "./logo";
import { Redirect } from "react-router-dom";
import PasswordChanged from "./passwordChanged";
// import { I18n } from "react-i18nify";
import * as message from "modules/messageCenter/funcs/actions";
// import urlParse from "commons/utils/queryStringHelper";
// import { JSONSchema } from "modules/security/common/jsonSchema/index";
const styles = theme => ({
    fullScreen: {
        width: "100%",
        height: "100%",
        // padding: theme.spacing.unit * 5,
        backgroundColor: theme.palette.background.paper
    },
    bg: {
        opacity: "0.5",
        backgroundImage: `url(${ncsBackground})`,
        width: "100%",
        height: "100%"
    },
    Container: {
        backgroundColor: theme.palette.background.paper,
        margin: "0 auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "380px",
        width: "360px",
        zIndex: 1,
        boxShadow: theme.shadows["24"]
    },
    root: {
        width: "90%"
    },
    backButton: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        // width: "360px",
        margin: "0 auto"
    },
    AlignCenter: {
        textAlign: "center"
    },
    img: {
        width: "100%",
        height: "100%",
        opacity: "0.5",
        position: "fixed"
    },
    form: {
        padding: theme.spacing.unit * 3
    }
});

class Activition extends React.Component {
    state = {
        isLoading: false
    };
    componentDidMount() {
        this.props.reset({ isChangePassword: false });
    }
    submitHandle = () => {
        this.setState({
            isLoading: true
        });
    };
    render() {
        const { classes, isLoading, isChangePassword = false, logincondition, ...otherProps } = this.props;
        if (!logincondition || logincondition === "NORMAL") {
            return <Redirect to="/login" />;
        }
        return (
            <div className={classes.fullScreen}>
                {/* <img className={classes.img} src={ncsBackground} alt="" /> */}
                {/* {isLoading && !isChangePassword && <Loading />} */}
                {isChangePassword && <PasswordChanged {...this.props} />}
                <div className={classes.Container}>
                    <Logo />
                    <div className={classes.form}>
                        <Header />
                        <div className={classes.instructions}>
                            <ResetPassword {...otherProps} submitHandle={this.submitHandle} />
                        </div>
                    </div>
                </div>
                <div className={classes.bg} />
            </div>
        );
    }
}
Activition.propTypes = {
    classes: PropTypes.object
};
Activition.defaultProps = {};
Activition.defaultProps = {};
const mapStateToProps = state => {
    return {
        isChangePassword: state[REDUCER_NAME] && state[REDUCER_NAME].isChangePassword,
        logincondition: state[REDUCER_NAME] && state[REDUCER_NAME].logincondition
    };
};
const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        changePasswordRequest: postData => {
            dispatch(actions.changePasswordRequest(postData));
        },
        validationToken: token => {
            dispatch(actions.validationToken(token));
        },
        warn: (msg, modulename) => {
            dispatch(message.warn(msg, modulename));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Activition));
