import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getTopologyData(
    pageLimit,
    pageNo,
    predicate,
    sortConfig,
    resourcesLists = [
        "physical",
        "logical",
        "location",
        "devicetype",
        "devicemodel",
        "address",
        "property",
        "parentdevice"
    ],
    outputLists = [
        "physical",
        "logical",
        "location",
        "devicetype",
        "devicemodel",
        "address",
        "property",
        "parentdevice"
    ]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        resources: resourcesLists,
        type: "graphs"
    };
    if (predicate) {
        postData.predicate = predicate;
    }
    if (sortConfig) {
        postData.orderby = sortConfig;
    }
    return fetch.post(urls.topologySearchResource, postData);
}

export async function getTopologyDetail(
    deviceId,
    resourcesLists = ["location", "physical", "devicetype", "property", "devicemodel", "address", "logical"],
    outputLists = ["physical", "location", "devicetype", "property", "devicemodel", "address", "logical"]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        predicate: {
            predicates: [
                {
                    field: "physical.iotTopologyId",
                    operator: "EQ",
                    value: deviceId
                }
            ],
            operator: "AND"
        },
        resources: resourcesLists,
        type: "graphs"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function getTopologyAlarm(iotId, pageNo, pageLimit, orderOpt) {
    let urls = await getUrl();
    let postData = {
        type: "alarms",
        format: "filter",
        predicate: {
            predicates: [
                {
                    field: "capevent.senderid",
                    operator: "EQ",
                    value: iotId
                }
            ],
            operator: "AND"
        },
        paginator: {
            pageno: pageNo,
            limit: pageLimit
        }
    };
    if (orderOpt) {
        let sortorders = [{ ascending: orderOpt.ascending, sortfield: `capevent.${orderOpt.alarmOrderBy}` }];
        postData = Object.assign(postData, {
            sortorders: sortorders
        });
    }
    return fetch.post(urls.alarmSearch, postData);
}

export async function getTopologyEvent(iotId, pageNo, pageLimit, orderOpt) {
    let urls = await getUrl();
    let postData = {
        type: "events",
        format: "filter",
        predicate: {
            predicates: [
                {
                    field: "capevent.senderid",
                    operator: "EQ",
                    value: iotId
                }
            ],
            operator: "AND"
        },
        paginator: {
            pageno: pageNo,
            limit: pageLimit
        }
    };
    if (orderOpt) {
        let sortorders = [{ ascending: orderOpt.ascending, sortfield: `capevent.${orderOpt.alarmOrderBy}` }];
        postData = Object.assign(postData, {
            sortorders: sortorders
        });
    }
    return fetch.post(urls.eventSearch, postData);
}

export async function searchTopoTypes() {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: [],
        resources: ["devicemodel"],
        type: "graphs",
        orderby: "devicemodel.displayName asc"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function exportTopologyData() {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        orderby: "resourcePath asc",
        outputs: ["resourcePath", "sensorstatus", "name", "displayName", "devicetype", "Time"],
        predicate: {
            operator: "AND",
            predicates: [
                {
                    field: "Time",
                    operator: "NEQ",
                    value: "null"
                }
            ]
        },
        paginator: {
            limit: 5000,
            pageno: 1
        },
        type: "property"
    };
    return fetch.post(urls.topologyPropertySearch, postData);
}

export async function getTopoDeviceType(
    pageLimit,
    pageNo,
    predicate,
    sortConfig,
    resourcesLists = ["devicemodel"],
    outputLists = ["devicemodel"]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        resources: resourcesLists,
        type: "graphs"
    };
    if (predicate) {
        postData.predicate = predicate;
    }
    if (sortConfig) {
        postData.orderby = sortConfig;
    }
    return fetch.post(urls.topologySearchResource, postData);
}

export async function deleteDeviceData(iotId) {
    let urls = await getUrl();
    let postData = {
        action: "delete",
        "physical.iotTopologyId": { remove: iotId }
    };
    return fetch.post(urls.topologyDevicesIot, postData);
}

export async function deleteDeviceTypeData(iotId) {
    let urls = await getUrl();
    let postData = {
        action: "delete",
        "devicemodel.iotTopologyId": { remove: iotId }
    };
    return fetch.post(urls.topologyDeviceModelsIot, postData);
}

