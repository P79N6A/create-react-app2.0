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
import SearchIcon from "@material-ui/icons/Search";
import { CreatedPredicate } from "../funcs/createPredicate";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
});

class DefaultSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        };
        this.timer = {};
    }

    handleSearchClick(event) {
        let { predicate, filterArr } = CreatedPredicate(
            this.state.searchText,
            this.props.filterConfigType,
            this.props.filterArr
        );
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
        return (
            <TextField
                style={{justifyContent:"center"}}
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
                    )
                }}
            />
        );
    }
}

DefaultSearchInput.propTypes = {
    filterConfigType: PropTypes.string,
    searchLabel: PropTypes.string
};

DefaultSearchInput.defaultProps = {
    filterConfigType: "searchByPathandName",
    searchLabel: "Search By Application ID/name"
};

const mapDispatchToProps = dispatch => {
    return {
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(DefaultSearchInput));
