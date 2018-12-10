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
class ResourceContainer extends React.Component {
    state = { roleList: [] };
    componentDidMount(){
        // this.props.getResource(this.props.searchData, true)
    }
    render() {
        return null;
    }
}
ResourceContainer.propTypes = {
    // classes: PropTypes.object.isRequired
};
ResourceContainer.defaultProps = {};
const mapStateToProps = state => {
    return {
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getResource: (searchData, flag) => {
            dispatch(actions.getResource(searchData, flag));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceContainer);
