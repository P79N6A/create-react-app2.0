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
import { connect } from "react-redux";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import MappingComp from "./mappingComp";

class RuleInfo extends React.Component {
    static propTypes = {
        classes: PropTypes.object
    };
   
    RuleInfoSchema() {
        const { ruleSchema } = this.props;
        let result = [];
        for (let i in ruleSchema) {
            result.push(
                <ListItem key={i}>
                    <MappingComp
                        data={ruleSchema[i]}
                        label={i}
                        getRuleInfoConfig={this.props.getRuleInfoConfig}
                        ruleInfoConfig={this.props.ruleInfoConfig}
                        updateFlag={this.props.updateFlag}
                        handleShowTime={this.props.handleShowTime}
                        showTime={this.props.showTime}
                        getDeviceConfig={this.props.getDeviceConfig}
                        identify={this.props.identify}
                        sitename={this.props.sitename}
                        regexValidate={this.props.regexValidate}
                    />
                </ListItem>
            );
        }
        return result;
    }
    
    generateGeneral() {
        const {getconditionSuccess} =this.props;
        return (
            <List className="rule-group">
                {this.RuleInfoSchema()}
                {(getconditionSuccess!==undefined && !getconditionSuccess) &&
                    <div className="progress-cont">
                        <CircularProgress color="secondary" />
                    </div>}
            </List>
        );
    }
   
    render() {
        return this.generateGeneral();
    }
}
const filterProps = (state, identify, props) => {
    if (state[ruleFloatTabReducer] && state[ruleFloatTabReducer][identify]) {
        return state[ruleFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        getconditionSuccess: filterProps(state, identify, "getconditionSuccess")
    };
};


export default connect(mapStateToProps,null)(RuleInfo);
