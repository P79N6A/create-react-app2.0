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
 */

import _ from "lodash";
import moment from "moment";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions as msg } from "modules/messageCenter";
import getTimeString from "commons/utils/isc8601Generator";
import { exportEventAlarmDataRequest } from "modules/charts/funcs/actions";
import { reducerName as widgetsBoardReducerName } from "modules/ccms/widgetsBoard";
import { REDUCER_NAME as reducerName, eventExportConfig, alarmExportConfig } from "modules/charts/funcs/constants";

export class ExportComps extends Component {
    static propTypes = {
        title: PropTypes.string,
        source: PropTypes.string,
        exportError: PropTypes.bool,
        exportInfo: PropTypes.object,
        predicates: PropTypes.object
    };
    state = { exporting: false };

    componentWillReceiveProps(nextProps) {
        const { exportInfo, source, exportError } = nextProps,
            isErrorChange = !_.isEqual(exportError, this.props.exportError);
        if (isErrorChange && exportError && this.state.exporting) {
            this.setState({ exporting: false });
        }
        if (
            !isErrorChange &&
            !_.isEqual(nextProps, this.props) &&
            exportInfo &&
            (source === "event" || source === "alarm")
        ) {
            console.log("callexport");
            this.callExport(nextProps);
        }
    }
    componentWillUnmount() {
        const { identify, onChangeProperty } = this.props;
        onChangeProperty(identify, { exportData: undefined });
    }
    componentWillUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        this.exportCSV(nextProps, nextState);
    }
    callExport(nextProps) {
        const { exportInfo, identify, predicates, source, currentApplicationInfo } = nextProps,
            { exporting } = this.state;
        if (exporting) {
            return;
        }
        let checkCurrentWidget = false,
            checkExportTime = false;
        for (let i = 0; i < exportInfo.exportWidgets.length; i++) {
            if (exportInfo.exportWidgets[i] === this.props.identify) {
                checkCurrentWidget = true;
            }
        }

        let exportTime = exportInfo.exportTime;
        if (moment().diff(exportTime) < 500) {
            checkExportTime = true;
        }

        if (checkCurrentWidget && checkExportTime) {
            const { iotIds, dateRange, readings } = predicates,
                columninfos = source === "event" ? eventExportConfig : alarmExportConfig,
                date = dateRange && dateRange.length === 1 ? [getTimeString(dateRange[0])] : dateRange,
                appName = currentApplicationInfo["address.name"];
            this.props.exportEventAlarmData(identify, source, appName, columninfos, iotIds, date, readings);
            this.setState({ exporting: true });
        }
    }
    exportCSV(nextProps, nextState) {
        const { title, exportData } = nextProps;
        const { exporting } = nextState;
        if (!exportData || !exporting) {
            return;
        }
        if (exportData.status && (exportData.status.code === "20010020" || exportData.status.code === "00000001")) {
            // msg.info(exportData.status.message,"Chart");
            this.props.callReminder(exportData.status.message);
        } else {
            var odownLoad = document.createElement("a");
            const browserType = this.checkBrowser();
            if (browserType === "IE" || browserType === "Edge") {
                odownLoad.href = "#";
                odownLoad.click();
                this.downloadFile(title + "-Chart-Data.xls", exportData);
            } else {
                odownLoad.href = "data:application/octet-stream;charset=utf-8;base64," + exportData;
                odownLoad.download = title + "-Chart-Data.xls";
                odownLoad.click();
                odownLoad.remove();
            }
        }
        this.setState({ exporting: false });
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
    const identify = ownProps.identify,
        store = (state[reducerName] && state[reducerName][identify]) || {},
        commonStore = (state[widgetsBoardReducerName] && state[widgetsBoardReducerName]) || {};
    return {
        title: store.title,
        source: store.source,
        predicates: store.predicates,
        exportData: store.exportData,
        exportError: store.exportError,
        exportInfo: commonStore.exportData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        callReminder: val => {
            dispatch(msg.info(val, "Chart-Export"));
        },
        exportEventAlarmData: (identify, source, appName, columninfos, iotIds, dateRange, readings) => {
            dispatch(exportEventAlarmDataRequest(identify, source, appName, columninfos, iotIds, dateRange, readings));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportComps);
