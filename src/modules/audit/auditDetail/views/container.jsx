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
 * Created by SongCheng on 31/08/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "../styles/style.less";
import CardHeader from "@material-ui/core/CardHeader";
import { Drawer } from "modules/common";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import TabDetail from "./tabDetail";
import _ from "lodash";
import moment from "moment";

const drawerWidth = 400;

const styles = theme => ({
    paper: {
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        overflow: "hidden",
        transform: `translate(${10 * drawerWidth}px, 0px)`
    }
});

class AuditDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ojbData: null,
            treeItem: [],
            itemId: null
        };
    }

    componentWillReceiveProps(nextProps) {
        let identify = nextProps.identify;
        let dateStyle = nextProps[identify] && nextProps[identify].dateStyle;
        let contentBody = nextProps[identify] && nextProps[identify].contentBody;
        let isActive = (nextProps[identify] && nextProps[identify].isActive) || [];

        if (nextProps[identify].detailData && nextProps[identify].detailData.length > 0) {
            let arrAll = [];
            let original = nextProps[identify].detailData[0];
            let id = nextProps[identify].detailData[0].id;
            let isEQ = _.isEqual(isActive[0], this.state.itemId);

            original.requestcontent = isEQ ? contentBody : "";
            this.setState({
                ojbData: original
            });

            _.forEach(original, function(value, key) {
                let obj = {
                    key: key,
                    value: key === "requesttime" || key === "responsetime" ? moment(value).format(dateStyle) : value
                };
                arrAll.push(obj);
            });
            this.setState({
                treeItem: arrAll,
                itemId: id
            });
        } else {
            this.setState({
                ojbData: {}
            });
        }
    }

    handleDrawerClose = () => {
        this.props.DrawerToggle(false, "right", []);
    };

    handleRequestContent = id => {
        this.props.requestContent(id);
    };

    render() {
        const { classes, showItems, identify, anchor } = this.props;
        const identifyData = this.props[identify];
        const showItemsNew = (identifyData && identifyData.showItems) || showItems;
        const anchorNew = (identifyData && identifyData.anchor) || anchor;

        return (
            <Drawer
                variant="persistent"
                anchor={anchorNew}
                open={showItemsNew}
                classes={{
                    paper: classes.paper
                }}
            >
                <CardHeader
                    action={
                        <IconButton onClick={this.handleDrawerClose}>
                            <Icon>clear</Icon>
                        </IconButton>
                    }
                    title="Audit Detail"
                />
                <TabDetail
                    {...this.props}
                    handleRequestContent={this.handleRequestContent.bind(this)}
                    treeItem={this.state.treeItem}
                    ojbData={this.state.ojbData}
                    itemId={this.state.itemId}
                />
            </Drawer>
        );
    }
}

AuditDetail.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => {
    return state.audit || {};
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(AuditDetail));
