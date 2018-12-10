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
 * Created by Krishalee on 30/11/2018.
 */
import React from "react";
import { FormControl, InputAdornment, IconButton } from "@material-ui/core";
import { Input } from "modules/common/index";
import { withStyles } from "@material-ui/core/styles";
import { theme as themes } from "modules/theme";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { REDUCER_NAME } from "../funcs/constants";
import { connect } from "react-redux";
import { getFileHistory } from "../funcs/actions";

const styles = theme => ({
    underlines: {
        color: themes.palette.text.primary + "!important",
        "&:before": {
            // borderBottom: "1px solid " + themes.palette.text.primary
        }
        // "&:after": {
        //     borderBottom: "2px solid " + themes.palette.text.primary
        // }
    },
    margin: {
        marginRight: theme.spacing.unit * 2,
        verticalAlign: "middle"
    }
});

class Search extends React.Component {
    state = {
        search: ""
    };
    handleChange = e => {
        this.setState({
            search: e.target.value.trim()
        });
    };
    searchHandle = () => {
        console.log("test");
        let postData = this.props.postData;
        let searchPredicate = this.props.searchPredicate;
        searchPredicate.value = this.state.search;
        postData.predicate = searchPredicate;
        this.props.searchbyFilename(postData);
    };
    keydownHandle = e => {
        if (e.keyCode === 13) {
            this.searchHandle(this.state.search);
        }
    };
    render() {
        const { classes } = this.props;
        const { search, placeholder = "" } = this.props;
        return (
            <FormControl className={classnames(classes.margin, classes.textField)}>
                <Input
                    // id="adornment-search"
                    value={search}
                    onChange={this.handleChange}
                    onKeyDown={this.keydownHandle}
                    className={classes.underlines}
                    name="search"
                    placeholder={placeholder}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                // style={{ height: "32px", width: "32px" }}
                                onClick={this.searchHandle.bind(this)}
                                // onMouseDown={this.handleMouseDownPassword}
                            >
                                {/* <Icon>search</Icon> */}
                                <FontAwesomeIcon icon={faSearch} size="xs" />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
}

const mapStateToProps = (state, ownedProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = dispatch => {
    return {
        searchbyFilename: param => {
            dispatch(getFileHistory(param));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Search));
