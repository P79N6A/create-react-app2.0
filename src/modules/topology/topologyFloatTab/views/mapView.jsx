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
import "../styles/style.less";

import { view as Map } from "modules/map";
const alarms = [
    {
        format: "CAPAlarm",
        alarmtype: "Detection/Fire",
        associations: [],
        categories: ["other"],
        codes: ["HOTC", "woodlands checkpoint", "alarm"],
        eventtype: "null",
        id: "al.53b67994547f4110bc250c46ecc96e95",
        infos: [
            {
                format: "CAPInfo",
                areas: [
                    {
                        format: "CAPArea",
                        description: "Geolocation",
                        features: [
                            {
                                geometry: {
                                    coordinates: [103.63532602787018, 1.3503457557834744],
                                    type: "Point"
                                },
                                type: "Feature"
                            }
                        ],
                        type: "FeatureCollection"
                    }
                ],
                audience: "",
                certainty: "likely",
                description: "A bus load of passengers on board",
                parameters: {
                    incidentid: "209-JEST21-Water-WBay-01",
                    incidenttype: "hostage"
                },
                resources: [
                    {
                        format: "CAPResource",
                        description: "Image from ICA woodlands checkpoint",
                        mimetype: "image/jpeg",
                        size: 0,
                        uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAgg=="
                    }
                ],
                responsetypes: [],
                sendername: "",
                severity: "moderate"
            }
        ],
        messagestatus: "actual",
        messagetype: "alert",
        note: "209-JEST21-Water-WBay-01  test alarms",
        owner: "admin",
        removed: false,
        resourcepath: "/Jurong-Clementi/JURONG EAST STREET 21/600209/209-JEST21-Water-WBay-01",
        senderid: "atomicphysicaldevice.1abdae0dd5cfce9dc2ade0727e90389f7a82a3456bb29445405ee4e1b791561c",
        sentdatetime: "2018-05-16T07:05:29.717+0000",
        severity: "moderate",
        source: "209-JEST21-Water-WBay-01",
        state: "owned"
    },
    {
        format: "CAPAlarm",
        alarmtype: "Detection/Fire",
        associations: [],
        categories: ["other"],
        codes: ["HOTC", "woodlands checkpoint", "alarm"],
        eventtype: "null",
        id: "al.5748c9b81a43439baf57c7063dbf1ba0",
        infos: [
            {
                format: "CAPInfo",
                areas: [
                    {
                        format: "CAPArea",
                        description: "Geolocation",
                        features: [
                            {
                                geometry: {
                                    coordinates: [103.63532602787018, 1.3503457557834744],
                                    type: "Point"
                                },
                                type: "Feature"
                            }
                        ],
                        type: "FeatureCollection"
                    }
                ],
                audience: "",
                certainty: "likely",
                description: "A bus load of passengers on board",
                parameters: {
                    incidentid: "209-JEST21-Water-WBay-01",
                    incidenttype: "hostage"
                },
                resources: [
                    {
                        format: "CAPResource",
                        description: "Image from ICA woodlands checkpoint",
                        mimetype: "image/jpeg",
                        size: 0,
                        uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAgg=="
                    }
                ],
                responsetypes: [],
                sendername: "",
                severity: "moderate"
            }
        ],
        messagestatus: "actual",
        messagetype: "alert",
        note: "209-JEST21-Water-WBay-01  test alarms",
        owner: "admin",
        removed: false,
        resourcepath: "/Jurong-Clementi/JURONG EAST STREET 21/600209/209-JEST21-Water-WBay-01",
        senderid: "atomicphysicaldevice.1abdae0dd5cfce9dc2ade0727e90389f7a82a3456bb29445405ee4e1b791561c",
        sentdatetime: "2018-05-16T06:40:50.170+0000",
        source: "209-JEST21-Water-WBay-01",
        state: "owned"
    }
];
class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setCenterandZoom: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== parseInt(nextProps.currentTab, 10)) {
            return;
        }
        let geo = nextProps.geo;
        if (!geo) {
            return;
        }
        this.setState({
            setCenterandZoom: {
                geo: geo
            },
            locateAlarms: alarms
        });
        console.log("open float tab show detail..................");
    }

    componentDidMount() {
        console.log("xxxx");
        let geo = this.props.geo;
        if (!geo) {
            return;
        }
        this.setState({
            setCenterandZoom: {
                geo: geo
            },
            locateAlarms: {
                alarms: alarms,
                showCircle: false
            }
        });
        // let resourcePath = this.props.resourcePath;
        // if (!resourcePath) {
        //     return;
        // }
        // this.props.getTopoEvents(resourcePath, this.props.pageNo, this.props.pageLimit);
    }

    render() {
        return (
            <div className="map">
                <Map setCenterandZoom={this.state.setCenterandZoom} locateAlarms={this.state.locateAlarms} />
            </div>
        );
    }
}

MapView.propTypes = {};

MapView.defaultProps = {};

export default MapView;
