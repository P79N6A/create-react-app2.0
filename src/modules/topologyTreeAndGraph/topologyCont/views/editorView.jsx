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
import { connect } from "react-redux";
import "../styles/style.less";
import { editorControlProps } from "../funcs/actions";
import { TextField } from "modules/common";
import { reducerName as topoGraphReducerName } from "modules/topologyTreeAndGraph/topologyGraph";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class TopologyTreeEditerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            containerType: this.props.containerType
        };
    }

    componentWillMount() {
        this.props.get && this.props.get(this);
    }

    handleInputSelectChanged(propertyType, event) {
        this.setState(
            Object.assign(this.state, {
                [propertyType]: event.target.value
            })
        );
        this.props.editorControlProps(this.props.identify, this.state);
    }

    getData = () => {
        this.props.editorControlProps(this.state);
        return JSON.parse(JSON.stringify(this.state));
    };

    render() {
        return (
            <List>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleInputSelectChanged.bind(this, "title")}
                        fullWidth
                    />
                </ListItem>
            </List>
        );
    }
}

TopologyTreeEditerView.defaultProps = { title: "Topology Tree and Graph" };

const mapStateToProps = (state, ownProps) => {
    return {
        // title: store && store.title === undefined ? title : store.title
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editorControlProps: (identify, editorState) => {
            dispatch(editorControlProps(identify, editorState));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyTreeEditerView);
