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
import PropTypes from "prop-types";
import "../styles/style.less";
import { connect } from "react-redux";
import EnhanceFilter from "./enhanceHeaderFilter";
import { storeFilters } from "../funcs/actions";
class TopoFilterCont extends React.Component {
    componentWillMount() {
        this.props.storeFilters(this.props.identify, this.props.filterConfig);
    }
    
    render() {
        return (
            <div className="topology-filter">
                <EnhanceFilter
                    identify={this.props.identify}
                    title={this.props.title}
                    subTitle={this.props.subTitle}
                    filterConfig={this.props.filterConfig}
                    topoDisplayType={this.props.topoDisplayType}
                    refreshTopologySuccess={this.props.refreshTopologySuccess}
                    changeTopoDisplayType={this.props.changeTopoDisplayType}
                    topoMgmtAdd={this.props.topoMgmtAdd}
                />
            </div>
        );
    }
}

TopoFilterCont.propTypes = {
    pageNo: PropTypes.number,
    pageLimit: PropTypes.number,
    defaultFilterLists: PropTypes.array
};

TopoFilterCont.defaultProps = {};

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
)(TopoFilterCont);