export async function searchTopoAddress(
    address,
    pageLimit = 20,
    pageNo = 1,
    resourcesLists = ["address"],
    outputLists = ["address"]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        resources: resourcesLists,
        type: "graphs"
    };
    if (address) {
        postData.predicate = {
            predicates: [
                {
                    field: "address.displayName",
                    operator: "LIKE",
                    value: address
                },
                {
                    field: "address.name",
                    operator: "LIKE",
                    value: address
                }
            ],
            operator: "AND"
        };
    }
    return fetch.post(urls.topologySearchResource, postData);
}

export async function searchTopoAddressApplications(
    address,
    pageLimit = 20,
    pageNo = 1,
    resourcesLists = ["address"],
    outputLists = ["address"],
    orderby,
    searchFlag
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        resources: resourcesLists,
        type: "graphs",
        orderby
    };
    let predicates = [
        {
            field: "address.recordType",
            operator: "EQ_STR_NC",
            value: "application"
        }
    ];
    if (address) {
        predicates = predicates.concat({
            field: !!searchFlag ? "address.iotTopologyId" : "address.displayName",
            operator: "LIKE",
            value: address
        });
    }
    postData.predicate = {
        predicates: predicates,
        operator: "AND"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function searchTopoLocation(
    location,
    pageLimit = 20,
    pageNo = 1,
    resourcesLists = ["location"],
    outputLists = ["location"]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        resources: resourcesLists,
        type: "graphs"
    };
    if (location) {
        postData.predicate = {
            predicates: [
                {
                    field: "location.displayName",
                    operator: "LIKE",
                    value: location
                },
                {
                    field: "location.name",
                    operator: "LIKE",
                    value: location
                }
            ],
            operator: "AND"
        };
    }
    return fetch.post(urls.topologySearchResource, postData);
}

export async function addNewDevice(
    devicetypeId,
    deviceName,
    deviceDisplayName,
    deviceAddressId,
    deviceLocationId,
    parentDeviceId,
    properties
) {
    let urls = await getUrl();
    let postData = {
        action: "create",
        "physical.name": deviceName,
        "physical.displayName": deviceDisplayName,
        "address.iotTopologyId": deviceAddressId,
        "devicemodel.iotTopologyId": devicetypeId,
        "location.iotTopologyId": deviceLocationId
    };
    if (properties) {
        postData["physical.properties"] = properties;
    }
    if (parentDeviceId) {
        postData["parentdevice.iotTopologyId"] = parentDeviceId;
    }
    return fetch.post(urls.topologyDevicesIot, postData);
}

export async function addLocation(locationName, coordinates) {
    let urls = await getUrl();
    let geocode = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "Point",
                    coordinates: coordinates
                }
            }
        ]
    };
    let postData = {
        "location.name": locationName,
        "location.displayName": locationName,
        geocode: JSON.stringify(geocode)
    };
    return fetch.post(urls.topologyLocations, postData);
}

export async function editDeviceDetail(
    deviceId,
    deviceDisplayName,
    devicetypeId,
    deviceapplication,
    locationObj,
    properties
) {
    let urls = await getUrl();
    let postData = {};
    if (locationObj instanceof Object || deviceapplication instanceof Object) {
        postData = {
            "location.iotTopologyId": locationObj,
            "address.iotTopologyId": deviceapplication
        };
    }
    if (properties) {
        postData["physical.properties"] = properties;
    }
    postData = Object.assign(postData, deviceDisplayName, {
        action: "update",
        "physical.iotTopologyId": deviceId
    });
    return fetch.post(urls.topologyDevicesIot, postData);
}

export async function addNewDeviceType(devicetypedisplayname, devicetypename) {
    let urls = await getUrl();
    let postData = {
        action: "create",
        "devicemodel.displayName": devicetypedisplayname,
        "devicemodel.name": devicetypename
    };
    return fetch.post(urls.topologyDeviceModelsIot, postData);
}

export async function editDeviceType(selectDeviceId, devicetypedisplayname) {
    let urls = await getUrl();
    let postData = {
        action: "update",
        "devicemodel.iotTopologyId": selectDeviceId,
        "devicemodel.displayName": devicetypedisplayname
    };
    return fetch.post(urls.topologyDeviceModelsIot, postData);
}

