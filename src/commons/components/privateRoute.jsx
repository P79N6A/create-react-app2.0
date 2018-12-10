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
 * Created by Zach on 25/05/2018.
 */

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import checkPermission from "commons/utils/checkPermission";
import store from "../store";
import { actions } from "modules/auth";

const redirectTo = props => ({
    pathname: "/login",
    state: {
        from: props.location
    }
});

const privateRoute = ({ component: Component, isValid, materialKey, materialKeys = [], permissions, ...rest }) => {
    if (materialKey && permissions && !permissions.includes(materialKey) && isValid) {
        let pathname = checkPermission(permissions, materialKey, materialKeys);
        if (!pathname) {
            return (
                <Route
                    {...rest}
                    render={props => (isValid ? <Component {...props} /> : <Redirect to={redirectTo(props)} />)}
                />
            );
        } else if (pathname.path === "/login") {
            store.dispatch(actions.updateIdentify(false));
        }
        return <Route {...rest} render={props => <Redirect to={pathname.path} />} />;
    }
    return (
        <Route {...rest} render={props => (isValid ? <Component {...props} /> : <Redirect to={redirectTo(props)} />)} />
    );
};
privateRoute.propTypes = {
    isValid: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        isValid: state.identify && state.identify.isValid,
        permissions: state.identify && state.identify.permissions,
        materialKeys: state.identify && state.identify.materialKeys
    };
};

export default connect(
    mapStateToProps,
    null
)(privateRoute);
// export default privateRoute;
