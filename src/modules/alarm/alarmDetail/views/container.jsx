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
import AlarmTabs from "./alarmTabs";
import AlarmEdit from "./edit";
import AlarmGeneral from "./generalPanel";
import ActionsBar from "./actionsBar";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import {
    getDetailMediaRequest,
    changeStateRequest,
    getAssociationsData,
    resetAssociationsData,
    associateItem,
    dissociateItem,
    associationSearchRequest,
    postEditData,
    getUserList,
    getCommentsData,
    postComments,
    updateListDetailSuccess,
    uploadFile,
    postFileId,
    getPageKey
} from "modules/alarm/alarmList/funcs/actions";
import { exportAlarmDetail } from "modules/alarm/alarmList/funcs/actions";
import Store from "commons/store";
import { actions as msg } from "modules/messageCenter";
import moment from "moment";
import _ from "lodash";
import { checkAssociationClass, checkAssClass } from "../funcs/checkClass";
import CircularProgress from "@material-ui/core/CircularProgress";
import { alarmExportConfig } from "modules/alarm/alarmList/funcs/constants";
import { actions as ccmsTest } from "modules/ccmsEx";

const drawerWidth = 700;
const styles = theme => ({
    paper: {
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        overflow: "hidden",
        transform: `translate(${10 * drawerWidth}px, 0px)`
    }
});

class AlarmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            editData: null,
            tabTypes: ["Detail", "Associations", "Comments", "Attachments"],
            dateStyle: "HH:mm:ss DD-MMM-YYYY",
            severityKey: {
                "1": "critical",
                "2": "major",
                "3": "minor",
                "4": "info",
                "5": "unknown"
            },
            eventDetailWhiteList: {
                Basics: [
                    "Severity",
                    "Note",
                    "References",
                    "Source",
                    "Resourcepath",
                    "Sentdatetime",
                    "Senderid",
                    "Eventtype",
                    "id"
                ],
                Parameters: ["accountid", "deviceid", "devicetypeid"],
                // Resources: ["Format"],
                Infos: [
                    "Sendername",
                    "Expires",
                    "Description",
                    "Onset",
                    "Informationurl",
                    "Eventcodes",
                    "Effective",
                    "Eventtype"
                ]
            }
        };
    }

    componentWillReceiveProps(nextProps, nextState) {
        let { wsMessage } = nextProps;
        let { identify } = nextProps;
        let identifyData = nextProps[identify];
        let severityKey = this.state.severityKey;
        let dateStyle = this.state.dateStyle;
        let commentsData = identifyData && identifyData.commentsData;
        let associationsData = identifyData && identifyData.associationsData;
        let assSearchData = identifyData && identifyData.assSearchData;
        let assSearchPagination = identifyData && identifyData.assSearchPagination;
        let uploadFileId = identifyData && identifyData.uploadFileId;
        let detailData = identifyData && identifyData.detailData;

        associationsData = !associationsData ? null : this.handlResponseData(associationsData, dateStyle, severityKey);
        assSearchData = !assSearchData ? [] : this.handlResponseData(assSearchData, dateStyle, severityKey);
        !_.isEqual(wsMessage, this.props.wsMessage) && this.acknowledge(nextProps);
        !_.isEqual(uploadFileId, this.props[identify] && this.props[identify].uploadFileId) &&
            this.postFile(uploadFileId);
        !_.isEqual(detailData, this.props[identify] && this.props[identify].detailData) &&
            this.associationUpdate(nextProps, detailData);
        !_.isEqual(detailData, this.props.detailData) && this.isGetPageKey(detailData);
        this.setState({
            associationsData: associationsData,
            assSearchData: assSearchData,
            commentsData: commentsData,
            assSearchPagination: assSearchPagination
        });
    };

    isGetPageKey = detailData => {
        let rulename = this.checkRuleName(detailData);
        if (rulename) {
            let owner = JSON.parse(sessionStorage["ISC-GROUP"]).displayname;
            let str = rulename.split("#");
            let address =
                "?sitename=" + owner + "&modulename=" + str[0] + "&submodulename=" + str[1] + "&configname=" + str[2];
            this.props.getPageKey(address);
        }
    };
    checkRuleName = detailData => {
        let rulename = null;
        try {
            rulename = detailData[0].infos[0].parameters.rulename;
        } catch (error) {
            rulename = null;
        }
        return rulename;
    };

    associationUpdate = (nextProps, detailData) => {
        if (detailData && this.props[this.props.identify].detailData) {
            if (!_.isEqual(detailData[0].associations, this.props[this.props.identify].detailData[0].associations)) {
                this.handleAssociationsData();
            }
        }
    };
    acknowledge = nextProps => {
        let identify = nextProps.identify;
        let wsData = nextProps.wsMessage;
        if (wsData.category === "ISCAlarmsEdit") {
            wsData = [wsData.data];
            this.props.updateListDetailSuccess(identify, wsData, "listDetail");
        }
    };
    postFile = fileId => {
        let listId = this.props.detailData[0].id;
        this.props.postFileId(listId, fileId);
    };
    handlResponseData = (arrayData, dateStyle, severityKey) => {
        let opts = [];
        for (let i = 0; i < arrayData.length; i++) {
            let time = moment(arrayData[i]["sentdatetime"]).format(dateStyle);
            let timestamp = moment(arrayData[i]["sentdatetime"]).unix();
            let type = checkAssociationClass(arrayData[i]);
            let opt = {
                id: arrayData[i]["id"],
                severity: severityKey[arrayData[i]["severity"]],
                sentdatetime: time,
                alarmtype: arrayData[i]["alarmtype"],
                classKey: type,
                class: checkAssClass(type),
                owner: arrayData[i]["owner"] ? arrayData[i]["owner"] : "-",
                source: arrayData[i]["source"],
                note: arrayData[i]["note"],
                state: arrayData[i]["state"],
                timestamp: timestamp
            };
            opts.push(opt);
        }
        return opts;
    };

    handleMediaId = id => {
        this.props.getDetailMedia(id);
    };
    handleAcknowledge = (id, owner, state) => {
        if (state !== "unowned") {
            this.props.callReminder("Unable to modify alarm state.", "Alarm");
        } else {
            owner = !owner ? Store.getState().identify.userid : owner;
            this.props.changeState(id, owner, "owned");
        }
    };
    handleExportAlarmData = () => {
        // let identify = [this.props.identify];
        // let Etime = moment();
        // this.props.exportAlarmData(identify, Etime);

        const { detailData, identify } = this.props;
        let predicate = {
            field: "capevent.id",
            operator: "EQ",
            value: detailData[0].id
        };
        let applicationid = this.props.applicationid;
        this.props.exportAlarmDetail(identify, predicate, alarmExportConfig, 1, applicationid);
    };
    handleAssociationsData = () => {
        // let identifyData = this.props[this.props.identify];
        let detailData = this.props.detailData;
        let parentId = detailData[0].id;
        let childrenId = detailData[0].infos[0].parameters.associatedid;
        let type = checkAssociationClass(detailData[0]);
        let predicates = [];
        let paginator = {};
        let defaultTime = {
            field: "capevent.sentdatetime",
            operator: "LT",
            value: moment()
                .toISOString()
                .replace("Z", "+0000")
        };

        if (type === 1) {
            //itself is children
            predicates = [
                {
                    field: "capevent.id",
                    operator: "EQ",
                    value: childrenId
                },
                defaultTime
            ];
            paginator = {
                pageno: 1,
                limit: 1
            };
        } else if (type === 2) {
            //itself is parent
            predicates = [
                {
                    field: "capevent.capinfo.parameters.associatedid",
                    operator: "EQ",
                    valuetype: "string",
                    value: parentId
                },
                defaultTime
            ];
            paginator = {
                pageno: 1,
                limit: detailData[0].associations.length + 1
            };
        } else {
            //no association or itself is closed
            this.props.resetAssociationsData([]);
            return;
        }

        let predicate = {
            operator: "AND",
            predicates: predicates
        };

        this.props.getAssociationsData(paginator, predicate);
    };

    linkOffAss = (obj, state) => {
        let listId = this.props.detailData[0].id;
        let assId = obj.id;
        let assType = obj.classKey;

        if (state === "dissociate") {
            assType === 1
                ? this.props.dissociateItem(listId, assId, "CC") //click is C
                : this.props.dissociateItem(assId, listId, "CP"); //click is P
        } else {
            this.props.associateItem(listId, assId, state);
        }

        // if (assType === 1) {
        //     // ass is C, list is P
        //     this.props.dissociateItem(listId, assId, "dissociate");
        // } else {
        //     // ass is P, list is C
        //     this.props.dissociateItem(assId, listId, "dissociate");
        // }
    };

    associationSearchRequest = (predicate, paginator, applicationid) => {
        this.props.associationSearchRequest(paginator, predicate, applicationid);
    };

    saveEditData = obj => {
        this.setState(
            Object.assign(this.state, {
                editData: obj
            })
        );
    };
    handleEditData = () => {
        let { id, ownerNew, stateNew, severityNew, urgencyNew } = this.state.editData;
        this.props.postEditData(id, ownerNew, stateNew, severityNew, urgencyNew);
    };
    handleUserData = (pageNo, pageLimit) => {
        this.props.getUserList(pageNo, pageLimit);
    };
    handleCommentsData = () => {
        let listId = this.props.detailData[0].id;
        this.props.getCommentsData(listId);
    };
    postComments = val => {
        let listId = this.props.detailData[0].id;
        this.props.postComments(listId, val);
    };
    uploadFile = file => {
        this.props.uploadFile(file);
    };
    handleDrawerClose = () => {
        this.props.handleDrawerClose();
    };

    handleDashboardData = value => {
        this.props.showDashboardData(value, { editMode: false });
    };

    render() {
        const { identify, detailData, editState } = this.props;

        const {
            severityKey,
            tabTypes,
            eventDetailWhiteList,
            dateStyle,
            associationsData,
            assSearchData,
            assSearchPagination,
            commentsData
        } = this.state;
        const identifyData = this.props[identify];
        // const detail = identifyData && identifyData.detailData;
        // const dateStyleNew = identifyData && identifyData.dateStyle;
        const userList = identifyData && identifyData.userList;
        const userPagination = identifyData && identifyData.userPagination;
        const pageKey = identifyData && identifyData.pageKey;

        return (
            <div className="detailBox">
                {!detailData ? (
                    <div className="loading">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <div style={{ height: "100%" }}>
                        <div className="center">
                            <AlarmGeneral dateStyle={dateStyle} detail={detailData} severityKey={severityKey} />
                            {!editState ? (
                                <AlarmTabs
                                    {...this.props}
                                    tabTypes={tabTypes}
                                    severityKey={severityKey}
                                    dateStyle={dateStyle}
                                    detail={detailData}
                                    associationsData={associationsData}
                                    assSearchData={assSearchData}
                                    assSearchPagination={assSearchPagination}
                                    commentsData={commentsData}
                                    eventDetailWhiteList={eventDetailWhiteList}
                                    handleMediaId={this.handleMediaId.bind(this)}
                                    handleAssociationsData={this.handleAssociationsData}
                                    linkOffAss={this.linkOffAss.bind(this)}
                                    associationSearchRequest={this.associationSearchRequest.bind(this)}
                                    handleCommentsData={this.handleCommentsData}
                                    postComments={this.postComments.bind(this)}
                                    uploadFile={this.uploadFile.bind(this)}
                                />
                            ) : (
                                <AlarmEdit
                                    detail={detailData}
                                    severityKey={severityKey}
                                    saveEditData={this.saveEditData.bind(this)}
                                    handleUserData={this.handleUserData.bind(this)}
                                    userList={userList}
                                    userPagination={userPagination}
                                />
                            )}
                        </div>

                        <ActionsBar
                            detail={detailData}
                            handleAcknowledge={this.handleAcknowledge.bind(this)}
                            handleExportAlarmData={this.handleExportAlarmData}
                            editState={editState}
                            handleEditData={this.handleEditData}
                            handleDrawerClose={this.handleDrawerClose}
                            handleDashboardData={this.handleDashboardData.bind(this)}
                            pageKey={pageKey}
                        />
                    </div>
                )}
            </div>
        );
    }
}

