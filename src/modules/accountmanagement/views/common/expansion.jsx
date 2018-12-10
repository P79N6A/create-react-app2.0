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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
// import { theme as themes } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    // Typography,
    ExpansionPanelDetails,
    // Checkbox,
    Button
    // Icon,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";
import Head from "./listHead";
// import { JSONSchema } from "../../jsonSchema/index";
import { JSONSchema } from "../../common/jsonSchema/index";
const styles = theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    "account-contact-detail": {
        display: "block"
    },
    "account-contact-summary": {
        paddingLeft: theme.spacing.unit
    },
    "account-contact-summary-main": {
        paddingLeft: theme.spacing.unit * 3
    },
    "account-contact-delete": {
        paddingRight: theme.spacing.unit * 0.5
    },
    "account-set-primary": {
        textAlign: "center",
        margin: "24px auto 0px"
    },
    "account-main-icon": {
        padding: 0,
        width: "calc(100% - 16px)"
    }
});
class Expansions extends React.Component {
    state = {
        checked: false,
        expanded: false,
        title: "",
        initState: {}
    };
    handleChange = ids => e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let checked = e.target.checked;
        this.setState({
            checked: checked,
            expanded: this.state.expanded
        });
        this.props.checkHandle(ids, checked);
    };
    onChangeExpanel = (e, expanded) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            expanded
        });
    };
    clickListItemHandle = ids => e => {
        this.props.removeItem(ids);
    };
    setPrimaryHandle = ids => e => {
        this.props.setPrimaryHandle(ids);
    };
    getFormData = values => {
        const { ids } = this.props;
        // this.setState({
        //     title: values[titleKey]
        // });
        this.props.getFormData(ids, values);
    };
    // shouldComponentUpdate(nextProps, nextState) {
    //     // const { initState, ids, columns } = nextProps;
    //     if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)) return false;
    //     return true;
    // }
    render() {
        const { classes, columns = {}, ids, titleKey, initState = {} } = this.props;
        const { expanded } = this.state;
        // const formData = Object.assign.apply({}, columns.map(n => ({ [n.name]: n.value })));
        let title = initState[titleKey];
        let isPrimary = true;
        if (columns.hasOwnProperty("sameasaddress")) {
            isPrimary = false;
        }
        return (
            <ExpansionPanel onChange={this.onChangeExpanel} expanded={expanded}>
                <ExpansionPanelSummary
                    className={classes["account-contact-summary-main"]}
                    // className={classes[!isPrimary ? "account-contact-summary" : "account-contact-summary-main"]}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Head
                        className={classes["account-main-icon"]}
                        icon={isPrimary ? "brightness_1" : ""}
                        title={title || (isPrimary ? "Primary Contact" : "Secondary Contact")}
                    />
                </ExpansionPanelSummary>
                {!isPrimary && (
                    <div className={classes["account-contact-delete"]}>
                        <Head icon="delete" clickListItemHandle={this.clickListItemHandle(ids)} />
                    </div>
                )}
                <ExpansionPanelDetails className={classes["account-contact-detail"]}>
                    {/* <Form validate={true} columns={columns} getFormData={this.getFormData} /> */}
                    <JSONSchema initState={initState} schema={columns} getDatas={this.getFormData} />
                    {!isPrimary && (
                        <div className={classes["account-set-primary"]}>
                            <Button onClick={this.setPrimaryHandle(ids)} variant="outlined" color="secondary">
                                Set As Primary Contact
                            </Button>
                        </div>
                    )}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
Expansions.defaultProps = {};
Expansions.propTypes = {
    classes: PropTypes.object,
    getFormData: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    checkHandle: PropTypes.func.isRequired
};

export default withStyles(styles)(Expansions);
