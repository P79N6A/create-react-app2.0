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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from "react-redux";
import { REDUCER_NAME as topoGraphFloatTabReducer } from "../funcs/constants";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

class FloatTabHeader extends React.Component {
    render() {
        return (
            <CardHeader
                action={
                    <IconButton onClick={this.props.handleFloatTabClose}>
                        <Icon>clear</Icon>
                    </IconButton>
                }
                title={this.props.currentTitle}
            />
        );
    }
}

FloatTabHeader.defaultProps = {
    currentTitle: "Device Detail"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentTitle: filterProps(state, identify, topoGraphFloatTabReducer, "currentTitle")
    };
};

export default connect(
    mapStateToProps,
    null
)(FloatTabHeader);
