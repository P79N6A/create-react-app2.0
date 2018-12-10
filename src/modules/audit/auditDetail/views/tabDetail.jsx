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
import "../styles/style.less";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Description from "@material-ui/icons/Description";
import CircularProgress from "@material-ui/core/CircularProgress";

class TabDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStyle: this.props.dateStyle,
            searchText: ""
        };
    }

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
    handleSearchClick = () => {
        // this.props.detailSearch(this.state.searchText);
        this.renderDeviceData();
    };

    renderDeviceData = () => {
        let arrAll = this.props.treeItem;
        let keyWord = this.state.searchText.toLowerCase();
        let loop = [];
        let tree = {};

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
                        {tree[key].map((item, index) => (
                            <ListItem button key={index}>
                                <ListItemText
                                    className="listItemText"
                                    secondary={item.key}
                                    primary={item.value ? item.value : ""}
                                    title={item.value}
                                />
                                {item.key === "requestcontent" ? (
                                    <Description
                                        onClick={this.props.handleRequestContent.bind(this, this.props.itemId)}
                                    />
                                ) : null}
                            </ListItem>
                        ))}
                    </ul>
                </li>
            );
        }

        loop = loop.length !== 0 ? loop : <ListItem>no result...</ListItem>;
        return loop;
    };

    render() {
        const { treeItem } = this.props;
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

                {treeItem.length === 0 ? (
                    <div className="progressBox">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <div className="detailCont">
                        <List subheader={<li />} className="tree">
                            {this.props.treeItem && this.renderDeviceData()}
                        </List>
                    </div>
                )}
            </div>
        );
    }
}

export default TabDetail;
