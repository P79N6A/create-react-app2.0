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
 * Created by wplei on 10/06/18.
 */
import React from "react";
import { Input } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import EleContainer from "./elementContainer";
import { InputLabel } from "@material-ui/core";
import propTypes from "prop-types";

const styles = theme => {
    return {
        label_root: {
            marginRight: theme.spacing.unit * 3
        }
    };
};

class IscNumberInout extends React.Component {
    state = {
        value: null,
        greatItem: null
    };
    static defaultProps = {
        textProps: {
            label: "",
            value: ""
        }
    };
    static propTypes = {
        textProps: propTypes.shape({
            label: propTypes.string,
            value: propTypes.number
        })
    };
    componentWillReceiveProps = nextProps => {
        this.setState({
            greatItem: nextProps.greatItem
        });
    };
    componentWillMount = () => {
        const { greatItem } = this.props;
        this.setState({
            greatItem
        });
    };
    handleTextChange = event => {
        const value = event.target.value;
        let { greatItem } = this.state;

        this.props.onElementChange(
            Object.assign({}, greatItem, {
                value: Number(value)
            })
        );
    };
    render = () => {
        const { classes } = this.props;
        const { label, value } = this.props.textProps;
        return (
            <EleContainer>
                <InputLabel classes={{ root: classes.label_root }}>{label}</InputLabel>
                <Input value={value} type="number" onChange={this.handleTextChange} />
            </EleContainer>
        );
    };
}

export default withStyles(styles)(IscNumberInout);
