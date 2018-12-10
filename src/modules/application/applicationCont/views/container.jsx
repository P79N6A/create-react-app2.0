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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
// import PropTypes from "prop-types";
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { view as TreeViews } from "modules/application/topologyTree";
import { view as ListViews } from "modules/application/applicationGrid";
import SplitPane from "react-split-pane";
// import TopoTree from "./topoTree";
import Card from "@material-ui/core/Card";
// import { view as FloatTabCont } from "modules/application/applicationFloatTab";
import { closeFloatTab } from "../funcs/actions";

// const drawerWidth = 400;
const styles = theme => ({
    card: {
        backgroundColor: theme.palette.primary.light,
        overflowX: "hidden",
        position: "relative",
        height: "100%"
    }
});

class TopoTreeAndGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            needReset: this.props.needReset
        };
    }

    handleResetClick() {
        // this.props.topoTreeReset(this.props.identify);
        this.setState({
            needReset: true
        });
    }

    render() {
        const { identify, classes } = this.props;
        return (
            <div id={identify} style={{ height: "100%" }} className="applicationlist">
                <SplitPane split="vertical" minSize={350} maxSize={800} allowResize style={{ position: "relative" }}>
                    <Card className="topo-tree-graph-cont" classes={{ root: classes.card }}>
                        <TreeViews identify={identify} needReset={this.state.needReset} />
                    </Card>
                    <ListViews identify={identify} />
                </SplitPane>
                {/* <FloatTabCont
                        identify={this.props.identify}
                        handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                    /> */}
            </div>
        );
    }
}

TopoTreeAndGraph.propTypes = {};

TopoTreeAndGraph.defaultProps = {
    title: "Application tree",
    identify: "Applicationtest",
    needReset: false
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopoTreeAndGraph));
