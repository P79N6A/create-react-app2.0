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
// import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
// import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
const styles = theme => ({
    tabsIndicator: {backgroundColor: theme.palette.secondary.main}
});
class FloatTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getconditionSuccess: true
        };
    }
    componentWillMount(){
        this.setState({
            getconditionSuccess: this.props.getconditionSuccess
        });
    }
    
    componentWillReceiveProps(newProps) {
        if(_.isEqual(newProps.getconditionSuccess,this.props.getconditionSuccess)){
            return;
        }
        this.setState({
            getconditionSuccess: newProps.getconditionSuccess
        });
        
    }
    render() { 
        const {getconditionSuccess} = this.state;
        const {classes} = this.props;
        return (
            this.props.tabs.map((item, index) => {
                return <Tab key={index} label={item.tabDisName}  textColorSecondary classes={{indicator: classes.tabsIndicator}} disabled={getconditionSuccess?false:true}/>;
            })
        );
    }
}

FloatTab.propTypes = {
    getconditionSuccess: PropTypes.bool.isRequired
};

FloatTab.defaultProps = {
    getconditionSuccess: true
};

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


export default withStyles(styles)(connect(
    mapStateToProps,
    null
)(FloatTab));
