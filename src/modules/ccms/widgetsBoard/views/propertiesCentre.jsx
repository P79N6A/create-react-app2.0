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
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import propType from "prop-types";
import Wrap from "commons/components/wrapComponent";
let storeContainer = null;

const styles = theme => {
    return {
        property_centre_root: {
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            // padding: `0 ${theme.spacing.unit * 3}px`,
            "&::-webkit-scrollbar": {
                backgroundColor: "transparent !important"
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent !important",
                borderRadius: 3
            },
            "&:hover::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(6, 14, 27, 0.5) !important"
            },
            position: "relative"
        },
        property_textarea: {
            width: "100%",
            height: "100%"
        }
    };
};

const LoadingBox = () => {
    return (
        <div
            style={{
                top: 64,
                left: 0,
                bottom: 50,
                width: "100%",
                height: "calc(100% - 64px)",
                zIndex: 999999,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,.2)"
            }}
        >
            <CircularProgress color="secondary" />
        </div>
    );
};
class PropertyCentre extends React.Component {
    state = {
        loading: false
    };
    static defaultProps = {
        visualEditer: null,
        properties: null,
        id: null,
        onPropsChange: () => {}
    };
    static propTypes = {
        id: propType.string,
        mode: propType.bool,
        properties: propType.any,
        ccmsAction: propType.any,
        onPropsChange: propType.func
    };
    componentWillMount = () => {
        this.componentWillReceiveProps(this.props);
    };
    componentWillReceiveProps = nextProps => {
        const { VisualEditer, properties, id } = nextProps;
        this.setState({
            VisualEditer,
            properties,
            id
        });
    };
    componentDidMount = () => {
        this.props.get(this);
    };
    getNode = node => {
        storeContainer = node;
    };
    getProps = () => {
        try {
            if (storeContainer) {
                return storeContainer.getData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    callLoading = flag => {
        this.setState({
            loading: flag
        });
    };
    render = () => {
        const { classes, onSaveLock, app } = this.props;
        const { VisualEditer, properties, id, loading } = this.state;
        return (
            <Wrap>
                <div className={classes.property_centre_root}>
                    {!!VisualEditer && (
                        <VisualEditer
                            currentApplicationInfo={app}
                            identify={id}
                            get={this.getNode}
                            lockSave={onSaveLock}
                            callLoading={this.callLoading}
                            {...JSON.parse(JSON.stringify(properties))}
                        />
                    )}
                </div>
                {loading && <LoadingBox />}
            </Wrap>
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
)(withStyles(styles)(PropertyCentre));
