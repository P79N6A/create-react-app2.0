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
 * Modified by DengXiaoLong on 25/06/2018.
 */

import { Component } from "react";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "modules/mapWidget/funcs/constants";
import { mapAlarmExportExcel, mapExportExcelSuccess } from "./../../funcs/actions";
import { handleDataForExport } from "./../../funcs/utils/alarmExportUtil";
import { reducerName as widgetsBoardReducerName } from "modules/ccms/widgetsBoard";
import _ from "lodash";
import moment from "moment";

export class ExportComps extends Component {
    static defaultProps = {
        exportInfo: null,
        exportData: null
    };
    static propTypes = {};
    state = {};

    componentWillReceiveProps(nextProps) {
        let { exportInfo} = nextProps;
        if (_.isEqual(nextProps, this.props) || !exportInfo) {
            return;
        }
        this.callExport(nextProps);
    };
    componentWillUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        this.exportCSV(nextProps, nextState);
    };
    componentWillUnmount() {
        const { identify } = this.props;
        this.props.clearExportData(null, identify);
    };
    callExport(nextProps) {
        let { exportInfo, identify, choosedData, timeArr } = nextProps;
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
            this.props.exportAlarmData(handleDataForExport(choosedData, timeArr), 1000, identify);
            this.setState({ [identify]: { exporting: true } });
        }
    };
    
    exportCSV(nextProps, nextState) {
        let { identify, title, exportData } = nextProps;
        let exporting = nextState[identify] ? nextState[identify].exporting : false;
        if (!exportData || !exporting) {
            return;
        }
        var odownLoad = document.createElement("a");
        let browserType = this.checkBrowser();
        if (browserType === "IE" || browserType === "Edge") {
            odownLoad.href = "#";
            odownLoad.click();
            this.downloadFile(title + "-Data.xls", exportData);
        } else {
            odownLoad.href = "data:application/octet-stream;charset=utf-8;base64," + exportData;
            odownLoad.download = title + "-Data.xls";
            odownLoad.click();
            odownLoad.remove();
        }
        this.setState({ [identify]: { exporting: false } });
    };

    checkBrowser = () => {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Trident") > -1) {
            return "IE";
        } else if (userAgent.indexOf("Edge") > -1) {
            return "Edge";
        } else {
            return "Other";
        }
    };

    downloadFile(fileName, data) {
        var content = "data:application/octet-stream;charset=utf-8;base64," + data;
        var blob = this.getBlob(content);
        window.navigator.msSaveBlob(blob, fileName);
    };
    
    getBlob(base64) {
        var contentType = "application/octet-stream";
        return this.b64toBlob(this.getData(base64), contentType);
    };

    getData(base64) {
        return base64.substr(base64.indexOf("base64,") + 7, base64.length);
    };

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
    };

    render() {
        return null;
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    let store = state[reducerName] && state[reducerName][`map${identify}`];
    // return state[reducerName] || {};
    return {
        exportInfo: state[widgetsBoardReducerName] && state[widgetsBoardReducerName]["exportData"],
        // hoosedFilters: store && store.parameters.choosedFilters,
        timeArr: store && store.parameters.timeArr,
        choosedData: store && store.parameters.choosedData,
        exportData: store && store.exportData,
        title: store && store.title,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        exportAlarmData: (filterData, pagesize, identify) => {
            dispatch(mapAlarmExportExcel(filterData, pagesize, identify));
        },
        clearExportData: (exportData, identify) => {
            dispatch(mapExportExcelSuccess(exportData, identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportComps);
