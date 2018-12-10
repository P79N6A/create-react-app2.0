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
import { connect } from "react-redux";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { MapApplication } from "modules/map";
import { addLocation } from "../funcs/actions";

class AddLocationComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { disableSave: this.props.initSaveBtn, center: this.props.center };
    }

    componentDidMount() {
        if (this.props.locationName && this.props.coordinates) {
            let dataSource = [
                {
                    center: this.props.coordinates,
                    id: `${this.props.coordinates[0]},${this.props.coordinates[1]}`,
                    lable: this.props.locationName,
                    icon: "",
                    iconImg: "saticImg",
                    imgPath: this.props.deviceIcon
                }
            ];
            let center = this.props.coordinates ? this.props.coordinates : this.props.center;
            this.setState(
                Object.assign(this.state, {
                    devicelocation: this.props.locationName,
                    dataSource: dataSource,
                    center: center
                })
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        // go to next step
        if (JSON.stringify(this.props.location) !== JSON.stringify(nextProps.location) && nextProps.location) {
            let locationName = nextProps.location["location.displayName"];
            let coordinates = JSON.parse(nextProps.location["location.geometry"]).features[0].geometry.coordinates;
            let dataSource = [
                {
                    center: coordinates,
                    id: `${coordinates[0]},${coordinates[1]}`,
                    lable: locationName,
                    icon: "",
                    iconImg: "saticImg",
                    imgPath: nextProps.deviceIcon
                }
            ];
            let center = coordinates;
            this.setState(
                Object.assign(this.state, {
                    devicelocation: locationName,
                    deviceName: nextProps.locationName,
                    dataSource: dataSource,
                    center: center
                })
            );
            this.props.handleLocationChangedFunc(this.props.schemaKey, nextProps.location["location.iotTopologyId"]);
        }

        if (
            this.props.locationName !== nextProps.locationName ||
            JSON.stringify(this.props.coordinates) !== JSON.stringify(nextProps.coordinates)
        ) {
            let dataSource = [
                {
                    center: nextProps.coordinates,
                    id: `${nextProps.coordinates[0]},${nextProps.coordinates[1]}`,
                    lable: nextProps.locationName,
                    icon: "",
                    iconImg: "saticImg",
                    imgPath: nextProps.deviceIcon
                }
            ];
            let center = nextProps.coordinates;
            this.setState(
                Object.assign(this.state, {
                    devicelocation: nextProps.locationName,
                    deviceName: nextProps.locationName,
                    dataSource: dataSource,
                    center: center
                })
            );
        }

        if (this.props.deviceName !== nextProps.deviceName && nextProps.deviceName) {
            // let locationName = nextProps.location["location.displayName"];
            this.setState(
                Object.assign(this.state, {
                    deviceName: `${nextProps.deviceName}-loc`
                })
            );
            // this.props.handleLocationChangedFunc(this.props.schemaKey, nextProps.location["location.iotTopologyId"]);
        } else if (this.props.deviceName !== nextProps.deviceName && !nextProps.deviceName) {
            this.setState(
                Object.assign(this.state, {
                    deviceName: "",
                    devicelocation: ""
                })
            );
        }

        if (this.props.disableSave !== nextProps.disableSave) {
            this.setState(
                Object.assign(this.state, {
                    disableSave: nextProps.disableSave
                })
            );
        }
    }

    getLocationData(locationObj) {
        if (!locationObj) {
            this.setState(
                Object.assign(this.state, {
                    devicelocation: ""
                })
            );
            this.props.handleLocationChangedFunc(this.props.schemaKey, "");
        } else {
            let coordinates = locationObj.locationData;
            // let locationName = locationObj.locationName;
            let locationName = this.state.deviceName || this.state.devicelocation;
            this.setState(
                Object.assign(this.state, {
                    devicelocation: locationName,
                    center: coordinates
                })
            );
            this.props.addLocation(this.props.identify, locationName, coordinates);
        }
    }
    render() {
        const { mapIdentify } = this.props;
        const { dataSource, center, disableSave } = this.state;
        return (
            <div style={{ width: "100%", height: "250px" }}>
                {/* <Tooltip title={schema.default || ""}>
                    <TextField
                        label={schema["displayname"]}
                        value={this.state[schemaKey] || ""}
                        fullWidth
                        multiline={schema.multiline}
                        required={schema.mandatory}
                        inputProps={{ maxLength: schema.size }}
                        disabled={true}
                    />
                </Tooltip> */}
                <div style={{ height: "100%" }}>
                    <MapApplication
                        identify={mapIdentify}
                        dataSource={dataSource}
                        zoom={16}
                        center={center}
                        getData={this.getLocationData.bind(this)}
                        needToolBar={true}
                        disableSave={disableSave}
                    />
                </div>
            </div>
        );
    }
}

AddLocationComp.defaultProps = {
    center: undefined,
    mapIdentify: "map-identify"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        location: filterProps(state, identify, topoFloatTabReducer, "location"),
        disableSave: filterProps(state, identify, topoFloatTabReducer, "disableSave")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addLocation: (identify, locationName, coordinates) => {
            dispatch(addLocation(identify, locationName, coordinates));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddLocationComp);
