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
 * Created by wplei on 25/05/18.
 */
import React from "react";
import { Icon } from "@material-ui/core";
import propTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => {
    return {
        previewcenter_root: {
            width: "100%",
            height: "33%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: theme.spacing.unit * 3,
            paddingRight: theme.spacing.unit * 3,
            pointerEvents: "none",
            zIndex: 1101
        },
        previewcenter_placeholser_icon: {
            fontSize: 100
        }
    };
};

class PreviewCentre extends React.Component {
    state = {
        properties: null
    };
    static propTypes = {
        classes: propTypes.object.isRequired,
        ccmsAction: propTypes.any,
        id: propTypes.string,
        PreviewElement: propTypes.any,
        onPreviewPropsChange: propTypes.func
    };
    static defaultProps = {
        PreviewElement: null,
        properties: null,
        id: null,
        ccmsAction: null,
        onPreviewPropsChange: () => {}
    };
    componentWillReceiveProps = nextProp => {
        const { PreviewElement, ccmsAction, properties, id } = nextProp;
        const { excuteActionFromWidget } = this.props;
        this.setState(
            {
                PreviewElement,
                properties,
                id
            },
            () => {
                if (ccmsAction && id && properties) {
                    excuteActionFromWidget(ccmsAction, properties, id);
                }
            }
        );
    };
    resize = () => {
        this.container.updateSize();
    };
    render = () => {
        const { classes } = this.props;
        const { PreviewElement, properties, id } = this.props;
        return (
            <div className={classes.previewcenter_root}>
                {PreviewElement ? (
                    <PreviewElement get={node => (this.container = node)} identify={id} {...properties} />
                ) : (
                    <Icon className={classes.previewcenter_placeholser_icon}>photo</Icon>
                )}
            </div>
        );
    };
}

const mapDispatchToProp = dispatch => {
    return {
        excuteActionFromWidget: (ccmsAction, properties, id) => {
            dispatch(ccmsAction(properties, id));
        }
    };
};

export default connect(
    null,
    mapDispatchToProp
)(withStyles(styles)(PreviewCentre));
