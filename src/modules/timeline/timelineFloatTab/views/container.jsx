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
import { Drawer } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// import { setRuleFloatTab, initRuleFloatTab } from "../funcs/actions";
import { reducerName as timelineReducerName } from "modules/timeline/timelineContent";
import { view as AlarmDetail } from "modules/alarm/alarmDetail";

class FloatTabCont extends React.Component {

    DrawerToggle = () => {
        this.props.handleFloatTabClose();
    };
    renderDom() {
        let obj = {};
        obj["classes"] = {};
        this.props = Object.assign({}, this.props, obj);
        if(!this.props.detailData){
            return;
        }
        let data = [];
        data.push(this.props.detailData);
        return ( 
            <AlarmDetail
                identify={this.props.identify}
                detailData={data}
                DrawerToggle={this.DrawerToggle.bind(this)}
                editState={false}
            />
        );
    }
    render() {
        let { anchor } = this.props;

        return (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={this.props.showFloatTab}
                // showFloatTab={this.props.showFloatTab}
            >
                <div className="floatTab-container">
                    {this.renderDom()}
                </div>
            </Drawer>
        );
    }
}

FloatTabCont.propTypes = {
    showFloatTab: PropTypes.bool
};

FloatTabCont.defaultProps = {
    showFloatTab: false,
    anchor: "right",
    tabTypes: ["Detail", "Associations", "Attachments"]
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        showFloatTab: filterProps(state, identify, timelineReducerName, "showFloatTab"),
        detailData: filterProps(state, identify, timelineReducerName, "detailData")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setRuleFloatTab: (deviceId, defaultTab, identify) => {
        //     dispatch(setRuleFloatTab(deviceId, defaultTab, identify));
        // },
        // initRuleFloatTab: identify => {
        //     dispatch(initRuleFloatTab(identify));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloatTabCont);