AlarmDetail.propTypes = {
    classes: PropTypes.object.isRequired
};
AlarmDetail.defaultProps = {
    defaultValue: 0
};

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getDetailMedia: id => {
            dispatch(getDetailMediaRequest(id, props.identify));
        },
        changeState: (id, owner, state) => {
            dispatch(changeStateRequest(id, owner, state, props.identify));
        },
        callReminder: (val, name) => {
            dispatch(msg.warn(val, name));
        },
        exportAlarmDetail: (identify, itemsData, columninfos, pageLimit, applicationid) => {
            dispatch(exportAlarmDetail(identify, itemsData, columninfos, pageLimit, applicationid));
        },
        getAssociationsData: (paginator, items) => {
            dispatch(getAssociationsData(paginator, items, props.identify));
        },
        resetAssociationsData: arr => {
            dispatch(resetAssociationsData(arr, props.identify));
        },
        associateItem: (pId, cId) => {
            dispatch(associateItem(pId, cId, props.identify));
        },
        dissociateItem: (pId, cId, state) => {
            dispatch(dissociateItem(pId, cId, state, props.identify));
        },
        associationSearchRequest: (paginator, data, applicationid) => {
            dispatch(associationSearchRequest(paginator, data, applicationid, props.identify));
        },
        postEditData: (id, owner, state, severity, urgency) => {
            dispatch(postEditData(id, owner, state, severity, urgency, props.identify));
        },
        getUserList: (pageNo, pageLimit) => {
            dispatch(getUserList(pageNo, pageLimit, props.identify));
        },
        getCommentsData: id => {
            dispatch(getCommentsData(id, props.identify));
        },
        postComments: (id, value) => {
            dispatch(postComments(id, value, props.identify));
        },
        updateListDetailSuccess: (identify, arrayData, value) => {
            dispatch(updateListDetailSuccess(identify, arrayData, value));
        },
        uploadFile: file => {
            dispatch(uploadFile(file, props.identify));
        },
        postFileId: (id, fileId) => {
            dispatch(postFileId(id, fileId, props.identify));
        },
        getPageKey: value => {
            dispatch(getPageKey(value, props.identify));
        },
        showDashboardData: (value, obj) => {
            dispatch(ccmsTest.requestPage(value, obj));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AlarmDetail));
