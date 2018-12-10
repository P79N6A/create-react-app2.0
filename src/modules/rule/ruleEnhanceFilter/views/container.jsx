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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import { connect } from "react-redux";
import EnhanceFilter from "./enhanceHeaderFilter";
import { storeFilters } from "../funcs/actions";
class RuleFilterCont extends React.Component {
    componentWillMount() {
        this.props.storeFilters(this.props.identify, this.props.filterConfig);
    }
    render() {
        return (
            <div className="rule-filter">
                <EnhanceFilter
                    identify={this.props.identify}
                    title={this.props.title}
                    subTitle={this.props.subTitle}
                    // filterConfig={this.props.filterConfig}
                    ruleDisplayType={this.props.ruleDisplayType}
                    openAddFloatTab = {this.props.openAddFloatTab}
                    changeAddMode = {this.props.changeAddMode}
                    refreshRuleSuccess={this.props.refreshRuleSuccess}
                    onFullScreen={this.props.onFullScreen}
                    onFullScreenExit={this.props.onFullScreenExit}
                    full={this.props.full}
                    fullScreen={this.props.fullScreen}
                />
            </div>
        );
    }
}

RuleFilterCont.propTypes = {
    pageNo: PropTypes.number,
    pageLimit: PropTypes.number,
    defaultFilterLists: PropTypes.array
};

RuleFilterCont.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        storeFilters: (identify, filterConfig) => {
            dispatch(storeFilters(identify, filterConfig));
        }
    };
};

export default connect(
    mapStateToProps.bind(this),
    mapDispatchToProps
)(RuleFilterCont);
