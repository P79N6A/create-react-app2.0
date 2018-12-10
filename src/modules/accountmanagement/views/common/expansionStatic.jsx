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
import { ExpansionPanel, ExpansionPanelSummary, Typography, Icon, Checkbox, IconButton } from "@material-ui/core";
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
    "account-contact-expanicon": {
        right: -4
    }
});
class ExpansionsStatic extends React.Component {
    state = {
        checked: false,
        expanded: false,
        title: ""
    };
    handleChange = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let checked = e.target.checked;
        this.setState({
            checked: checked
        });
        this.props.checkedHandle(checked);
    };
    onChangeExpanel = (e, expanded) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            expanded
        });
    };
    render() {
        const { classes } = this.props;
        const { checked = false } = this.state;
        return (
            <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary
                    classes={{ expandIcon: classes["account-contact-expanicon"] }}
                    className={classes["account-contact-summary"]}
                    expandIcon={
                        <IconButton onClick={this.props.clickListItemHandle}>
                            <Icon>add</Icon>
                        </IconButton>
                    }
                >
                    <Typography variant="h6" className={classes.heading}>
                        <Checkbox checked={!!checked} onChange={this.handleChange} value="checked" />
                        Same as Primary contact
                    </Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        );
    }
}
ExpansionsStatic.defaultProps = {};
ExpansionsStatic.propTypes = {
    classes: PropTypes.object,
    removeItem: PropTypes.func.isRequired,
    checkHandle: PropTypes.func.isRequired
};

export default withStyles(styles)(ExpansionsStatic);
