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
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabDetail from "./tabDetail";
import TabAssociations from "./tabAssociations";
import TabAttachment from "./tabAttachment";
import TabComments from "./tabComments";
// import TabWorkFlow from "./tabWorkFlow";
// import TabMap from "./tabMap";
import CardContent from "@material-ui/core/Card";
// import { handleAlarmsForLocation } from "modules/mapWidget";
import encode16bit from "commons/utils/encode16bit";
import tokenHelper from "commons/utils/tokenHelper";
import moment from "moment";
// import { checkAssociationClass, checkAssClass } from "../funcs/checkClass";
// import { Typography } from "@material-ui/core";

const styles = theme => ({
    paper: {},
    root: {
        color: theme.palette.text.primary,
        marginBottom: "3px",
        boxShadow: theme.shadows["1"]
    }
});
class TabItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ojbData: null,
            treeItem: [],
            resourcesData: null,
            value: 0,
            stateDetailData: this.props.detailData
        };
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        // let { identify } = nextProps;
        // let identifyData = nextProps[identify];
        // let eventDetailWhiteList = this.props.eventDetailWhiteList;
        // let severityKey = this.props.severityKey;
        // let dateStyle = identifyData && identifyData.dateStyle;
        // let mediaDataNew = (identifyData && identifyData.mediaData) || this.props.mediaData;
        // let nowDetaildata = this.state.detailData;
        // let nextDetailData = (identifyData && identifyData.detailData) || [];
        // let associationsData = identifyData && identifyData.associationsData;
        // let assSearchData = identifyData && identifyData.assSearchData;
        // associationsData = !associationsData ? null : this.handlResponseData(associationsData, dateStyle, severityKey);
        // assSearchData = !assSearchData ? [] : this.handlResponseData(assSearchData, dateStyle, severityKey);
        // let commentsData = identifyData && identifyData.commentsData;
        // if (!!nextDetailData && !!nowDetaildata) {
        //     if (_.isEqual(nowDetaildata[0].id, nextDetailData[0].id)) {
        //         // console.log("tab=== val");
        //     } else {
        //         // console.log("tab === 0");
        //         this.setState({
        //             value: nextProps.defaultValue
        //         });
        //     }
        // }
        // let { wsMessage } = nextProps;
        // !_.isEqual(wsMessage, this.props.wsMessage) && this.acknowledge(nextProps);
        // this.setState({
        //     associationsData: associationsData,
        //     assSearchData: assSearchData,
        //     commentsData: commentsData
        // });
    };

    componentWillMount = () => {
        let { eventDetailWhiteList, severityKey } = this.props;

        if (this.props.detail && this.props.detail.length > 0) {
            let arrAll = [];
            let original = this.props.detail[0];

            //detail + attachment
            this.setState({
                ojbData: original
                // resourcesData: _.isEqual(original, this.state.ojbData) ? mediaDataNew : []
            });

            //detail
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
                    //Infos
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

                    //Resources
                    // if (original.infos[ind].resources && original.infos[ind].resources.length > 0) {
                    //     _.forEach(original.infos[ind].resources, function(item, index) {
                    //         let num = original.infos[ind].resources.length === 1 ? "" : index + 1;
                    //         _.forEach(item, function(value, key) {
                    //             let obj = {};
                    //             if (key !== "format") {
                    //                 obj = {
                    //                     type: "Resources" + num,
                    //                     key: key,
                    //                     value: value
                    //                 };
                    //                 arrAll.push(obj);
                    //             }
                    //         });
                    //     });
                    // }
                }
            }
            this.setState({
                // value: nextProps.defaultValue,
                treeItem: arrAll
            });
        } else {
            this.setState({
                // value: nextProps.defaultValue,
                ojbData: []
            });
        }
    };

    // handlResponseData = (arrayData, dateStyle, severityKey) => {
    //     let opts = [];
    //     for (let i = 0; i < arrayData.length; i++) {
    //         let time = moment(arrayData[i]["sentdatetime"]).format(dateStyle);
    //         let timestamp = moment(arrayData[i]["sentdatetime"]).unix();
    //         let type = checkAssociationClass(arrayData[i]);
    //         let opt = {
    //             id: arrayData[i]["id"],
    //             severity: severityKey[arrayData[i]["severity"]],
    //             sentdatetime: time,
    //             alarmtype: arrayData[i]["alarmtype"],
    //             classKey: type,
    //             class: checkAssClass(type),
    //             owner: arrayData[i]["owner"] ? arrayData[i]["owner"] : "-",
    //             source: arrayData[i]["source"],
    //             note: arrayData[i]["note"],
    //             state: arrayData[i]["state"],
    //             timestamp: timestamp
    //         };
    //         opts.push(opt);
    //     }
    //     return opts;
    // };

    handleChange = (event, value) => {
        this.setState({ value });
        if (1 === value) {
            this.props.handleAssociationsData();
        } else if (2 === value || 3 === value) {
            this.props.handleCommentsData();
        }
    };

    //click Attachment function
    handleToken() {
        let arr = [];
        let token = sessionStorage["ISC-Auth-Token"];
        for (var n = 0, len = token.length; n < len; n++) {
            var hex = Number(token.charCodeAt(n)).toString(16);
            arr.push((hex.length > 1 && hex) || "0" + hex);
        }
        return _.join(arr, "");
    }
    handleMedia = fileId => {
        let tokenNew = encode16bit.ascii2hex(tokenHelper.get());
        let arr = [];
        let downloadId = fileId + tokenNew;
        arr.push(downloadId);
        this.props.handleMediaId(arr);
    };
    // resetAssociations = () => {
    //     this.setState({
    //         associationsData: null
    //     });
    // };
    handleAssociationItem = (assItem, state) => {
        this.props.linkOffAss(assItem, state);
    };

    handleAssociationSearch = (number, period, paginator, applicationid) => {
        let date = moment()
            .subtract(number, period)
            .toISOString()
            .replace("Z", "+0000");
        let predicate = {
            field: "capevent.sentdatetime",
            operator: "GT",
            value: date
        };
        this.props.associationSearchRequest(predicate, paginator, applicationid);
    };
    handlePostComments = val => {
        this.props.postComments(val);
    };
    handleUploadFile = file => {
        this.props.uploadFile(file);
    };

    render() {
        const { value } = this.state;
        const {
            detail,
            classes,
            dateStyle,
            associationsData,
            assSearchData,
            assSearchPagination,
            commentsData,
            applicationid
            // identify
        } = this.props;
        // const mapData = handleAlarmsForLocation(arrayData);
        return (
            <div className="tabsBox">
                <Tabs
                    className={classes.root}
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
                <CardContent style={{ height: "calc(100% - 56px)", boxShadow: "none" }}>
                    {value === 0 && this.state.ojbData ? (
                        <TabDetail
                            detail={detail}
                            id={this.state.ojbData.id}
                            treeItem={this.state.treeItem}
                            dateStyle={dateStyle}
                        />
                    ) : null}
                    {value === 1 && (
                        <TabAssociations
                            detail={detail}
                            associationsData={associationsData}
                            assSearchData={assSearchData}
                            assSearchPagination={assSearchPagination}
                            applicationid={applicationid}
                            handleAssociationItem={this.handleAssociationItem.bind(this)}
                            handleAssociationSearch={this.handleAssociationSearch.bind(this)}
                        />
                    )}
                    {value === 2 && (
                        <TabComments
                            dateStyle={dateStyle}
                            commentsData={commentsData}
                            handlePostComments={this.handlePostComments.bind(this)}
                            handleUploadFile={this.handleUploadFile.bind(this)}
                            handleMedia={this.handleMedia.bind(this)}
                        />
                    )}
                    {value === 3 && (
                        <TabAttachment
                            dateStyle={dateStyle}
                            commentsData={commentsData}
                            handleMedia={this.handleMedia.bind(this)}
                        />
                    )}
                    {/* {value === 4 && detail[0].state !== "unowned" ? (
                        <TabWorkFlow identify={identify} detail={detail} />
                    ) : (
                        <Typography variant="caption" align="center">
                            No data to display.
                        </Typography>
                    )} */}

                    {/* {value === 2 && <TabMap mapData={mapData} identify={identify} />} */}
                </CardContent>
            </div>
        );
    }
}
TabItems.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabItems);
