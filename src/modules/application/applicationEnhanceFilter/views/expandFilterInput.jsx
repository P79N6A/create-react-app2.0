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
import "../styles/style.less";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CreatedPredicate } from "../funcs/createPredicate";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import { predicateChanged, filtersValueChanged } from "../funcs/actions";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: "100%"
    }
});

class ExpandFilterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter,
            searchText: this.props.filter.defaultValue
        };
        this.timer = {};
    }

    handleSearchClick(event) {
        let { predicate, filterArr } = CreatedPredicate(
            this.state.searchText,
            this.props.filter.filterConfigType,
            this.props.filterArr
        );
        this.props.predicateChanged(this.props.identify, predicate, filterArr);
        let filterConfig = this.props.filterConfig;
        for (let i = 0; i < filterConfig.length; i++) {
            if (filterConfig[i].filterName === this.state.filter.filterConfigType) {
                filterConfig[i].defaultValue = this.state.searchText;
            }
        }
        this.props.filtersValueChanged(this.props.identify, filterConfig);
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
        let filter = this.props.filter;
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <TextField
                    className="expand-filter-input"
                    label={filter.filterConfigType}
                    value={this.state.searchText}
                    onChange={this.handleInputChanged.bind(this)}
                    onKeyUp={this.handleInputKeyUp.bind(this)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon onClick={this.handleSearchClick.bind(this)} color="action" />
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        },
        filtersValueChanged: (identify, filterConfig) => {
            dispatch(filtersValueChanged(identify, filterConfig));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ExpandFilterInput));
