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
import "../styles/style.less";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { nameMapping } from "modules/alarm/alarmList";
import _ from "lodash";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { MapApplication } from "modules/map";

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
                <ExpansionPanel key={key}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">{key}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: "block", padding: "8px 0 24px 0" }}>
                        {tree[key].map((item, index) => {
                            const newName = _.filter(nameMapping, obj => {
                                return obj.key === item.key;
                            });
                            return (
                                <ListItem button key={index}>
                                    <ListItemText
                                        className="listItemText"
                                        title={
                                            item.key === "sentdatetime" || item.key === "effective"
                                                ? moment(item.value).format(dataFormat)
                                                : _.isBoolean(item.value)
                                                    ? item.value.toString()
                                                    : item.value
                                        }
                                        primary={
                                            item.key === "sentdatetime" || item.key === "effective"
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        }
        loop =
            loop.length !== 0 ? (
                loop
            ) : (
                <ListItem style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <Typography>no result...</Typography>
                </ListItem>
            );
        return loop;
    }

    //check coordinate
    checkArea = infos => {
        return (
            infos &&
            infos[0] &&
            infos[0].areas &&
            infos[0].areas[0] &&
            infos[0].areas[0].features &&
            infos[0].areas[0].features[0] &&
            infos[0].areas[0].features[0].geometry &&
            infos[0].areas[0].features[0].geometry.coordinates
        );
    };

    render() {
        const { detail, treeItem } = this.props;
        let mapIdentify = detail[0].id;
        let center = this.checkArea(detail[0].infos) ? this.checkArea(detail[0].infos) : [];
        let dataSource = [
            {
                center: center,
                id: detail[0].id,
                lable: detail[0].alarmtype
            }
        ];
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
                    {treeItem && this.renderDeviceData()}
                    <div style={{ padding: "10px 0", height: "250px" }}>
                        {center && center.length > 0 ? (
                            <MapApplication
                                identify={mapIdentify}
                                dataSource={dataSource}
                                zoom={12}
                                center={center}
                                needToolBar={false}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default TabDetail;