export async function getDeviceSchema(siteName) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${siteName}&modulename=topology&submodulename=device-schema&configname=default-device-schema`
    );
}

// get sysconfig device type schema
export async function getSysconfigDeviceTypeSchema(siteName) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${siteName}&modulename=topology&submodulename=device-types-schema&configname=default-device-types-schema`
    );
}

// need delete, maybe
export async function getDeviceTypeSchema(siteName) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${siteName}&modulename=topology&submodulename=device-types-schema&configname=default-device-types-schema`
    );
}

export async function addSysconfigDeviceType(
    devicetypeId,
    defaultvalues,
    additionalProperty,
    basicTypeInstances,
    deviceProperty,
    siteName,
    userid
) {
    let urls = await getUrl();
    let configval = JSON.stringify({
        [defaultvalues.devicetypename]: Object.assign(basicTypeInstances, additionalProperty, deviceProperty)
    });
    let postData = {
        configs: [
            {
                configvals: [
                    {
                        configvalname: defaultvalues.devicetypename,
                        configvaldesc: additionalProperty["additionalProperty"].description,
                        configvalformat: "json",
                        configval: configval || {},
                        modifiedby: userid
                    }
                ],
                configname: devicetypeId,
                modifiedby: userid
            }
        ]
    };
    return fetch.post(
        `${urls.sysconfigs}?sitename=${siteName}&modulename=topology&submodulename=device-types`,
        postData
    );
}

export async function editSysconfigDeviceType(
    devicetypeId,
    defaultvalues,
    additionalProperty,
    basicTypeInstances,
    deviceProperty,
    siteName,
    userid
) {
    let urls = await getUrl();
    let configval = JSON.stringify({
        [defaultvalues.devicetypename]: Object.assign(basicTypeInstances, additionalProperty, deviceProperty)
    });
    let postData = {
        config: {
            configvals: [
                {
                    configvalname: defaultvalues.devicetypename,
                    configvaldesc: additionalProperty["additionalProperty"].description,
                    configvalformat: "json",
                    configval: configval || {},
                    modifiedby: userid
                }
            ],
            configname: devicetypeId,
            modifiedby: userid
        }
    };
    return fetch.put(
        `${
            urls.sysconfigs
        }?sitename=${siteName}&modulename=topology&submodulename=device-types&configname=${devicetypeId}`,
        postData
    );
}

export async function getSysconfigBasictype(siteName) {
    let urls = await getUrl();
    return fetch.get(
        `${urls.sysconfigs}?sitename=${siteName}&modulename=topology&submodulename=basic-types&pageno=1&limit=1000`
    );
}

export async function deleteSysconfigDeviceType(iotId, siteName) {
    let urls = await getUrl();
    return fetch.del(
        `${urls.sysconfigs}?sitename=${siteName}&modulename=topology&submodulename=device-types&configname=${iotId}`
    );
}

export async function getDeviceTypeDetail(
    selectDeviceId,
    resourcesLists = ["devicemodel"],
    outputLists = ["devicemodel"]
) {
    // "v1/topology/devicetypes/resourcespectype.0e268e2c76b8c1239cebba34c1c2b0c5b37a9133eb5ef78cc4b2e1c16b057142"
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        predicate: {
            predicates: [
                {
                    field: "devicemodel.iotTopologyId",
                    operator: "EQ",
                    value: selectDeviceId
                }
            ],
            operator: "AND"
        },
        resources: resourcesLists,
        type: "graphs"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function getSysconfigDeviceTypeDetail(siteName, selectDeviceId) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${siteName}&modulename=topology&submodulename=device-types&configname=${selectDeviceId}`
    );
}

export async function getSysconfigDeviceType(siteName) {
    let urls = await getUrl();
    // "sc-sysconfig-api/v1/configs?sitename=NCS&modulename=topology&submodulename=device-types&pageno=1&limit=20&sort=asc"
    return fetch.get(
        `${urls.sysconfigs}?sitename=${siteName}&modulename=topology&submodulename=device-types&pageno=1&limit=1000`
    );
}

