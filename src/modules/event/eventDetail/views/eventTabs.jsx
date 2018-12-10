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
import PropTypes from "prop-types";
import _ from "lodash";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabFavourite from "./tabFavourite";
import TabDetail from "./tabDetail";
import CardContent from "@material-ui/core/Card";

class TabItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ojbData: null,
            treeItem: [],
            value: 0,
            keyWord: ""
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    componentWillMount= () => {
        const eventDetailWhiteList = this.props.eventDetailWhiteList;
        const severityKey = this.props.severityKey;

        if (this.props.detailData && this.props.detailData.length > 0) {
            let arrAll = [];
            let original = this.props.detailData[0];
            this.setState({
                ojbData: original
            });

            _.forEach(original, function(value, key) {
                for (var i = 0; i < eventDetailWhiteList.Basics.length; i++) {
                    if (key === eventDetailWhiteList.Basics[i].toLocaleLowerCase()) {
                        let obj = {
                            type: "Basics",
                            key: key,
                            value: key === "severity" ? severityKey[value] : value
                        };
                        arrAll.push(obj);
                    }
                }
            });

            if (original.infos && original.infos.length > 0) {
                for (let ind = 0; ind < original.infos.length; ind++) {
                    //info
                    _.forEach(original.infos[ind], function(value, key) {
                        for (var i = 0; i < eventDetailWhiteList.Infos.length; i++) {
                            let obj = {};
                            if (key === eventDetailWhiteList.Infos[i].toLocaleLowerCase()) {
                                obj = {
                                    type: "Infos",
                                    key: key,
                                    value: value
                                };
                                arrAll.push(obj);
                            }
                        }
                    });

                    //Parameters
                    _.forEach(original.infos[ind].parameters, function(value, key) {
                        if (!eventDetailWhiteList.Parameters.includes(key.toLocaleLowerCase())) {
                            let obj = {
                                type: "Parameters",
                                key: key,
                                value: value
                            };
                            arrAll.push(obj);
                        }
                    });

                    if (original.infos[ind].resources && original.infos[ind].resources.length > 0) {
                        _.forEach(original.infos[ind].resources, function(item, index) {
                            let num = original.infos[ind].resources.length === 1 ? "" : index + 1;
                            _.forEach(item, function(value, key) {
                                if (key !== "format") {
                                    let obj = {
                                        type: "Resources" + num,
                                        key: key,
                                        value: value
                                    };
                                    arrAll.push(obj);
                                }
                            });
                        });
                    }
                }
            }

            if (original.parameters) {
                _.forEach(original.parameters, function(value, key) {
                    let obj = {
                        type: "Parameters",
                        key: key,
                        value: value
                    };
                    arrAll.push(obj);
                });
            }

            this.setState({
                // value: nextProps.defaultValue,
                treeItem: arrAll
            });
        } else {
            this.setState({
                // value: nextProps.defaultValue,
                ojbData: {}
            });
        }
    }

    render() {
        const { value } = this.state;
        const { dateStyle } = this.props;
        return (
            <div className="tabsBox">
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    scrollButtons="auto"
                    scrollable
                >
                    {this.props.tabTypes.map((item, index) => {
                        return <Tab label={item} key={index} />;
                    })}
                </Tabs>
                <CardContent style={{ height: "calc(100% - 48px)" }}>
                    {value === 0 && this.state.ojbData ? (
                        <TabFavourite {...this.props} dateStyle={dateStyle} ojbData={this.state.ojbData} />
                    ) : null}
                    {value === 1 && (
                        <TabDetail {...this.props} id={this.state.ojbData.id} treeItem={this.state.treeItem} />
                    )}
                </CardContent>
            </div>
        );
    }
}

TabItems.propTypes = {
    classes: PropTypes.object.isRequired
};

export default TabItems;
