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
import { REDUCER_NAME, initialState } from "../funcs/constants";
import { Loading } from "../../common/index";
import { REDUCER_NAME as identify } from "modules/auth/funcs/constants";
import List from "./list";
class ResourcePathContainer extends React.Component {
    state = {
        loading: false
    };
    componentDidMount() {
        this.props.reset(initialState);
        const { resourcepaths } = this.props;
        let flag = true;
        if (~resourcepaths.indexOf("/")) {
            flag = false;
        }
        this.props.getResourcePath(Object.assign({}, initialState.searchData), flag);
    }
    componentWillReceiveProps(nextProps) {
        const { loading } = nextProps;
        this.setState({ loading });
    }
    render() {
        const { loading } = this.state;
        return (
            <div style={{ height: "100%" }}>
                {loading && <Loading />}
                <List />
            </div>
        );
    }
}
ResourcePathContainer.propTypes = {
    // classes: PropTypes.object.isRequired
};
ResourcePathContainer.defaultProps = {};
const mapStateToProps = state => {
    return {
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        loading: state[REDUCER_NAME] && state[REDUCER_NAME].loading,
        roleList: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        resourcepaths: state[identify] && state[identify].resourcepaths
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getResourcePath: (searchData, flag) => {
            dispatch(actions.getResourcePath(searchData, flag));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourcePathContainer);
