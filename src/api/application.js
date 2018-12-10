import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getTopoAddress(
    pageLimit,
    pageNo,
    predicate,
    sortConfig,
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
    if (predicate) {
        postData.predicate = predicate;
    }
    if (sortConfig) {
        postData.orderby = sortConfig;
    }
    return fetch.post(urls.topologySearchResource, postData);
}

export async function deleteAddressData(iotId) {
    let urls = await getUrl();
    // return fetch.del(urls.topologyAddress + "/" + iotId);
    const postData = iotId;
    return fetch.post(urls.topologyAddressDelete, postData);
}

export async function getTopologySchema(siteName, schemaType) {
    let urls = await getUrl();
    const uri = `?sitename=${siteName}&modulename=topology&submodulename=${schemaType}-schema&configname=default-${schemaType}-schema`;
    return fetch.get(urls.sysconfigDetail + uri);
}

export async function getAddressDetail(
    selectAddressId,
    addressType,
    resourcesLists = ["address"],
    outputLists = ["address"]
) {
    // "v1/topology/devicetypes/resourcespectype.0e268e2c76b8c1239cebba34c1c2b0c5b37a9133eb5ef78cc4b2e1c16b057142"
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: addressType === "address" ? [...outputLists, "location"] : outputLists,
        predicate: {
            predicates: [
                {
                    field: "address.iotTopologyId",
                    operator: "EQ_STR_NC",
                    value: selectAddressId
                }
            ],
            operator: "AND"
        },
        resources: addressType === "address" ? [...resourcesLists, "location"] : resourcesLists,
        type: "graphs"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function getDeviceDetail(
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

export async function addNewAddress(displayname, name, icon, location, image, type, parentid) {
    let urls = await getUrl();
    let postData = {
        "address.displayName": displayname,
        "address.name": name,
        "address.recordType": type,
        "address.icon": icon,
        "address.imagePathId": type === "application" ? image : undefined,
        "location.iotTopologyId": type === "address" && location ? { add: [location] } : undefined,
        "parent.iotTopologyId": type === "address" ? parentid : undefined
    };
    return fetch.post(urls.topologyApplication, postData);
}

export async function updateAddress(type, addressId, displayname, name, icon, newLoc, oldLoc, image) {
    // addressType, addressId, displayname, addressname, location
    let urls = await getUrl();
    let postData = {
        addressId: addressId,
        "address.displayName": displayname,
        "address.name": name,
        "address.icon": icon,
        "address.imagePathId": type === "application" ? image : undefined,
        "location.iotTopologyId": type === "address" && newLoc ? { add: [newLoc], remove: [oldLoc] } : undefined
    };
    // return fetch.put(urls.topologyAddress + "/" + addressId, postData);
    return fetch.post(urls.topologyAddressUpdate, postData);
}

export async function getTopoTreeData(nodeType, roles, iotId) {
    let urls = await getUrl();
    let layers = [];
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            let role = {
                roleid: roles[i],
                parentid: iotId || "",
                maxdepth: 1
            };
            layers.push(role);
        }
    }

    let postData = {
        layers: layers
    };
    return fetch.post(urls.topologyLayers, postData);
}

export async function getTopoResourcepathData(pageLimit, pageNo, predicates, iotId, resourcetype, sortConfig) {
    let urls = await getUrl();
    const postData = {
        format: "recordset",
        maxdepth: 1,
        mindepth: 1,
        orderby: sortConfig,
        outputs: [],
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        predicate: {
            operator: "AND",
            predicates: [
                {
                    field: "parentid",
                    operator: "EQ",
                    value: iotId
                },
                {
                    field: "resourcetype",
                    operator: "IN",
                    values: resourcetype
                    // values: ["address","device"]
                }
            ]
        },
        type: "resourcepath"
    };

    return fetch.post(urls.topologyResourcepath, postData);
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
