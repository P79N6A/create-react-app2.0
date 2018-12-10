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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
class RoleContainer extends React.Component {
    state = { roleList: [] };
    componentDidMount() {
        this.props.getRole({}, true);
    }
    render() {
        return <div></div>;
    }
}
RoleContainer.propTypes = {
    // classes: PropTypes.object.isRequired
};
RoleContainer.defaultProps = {};
const mapStateToProps = state => {
    return {
        roleList: state[REDUCER_NAME] && state[REDUCER_NAME].payload
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getRole: (searchData, flag) => {
            dispatch(actions.getRole(searchData, flag));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleContainer);
