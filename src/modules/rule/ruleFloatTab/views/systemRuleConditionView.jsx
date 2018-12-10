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
 * Created by Wangrui on 22/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import classnames from "classnames";
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 48px)"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "calc(100% - 72px)",
        overflowY: "auto",
        padding: "0"
    },
    textColor: {
        color: theme.palette.secondary.main
    },
    ruleGeneral: {
        height: "100%"
    }
});
class RuleCondition extends React.Component {
    constructor() {
        super();
        this.state = {
            config: {},
            expanded: null
        };
    }
    componentWillMount() {
        if (this.props.saveConfigs && this.props.saveConfigs["ruleCondition"]) {
            this.setState({ config: this.props.saveConfigs["ruleCondition"] });
            return;
        }
        let { config } = this.state;
        const { configData } = this.props;
        if (Object.keys(configData).length > 0) {
            config = configData.configvals && configData.configvals[0] && configData.configvals[0].configval && JSON.parse(configData.configvals[0].configval);
        }
        this.setState({ config });
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    renderCondition = (conditionConfig) => {
        let condition =
        conditionConfig &&
        conditionConfig.condition;
        let result = [];
        result.push(
            <ListItem button key="condition">
                <ListItemText
                    primary={<span>{condition}</span>}
                    secondary="condition"
                    title="condition"
                    style={{ wordBreak: "break-all" }}
                />
            </ListItem>
        );
        return result;
    }
    renderParamtersList() {
        const { config } = this.state;
        const { classes } = this.props;
        return (
            <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                <div className="ruleGeneral-content">
                    <div className={classes.instructions}>
                        {this.renderCondition(config)}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>{this.renderParamtersList()}</div>;
    }
}

RuleCondition.propTypes = {
    configData: PropTypes.object,
    deviceModelName: PropTypes.string
};

RuleCondition.defaultProps = {
    configData: {},
    deviceModelName: "",
};

const filterProps = (state, identify, props) => {
    if (state[ruleFloatTabReducer] && state[ruleFloatTabReducer][identify]) {
        return state[ruleFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        configData: filterProps(state, identify, "configData"),
        deviceModelName: filterProps(state, identify, "deviceModelName"),
    };
};


export default withStyles(styles)(
    connect(
        mapStateToProps,
        null
    )(RuleCondition)
);
