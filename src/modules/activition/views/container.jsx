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
import * as actions from "../funcs/actions";
import { REDUCER_NAME, initState } from "../funcs/constant";
import ncsBackground from "modules/login/images/login_background_ncs.jpg";
import { withStyles } from "@material-ui/core/styles";
import { Loading } from "../common/index";
import ResetPassword from "./resetPassword";
import Header from "./Header";
import Logo from "./logo";
import { Redirect } from "react-router-dom";
import urlParse from "commons/utils/queryStringHelper";
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
    componentDidMount() {
        let urlParams = urlParse();
        let token = urlParams.token;
        this.props.validationToken(token);
    }
    componentWillUnmount() {
        this.props.reset(initState);
    }
    render() {
        const { classes, isLoading, ...otherProps } = this.props;
        const { active } = otherProps;
        if (active) {
            return <Redirect to="/login" />;
        }
        return (
            <div className={classes.fullScreen}>
                {/* <img className={classes.img} src={ncsBackground} alt="" /> */}
                {isLoading && <Loading />}
                <div className={classes.Container}>
                    <Logo />
                    <div className={classes.form}>
                        <Header />
                        <div className={classes.instructions}>
                            <ResetPassword {...otherProps} />
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
        active: state[REDUCER_NAME] && state[REDUCER_NAME].active,
        data: state[REDUCER_NAME] && state[REDUCER_NAME].data,
        isLoading: state[REDUCER_NAME] && state[REDUCER_NAME].isLoading,
        isValidToken: state[REDUCER_NAME] && state[REDUCER_NAME].isValidToken
    };
};
const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        activitionUser: postData => {
            dispatch(actions.activitionUser(postData));
        },
        validationToken: token => {
            dispatch(actions.validationToken(token));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Activition));
