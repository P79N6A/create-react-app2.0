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
 * Created by kaidi on 25/06/2018.
 * Modified by SongCheng on 25/06/2018.
 */

import { Component } from "react";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName, eventExportConfig } from "modules/event/eventList/funcs/constants";
import { exportEventDataRequest, exportEventDataSuccess } from "modules/event/eventList/funcs/actions";
import { reducerName as widgetsBoardReducerName } from "modules/ccms/widgetsBoard";
import getTimeString from "commons/utils/isc8601Generator";
import _ from "lodash";
import moment from "moment";
import { handleDataForRequest } from "modules/event/eventSearch/funcs/filter";
import { actions as msg } from "modules/messageCenter";

export class ExportComps extends Component {
    static propTypes = {};
    state = {};

    componentWillReceiveProps(nextProps) {
        let { exportInfo, source } = nextProps;
        if (_.isEqual(nextProps, this.props) || !exportInfo || source !== "eventList") {
            return;
        }
        this.callExport(nextProps);
    }
    componentWillUnmount() {
        const { identify } = this.props;
        this.props.clearExportData(identify, null);
    }
    componentWillUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        this.exportCSV(nextProps, nextState);
    }
    callExport(nextProps) {
        let { exportInfo, identify, predicates } = nextProps;
        let exporting = this.state[identify] ? this.state[identify].exporting : false;
        if (exporting) {
            return;
        }
        let checkCurrentWidget = false;
        let checkExportTime = false;
        for (let i = 0; i < exportInfo.exportWidgets.length; i++) {
            if (exportInfo.exportWidgets[i] === this.props.identify) {
                checkCurrentWidget = true;
            }
        }

        let currentTime = moment().valueOf();
        let exportTime = exportInfo.exportTime.valueOf();
        if (currentTime - exportTime < 500) {
            checkExportTime = true;
        }

        if (checkCurrentWidget && checkExportTime) {
            let { dateRange } = predicates;
            let columninfos = eventExportConfig;
            let date = dateRange && dateRange.length === 1 ? [getTimeString(dateRange[0])] : dateRange;
            let itemsData = this.props[identify].itemsData;
            let pageLimit = nextProps[identify].pageLimit;
            let arr = handleDataForRequest(itemsData);
            let predicate = {
                operator: "AND",
                predicates: arr
            };
            this.props.exportEventData(identify, predicate, columninfos, pageLimit, date, this.props.applicationid);
            this.setState({ [identify]: { exporting: true } });
        }
    }
    exportCSV(nextProps, nextState) {
        let { identify, title, exportData } = nextProps;
        let exporting = nextState[identify] ? nextState[identify].exporting : false;
        if (!exportData || !exporting) {
            return;
        }

        if (exportData.status && (exportData.status.code === "20010020" || exportData.status.code === "00000001")) {
            this.props.callReminder(exportData.status.message);
        } else {
            var odownLoad = document.createElement("a");
            let browserType = this.checkBrowser();
            if (browserType === "IE" || browserType === "Edge") {
                odownLoad.click();
                this.downloadFile(title + "-Data.xls", exportData);
            } else {
                odownLoad.href = "data:application/octet-stream;charset=utf-8;base64," + exportData;
                odownLoad.download = title + "-Data.xls";
                odownLoad.click();
                odownLoad.remove();
            }
        }

        this.setState({ [identify]: { exporting: false } });
    }

    checkBrowser() {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Trident") > -1) {
            return "IE";
        } else if (userAgent.indexOf("Edge") > -1) {
            return "Edge";
        } else {
            return "Other";
        }
    }

    downloadFile(fileName, data) {
        var content = "data:application/octet-stream;charset=utf-8;base64," + data;
        var blob = this.getBlob(content);
        window.navigator.msSaveBlob(blob, fileName);
    }
    getBlob(base64) {
        var contentType = "application/octet-stream";
        return this.b64toBlob(this.getData(base64), contentType);
    }
    getData(base64) {
        return base64.substr(base64.indexOf("base64,") + 7, base64.length);
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    let store = state[reducerName] && state[reducerName][identify];
    // return state[reducerName] || {};
    return {
        exportInfo: state[widgetsBoardReducerName] && state[widgetsBoardReducerName]["exportData"],
        // predicates: store && store.predicates,
        // source: store && store.source,
        exportData: store && store.exportData
        // title: store && store.title
    };
};

const mapDispatchToProps = dispatch => {
    return {
        exportEventData: (identify, itemsData, columninfos, pageLimit, dateRange, applicationid) => {
            dispatch(exportEventDataRequest(identify, itemsData, columninfos, pageLimit, dateRange, applicationid));
        },
        clearExportData: (identify, data) => {
            dispatch(exportEventDataSuccess(identify, data));
        },
        callReminder: val => {
            dispatch(msg.info(val));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportComps);
