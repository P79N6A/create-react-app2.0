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
 * Created by wplei on 10/06/18.
 */
import React from "react";
// import { theme as themes } from "modules/theme";
import { jsonAnalysis, mappingEle, replacebyKey, recoverDatas } from "../funcs/jsonAnalysis";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { Typography } from "@material-ui/core";

class VisualLoader extends React.Component {
    state = {
        doms: null,
        wrapDatas: null,
        datas: {
            columnConfig: [
                {
                    label: "dispalyname",
                    columnName: "DisplayName",
                    selecterValue: "DisplayName",
                    defaultSelect: true
                },
                {
                    label: "name",
                    columnName: "Name",
                    selecterValue: "Name",
                    defaultSelect: true
                },
                {
                    label: "status",
                    columnName: "Status",
                    selecterValue: "Status",
                    defaultSelect: true
                },
                {
                    label: "device type",
                    columnName: "DeviceType",
                    selecterValue: "DeviceType",
                    defaultSelect: false
                },
                {
                    label: "location",
                    columnName: "Location",
                    selecterValue: "Location",
                    defaultSelect: false
                },
                {
                    label: "address",
                    columnName: "Address",
                    selecterValue: "Address",
                    defaultSelect: false
                },
                {
                    label: "topology ID",
                    columnName: "IotTopologyId",
                    selecterValue: "IotTopologyId",
                    defaultSelect: false
                },
                {
                    label: "resource path",
                    columnName: "ResourcePath",
                    selecterValue: "ResourcePath",
                    defaultSelect: false
                }
            ],
            title: "Topologylllllllllllll",
            tabTypes: ["detail", "alarm", "event"],
            defaultFilterLists: [
                {
                    filterType: "Status",
                    defaultValue: "All"
                },
                {
                    filterType: "DeviceType",
                    defaultValue: "All"
                }
            ]
        }
    };
    handleElementChange = item => {
        let { wrapDatas } = this.state;
        wrapDatas = replacebyKey(item.key, item);
        const wrapDoms = this.wrapElement(wrapDatas);
        const recovedData = recoverDatas();
        this.setState(
            {
                wrapDatas,
                doms: wrapDoms
            },
            () => {
                this.props.onPropsChange(recovedData);
            }
        );
    };
    wrapElement = datas => {
        return (
            datas &&
            datas.map((item, index) => {
                if (!item.reactEle) {
                    return null;
                } else {
                    return (
                        <item.reactEle
                            key={item.key}
                            greatItem={item}
                            onElementChange={this.handleElementChange}
                            textProps={{
                                label: item.key,
                                value: item.value
                            }}
                        />
                    );
                }
            })
        );
    };
    analysisData = datas => {
        const afterAnalysis = jsonAnalysis(datas);
        const wrapDatas = mappingEle(afterAnalysis);
        const wrapDoms = this.wrapElement(wrapDatas);
        this.setState({
            wrapDatas,
            doms: wrapDoms
        });
    };
    componentWillMount = () => {
        const { datas } = this.props;
        this.setState(
            {
                datas
            },
            () => {
                this.analysisData(datas);
            }
        );
        // this.analysisData(this.state.datas);
    };
    componentWillReceiveProps = nextProps => {
        const { datas } = nextProps;
        this.setState(
            {
                datas
            },
            () => {
                this.analysisData(datas);
            }
        );
    };
    render = () => {
        const { doms } = this.state;
        return (
            // <MuiThemeProvider theme={themes}>
            <div>{doms}</div>
            // </MuiThemeProvider>
        );
    };
}

export default VisualLoader;
