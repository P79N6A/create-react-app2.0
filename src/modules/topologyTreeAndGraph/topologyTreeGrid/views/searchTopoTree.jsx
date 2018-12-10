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
 * Created by xulu on 31/08/2018.
 */
import React from "react";
import "../styles/style.less";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { reducerName as topoTreeReducerName } from "modules/topologyTreeAndGraph/topologyTreeGrid";

const styles = Theme => ({
    root: {
        height: "100%"
    }
});

class SearchTopoTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: this.props.searchText
        };
        this.timer = {};
    }

    componentDidMount() {
        // this.props.searchTopoTreeDataFunc(this.props.identify, this.state.searchText);
    }

    componentWillReceiveProps(nextProps) {
        // search topo tree data successs
        if (this.props.resetTopoTree !== nextProps.resetTopoTree && nextProps.resetTopoTree) {
            this.setState({
                searchText: ""
            });
            this.props.searchTopoTreeDataFunc(this.props.identify, "");
            this.props.clearRootNode(this.props.identify);
        }
        if (this.props.searchText !== nextProps.searchText && nextProps.searchText) {
            this.setState({
                searchText: nextProps.searchText
            });
            this.props.searchTopoTreeDataFunc(this.props.identify, nextProps.searchText);
            // this.props.clearRootNode(this.props.identify);
        }
    }

    handleInputChanged(event) {
        this.setState({
            searchText: event.target.value
        });
        let identify = this.props.identify;
        if (!event.target.value) {
            clearTimeout(this.timer[identify]);
            this.timer[identify] = setTimeout(() => {
                this.handleSearchClick(event);
            }, 500);
        }
    }

    handleInputKeyUp(event) {
        if (event.keyCode === 13) {
            let identify = this.props.identify;
            clearTimeout(this.timer[identify]);
            this.timer[identify] = setTimeout(() => {
                this.handleSearchClick(event);
            }, 500);
        }
    }

    handleSearchClick() {
        let searchText = this.state.searchText;
        this.props.searchTopoTreeDataFunc(this.props.identify, searchText);
    }

    handleRefreshTopoTreeFunc() {}

    render() {
        const {classes} = this.props;
        return (
            <div style={{height:"56px"}}>
                <TextField
                    style={{ justifyContent: "center", width: "100%", height: "100%" }}
                    className="default-input-search"
                    placeholder={this.props.searchLabel}
                    value={this.state.searchText}
                    onChange={this.handleInputChanged.bind(this)}
                    onKeyUp={this.handleInputKeyUp.bind(this)}
                    // fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon onClick={this.handleSearchClick.bind(this)} color="action" />
                            </InputAdornment>
                        ),
                        classes: { root: classes.root }
                    }}
                />
                {/* <Tooltip title="Reset">
                    <IconButton aria-label="Location" onClick={this.handleRefreshTopoTreeFunc.bind(this)}>
                        <LocationIcon />
                    </IconButton>
                </Tooltip> */}
            </div>
        );
    }
}

SearchTopoTree.propTypes = {
    identify: PropTypes.string
};

SearchTopoTree.defaultProps = {
    searchLabel: "Search"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        resetTopoTree: filterProps(state, identify, topoTreeReducerName, "resetTopoTree")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // searchTopoTreeData: (identify, roles, iotId, callback) => {
        //     dispatch(searchTopoTreeData(identify, roles, iotId, callback));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchTopoTree));
