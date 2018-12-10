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
 * Created by LWP on 17/10/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardHeader, Button, Paper } from "@material-ui/core";
import { Input } from "modules/common";
import { withStyles } from "@material-ui/core/styles";

/**
 * [SearchBar search condition for appLibrary]
 * @extends Component
 */

const styles = Theme => {
    return {
        paperRoot: {
            padding: `${Theme.spacing.unit / 2}px ${Theme.spacing.unit * 3}px`
        }
    };
};
class SearchBar extends Component {
    state = {
        search_app_name: "",
        searchAppName: ""
    };
    static defaultProps = {
        onSearch: () => {}
    };
    static propTypes = {
        onSearch: PropTypes.func
    };
    componentDidMount = () => {
        document.addEventListener("keyup", this.enterKeyPress);
    };
    componentWillUnmount = () => {
        document.removeEventListener("keyup", this.enterKeyPress);
    };
    enterKeyPress = event => {
        if (event.keyCode === 13) {
            this.handleChange("search");
        }
    };
    handleChange = (type, event) => {
        const { onSearch } = this.props;
        switch (type) {
            case "appname":
                this.setState({
                    searchAppName: event.target.value
                });
                break;
            case "search":
                const { searchAppName } = this.state;
                onSearch({
                    "address.displayName": searchAppName
                });
                break;
            default:
                break;
        }
    };
    render = () => {
        const { searchAppName } = this.state;
        const { classes } = this.props;
        return (
            <CardHeader
                title=""
                action={
                    <Paper
                        classes={{
                            root: classes.paperRoot
                        }}
                    >
                        <Input
                            placeholder="Search By Name..."
                            name="applicationName"
                            value={searchAppName}
                            onChange={event => this.handleChange("appname", event)}
                        />
                        <Button color="secondary" onClick={() => this.handleChange("search")}>
                            Search
                        </Button>
                    </Paper>
                }
            />
        );
    };
}

export default withStyles(styles)(SearchBar);
