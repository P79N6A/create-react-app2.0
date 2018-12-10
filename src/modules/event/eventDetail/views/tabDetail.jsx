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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import "../styles/style.less";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import moment from "moment";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import _ from "lodash";
import { nameMapping } from "modules/event/eventList";

const styles = theme => ({
    paper: {},
    sticky: {
        backgroundColor: theme.palette.primary.light
    }
});
class TabDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStyle: this.props.dateStyle,
            searchText: ""
        };
    }

    handleSearchClick = () => {
        // this.props.detailSearch(this.state.searchText);
        this.renderDeviceData();
    };

    handleInputChanged(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    handleInputKeyUp(event) {
        if (event.keyCode === 13) {
            this.handleSearchClick(event);
        }
    }

    renderDeviceData() {
        let arrAll = this.props.treeItem;
        let loop = [];
        let dataFormat = this.props.dateStyle;
        let tree = {};
        let keyWord = this.state.searchText.toLowerCase();
        arrAll.forEach((item, index) => {
            if (keyWord.length === 0) {
                const { type, ...otherData } = item;
                tree[item.type] = tree[item.type] || [];
                tree[item.type].push(otherData);
            } else if (
                JSON.stringify(item.value)
                    .toLowerCase()
                    .indexOf(keyWord) !== -1 ||
                JSON.stringify(item.key)
                    .toLowerCase()
                    .indexOf(keyWord) !== -1 ||
                JSON.stringify(item.type)
                    .toLowerCase()
                    .indexOf(keyWord) !== -1
            ) {
                const { type, ...otherData } = item;
                tree[item.type] = tree[item.type] || [];
                tree[item.type].push(otherData);
            }
        });

        for (let key in tree) {
            loop.push(
                <li style={{ paddingLeft: "0" }} key={key}>
                    <ul>
                        <ListSubheader
                            classes={{
                                sticky: this.props.classes.sticky
                            }}
                        >
                            {key}
                        </ListSubheader>
                        {tree[key].map((item, index) => {
                            const newName = _.filter(nameMapping, obj => {
                                return obj.key === item.key;
                            });
                            return (
                                <ListItem button key={index}>
                                    <ListItemText
                                        className="listItemText"
                                        title={
                                            item.key === "sentdatetime" ||
                                            item.key === "effective" ||
                                            item.key === "lastupdatetime"
                                                ? moment(item.value).format(dataFormat)
                                                : _.isBoolean(item.value)
                                                    ? item.value.toString()
                                                    : item.value
                                        }
                                        primary={
                                            item.key === "sentdatetime" ||
                                            item.key === "effective" ||
                                            item.key === "lastupdatetime"
                                                ? moment(item.value).format(dataFormat)
                                                : _.isBoolean(item.value)
                                                    ? item.value.toString()
                                                    : item.value
                                        }
                                        secondary={
                                            item.key === "sentdatetime"
                                                ? "Send Time"
                                                : newName[0]
                                                    ? newName[0].displayName
                                                    : item.key
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </ul>
                </li>
            );
        }

        loop =
            loop.length !== 0 ? (
                loop
            ) : (
                <ListItem>
                    <Typography>no result...</Typography>
                </ListItem>
            );

        return loop;
    }

    render() {
        return (
            <div className="detail">
                <ListItem>
                    <TextField
                        placeholder="Search"
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
                </ListItem>
                <div className="detailCont">
                    <List subheader={<li />} className="tree">
                        {this.props.treeItem && this.renderDeviceData()}
                    </List>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TabDetail);
