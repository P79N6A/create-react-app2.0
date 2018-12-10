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

// eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reducerName } from "modules/auth";

const PermissionComponent = ({ permissions, materialKey, children }) => {
    if (materialKey && typeof materialKey === "string" && materialKey.indexOf("ISC_WEB_PAGE") !== -1) {
        // return children;
        return permissions.includes(materialKey) ? children : null;
    }
    return children;
};

PermissionComponent.propTypes = {
    permissions: PropTypes.arrayOf(PropTypes.string)
    // materialKey: PropTypes.string
};

//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    let identify = state[reducerName];
    let mKeys = [];
    if (identify && identify.permissions) {
        mKeys = identify.permissions;
    }
    return { permissions: mKeys };
};

export default connect(
    mapStateToProps,
    null
)(PermissionComponent);