export async function getSysconfigDeviceSchema(siteName) {
    let urls = await getUrl();
    // "sc-sysconfig-api/v1/configs?sitename=NCS&modulename=topology&submodulename=device-types&pageno=1&limit=20&sort=asc"
    return fetch.get(
        `${
            urls.sysconfigs
        }?sitename=${siteName}&modulename=topology&submodulename=device-schema&configname=default-device-schema`
    );
}

export async function getSysconfigIntegrationSystems(siteName) {
    let urls = await getUrl();
    // "sc-sysconfig-api/v1/configs?sitename=NCS&modulename=topology&submodulename=device-types&pageno=1&limit=20&sort=asc"
    return fetch.get(
        `${
            urls.sysconfigs
        }?sitename=${siteName}&modulename=topology&submodulename=realworld-resource-integration-systems`
    );
}

export async function updateDevicetypeProperty(devicetypeId, propertyFromat, updateProperty, deleteProperty) {
    let urls = await getUrl();
    let postData = { add: {}, remove: [] };
    if (propertyFromat) {
        postData.add = propertyFromat;
    }
    if (updateProperty) {
        postData = Object.assign(postData, updateProperty);
    }
    if (deleteProperty) {
        postData.remove = propertyFromat;
    }
    return fetch.put(`${urls.topologyProperty}/${devicetypeId}`, postData);
}

export async function getTopoTreeData(roles, iotId, treeMode) {
    let urls = await getUrl();
    let layers = [];
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            let role = {
                roleid: roles[i],
                parentid: iotId || "",
                maxdepth: 1
            };
            if (treeMode === "address") {
                role = Object.assign(role, {
                    format: treeMode
                });
            }
            layers.push(role);
        }
    }

    let postData = {
        layers: layers
    };
    return fetch.post(urls.topologyLayersIOT, postData);
}

// apis for topology tree
export async function getTopoGraphData(iotId) {
    let urls = await getUrl();
    return fetch.get(`${urls.topologyLayers}/${iotId}?viewtype=1`);
}

export async function searchTopoGraphArea(areaFormat) {
    let urls = await getUrl();

    let postData = {
        format: "filter",
        predicate: {
            field: "spatial",
            operator: "EQ",
            value: areaFormat
        },
        type: "graphs"
    };
    return fetch.post(urls.topologySearchGraph, postData);
}

export async function searchTopoTreeData(
    pageNo,
    pageLimit,
    treeFilter,
    selectAppRespath,
    underAppFilter,
    resourcesLists = ["address", "physical", "devicemodel", "property", "parentdevice"],
    outputLists = ["address", "physical", "devicemodel", "property", "parentdevice"]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        predicate: {
            predicates: [
                {
                    operator: "OR",
                    predicates: treeFilter
                }
            ],
            operator: "AND"
        },
        resources: resourcesLists,
        type: "graphs",
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        }
    };
    if (selectAppRespath) {
        postData.predicate.predicates.push(underAppFilter);
    }

    return fetch.post(urls.topologySearchResource, postData);
}

export async function getDeviceDeviceType(
    deviceId,
    resourcesLists = ["physical", "devicemodel"],
    outputLists = ["physical", "devicemodel"]
) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: outputLists,
        predicate: {
            predicates: [
                {
                    field: "physical.iotTopologyId",
                    operator: "EQ",
                    value: deviceId
                }
            ],
            operator: "AND"
        },
        resources: resourcesLists,
        type: "graphs"
    };

    return fetch.post(urls.topologySearchResource, postData);
}

export async function sendDeviceCommandFetch(deviceId, changedValue) {
    let urls = await getUrl();
    let postData = {
        "physical.iotTopologyId": deviceId,
        "physical.properties": changedValue
    };

    return fetch.post(urls.topologyCommand, postData);
}

export async function getTopoCommandData(pageLimit, pageNo, predicate, sortConfig) {
    let urls = await getUrl();
    let postData = {
        type: "cntrlMsgRequests",
        paginator: {
            pageno: pageNo,
            limit: pageLimit
        },
        format: "filter"
    };
    if (predicate) {
        postData.predicate = predicate;
    }
    if (sortConfig) {
        let sort = sortConfig.split(" ");
        postData.sortorders = [
            {
                sortField: sort[0],
                ascending: sort[1] === "asc" ? "true" : "false"
            }
        ];
    }

    return fetch.post(urls.topologyCommandStatus, postData);
}
