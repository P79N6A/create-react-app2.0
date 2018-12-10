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
 * Created by Wangrui on 08/06/2018.
 */

import React from "react";
// import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as consts from "../funcs/constants";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import themes from "../theme.json";
// const defaultTheme = createMuiTheme(DARK_THEME);

const { REDUCER_NAME } = consts;

const IscTheme = ({ theme, children, pushTheme, uitheme = "Default-Optus" }) => {
    if (!uitheme || !themes.hasOwnProperty(uitheme)) {
        uitheme = "Default-Optus";
    }
    const Theme = createMuiTheme(
        Object.assign({}, themes[uitheme][theme], {
            typography: {
                useNextVariants: true
            }
        })
    );
    pushTheme(Theme);
    return <MuiThemeProvider theme={Theme}>{children}</MuiThemeProvider>;
};

IscTheme.defaultProps = {
    theme: "DARK_THEME",
    children: null
};

const mapStateToProps = state => {
    return {
        theme: state && state[REDUCER_NAME] && state[REDUCER_NAME].theme,
        uitheme: state && state[REDUCER_NAME] && state[REDUCER_NAME].uitheme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pushTheme: Theme => {
            dispatch(actions.pushTheme(Theme));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IscTheme);
