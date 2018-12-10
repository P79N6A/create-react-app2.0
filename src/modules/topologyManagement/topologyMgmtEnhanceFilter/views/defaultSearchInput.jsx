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
import PropTypes from "prop-types";
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import { predicateChanged } from "../funcs/actions";
import { connect } from "react-redux";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
import { CreatedPredicate } from "../funcs/createPredicate";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import FormControl from "@material-ui/core/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit
    },
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: "100%"
    }
});

class DefaultSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            selectAppRespath: this.props.selectAppRespath
        };
        this.timer = {};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentTab === nextProps.currentTab) {
            return;
        }
        let filterConfigType = "";
        let applicationFilter = [];
        if (!nextProps.currentTab) {
            filterConfigType = [{ filterConfigType: "searchByPathandName", defaultValue: this.state.searchText }];
            if (this.state.selectAppRespath) {
                filterConfigType.push({
                    filterConfigType: "Application ID",
                    defaultValue: this.state.selectAppRespath
                });
                applicationFilter.push({
                    filterConfigType: "Application ID",
                    defaultValue: this.state.selectAppRespath
                });
            }
        } else {
            filterConfigType = [{ filterConfigType: "searchByDevicetype", defaultValue: this.state.searchText }];
        }
        for (let j = 0; j < filterConfigType.length; j++) {
            var { predicate, filterArr } = CreatedPredicate(
                filterConfigType[j].defaultValue,
                filterConfigType[j].filterConfigType,
                applicationFilter
            );
        }
        // let { predicate, filterArr } = CreatedPredicate(this.state.searchText, filterConfigType, applicationFilter);
        this.props.predicateChanged(this.props.identify, predicate, filterArr);
    }

    handleSearchClick(event) {
        let filterConfigType = "";
        if (!this.props.currentTab) {
            filterConfigType = "searchByPathandName";
        } else {
            filterConfigType = "searchByDevicetype";
        }
        let { predicate, filterArr } = CreatedPredicate(this.state.searchText, filterConfigType, this.props.filterArr);
        this.props.predicateChanged(this.props.identify, predicate, filterArr);
    }

    handleInputKeyUp(event) {
        if (event.keyCode === 13) {
            this.handleSearchClick(event);
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

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <TextField
                    style={{ justifyContent: "center", width: "247px" }}
                    className="default-input-search"
                    label={!this.props.currentTab ? this.props.searchLabelDevice : this.props.searchLabelDeviceType}
                    value={this.state.searchText}
                    onChange={this.handleInputChanged.bind(this)}
                    onKeyUp={this.handleInputKeyUp.bind(this)}
                    // fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faSearch} onClick={this.handleSearchClick.bind(this)} />
                                {/* <SearchIcon onClick={this.handleSearchClick.bind(this)} color="action" /> */}
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
        );
    }
}

DefaultSearchInput.propTypes = {
    filterConfigType: PropTypes.string,
    searchLabelDevice: PropTypes.string
};

DefaultSearchInput.defaultProps = {
    filterConfigType: "searchByPathandName",
    searchLabelDevice: "Search by Device Name",
    searchLabelDeviceType: "Search by Device Type Name"
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentTab:
            state[topoReducerName] && state[topoReducerName][identify] && state[topoReducerName][identify].currentTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DefaultSearchInput));
