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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import { connect } from "react-redux";
import { reducerName as widgetsBoardReducerName } from "modules/ccms/widgetsBoard";
import { exportTopologyData } from "../funcs/actions";
import { REDUCER_NAME as topoReducerName } from "../funcs/constants";

class ExportComps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exportData: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.exportData) {
            return;
        }
        // disable export cause have no api support
        // let exportData = nextProps.exportData;
        // let checkCurrentWidget = false;
        // let checkExportTime = false;
        // for (let i = 0; i < exportData.exportWidgets.length; i++) {
        //     if (exportData.exportWidgets[i] === this.props.identify) {
        //         checkCurrentWidget = true;
        //     }
        // }

        // let currentTime = new Date().getTime();
        // let exportTime = exportData.exportTime.getTime();
        // if (currentTime - exportTime < 1000) {
        //     checkExportTime = true;
        // }

        // if (checkCurrentWidget && checkExportTime) {
        //     // this.props.exportTopologyData(this.props.identify);
        //     console.log("will export topology data");
        // }

        // if (nextProps.exportTopoDatas) {
        //     let exportTopoDatas = nextProps.exportTopoDatas;

        //     // downloadFile("Topology data", exportTopoDatas);
        //     var odownLoad = document.createElement("a");
        //     let browserType = this.checkBrowser();
        //     if (browserType === "IE" || browserType === "Edge") {
        //         odownLoad.href = "#";
        //         odownLoad.click();
        //         this.downloadFile("Topology Data", exportTopoDatas);
        //     } else {
        //         odownLoad.href = "data:application/octet-stream;charset=utf-8;base64," + exportTopoDatas;
        //         odownLoad.download = "Topology Data";
        //         odownLoad.click();
        //         odownLoad.remove();
        //     }
        // }
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
        var contentType = "topologyData.csv";
        return this.b64toBlob(this.getData(base64), contentType);
    }
    getData(base64) {
        return base64.substr(base64.indexOf("base64,") + 7, base64.length);
    }
    b64toBlob(b64Data, contentType, sliceSize) {
        // var contentType = contentType || "";
        // var sliceSize = sliceSize || 512;
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

ExportComps.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        exportData: state[widgetsBoardReducerName] && state[widgetsBoardReducerName]["exportData"],
        exportTopoDatas: filterProps(state, identify, topoReducerName, "exportTopoDatas")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        exportTopologyData: identify => {
            dispatch(exportTopologyData(identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportComps);
