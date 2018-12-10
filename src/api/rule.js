import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import $ from "jquery";
// const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
// const currentSubmodulename = "iotplatform";
export async function getRuleData(pageLimit = 10, pageNo = 1, sitename, modulename, currentSubmodulename) {
    let urls = await getUrl();
    // const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
    return fetch.get(
        `${
            urls.sysconfigs
        }?sitename=${sitename}&modulename=${modulename}&submodulename=${currentSubmodulename}&pageno=${pageNo}&limit=${pageLimit}&sort=asc`
    );
}

export async function getRuleDetail(sitename, modulename, currentSubmodulename, configname) {
    let urls = await getUrl();
    // const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${sitename}&modulename=${modulename}&submodulename=${currentSubmodulename}&configname=${encodeURIComponent(
            configname
        )}`
    );
}

export async function searchRule(pageNo = 1, pageLimit = 10, sitename, modulename, currentSubmodulename, searchpredicate, sortConfig) {
    let urls = await getUrl();
    // const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
    let postData = {
        format: "filter",
        type: "configs",
        paginator: {
            limit: pageLimit,
            pageno: pageNo
        },
        predicate: {
            operator: "AND",
            predicates: [
                {
                    field: "site.sitename",
                    operator: "EQ",
                    value: sitename
                },
                {
                    field: "module.modulename",
                    operator: "EQ",
                    value: modulename
                },
                {
                    field: "submodule.submodulename",
                    operator: "EQ",
                    value: currentSubmodulename
                }
            ]
        }
    };

    if (searchpredicate && searchpredicate.predicates) {
        postData.predicate.predicates.push(searchpredicate.predicates[0]);
    }
    let sort = [
        {
            sortfield: "config.configname",
            ascending: true
        }
    ];
    if (sortConfig.sort && sortConfig.orderBy) {
        let ascFlag = sortConfig.sort === "asc" ? true : false;
        sort = [
            {
                sortfield: `config.${sortConfig.orderBy}`,
                ascending: ascFlag
            }
        ];
    }
    postData.sortorders = sort;
    return fetch.post(urls.sysconfigSearch, postData);
}

export async function updateRule(sitename, modulename, currentSubmodulename, configname, configvaldesc, configval, user) {
    let urls = await getUrl();
    // const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
    let postData = {
        config: {
            configname: configname,
            modifiedby: user,
            configvals: [
                {
                    configvalname: configname,
                    configvaldesc: configvaldesc || "",
                    configvalformat: "json",
                    configval: configval,
                    modifiedby: user
                }
            ]
        }
    };
    return fetch.put(
        `${
            urls.sysconfigs
        }?sitename=${sitename}&modulename=${modulename}&submodulename=${currentSubmodulename}&configname=${encodeURIComponent(
            configname
        )}`,
        postData
    );
}
export async function addRule(config) {
    let urls = await getUrl();
    // const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
    let postData = {
        configs: [
            {
                configvals: [
                    {
                        configvalname: $.trim(config.configName),
                        configvaldesc: config.configvaldesc,
                        configvalformat: "json",
                        configval: config.configValue || "",
                        modifiedby: config.userid
                    }
                ],
                configname: $.trim(config.configName),
                modifiedby: config.userid
            }
        ]
    };

    return fetch.post(
        `${urls.sysconfigs}?sitename=${config.sitename}&modulename=${config.modulename}&submodulename=${config.submodulename}`,
        postData
    );
}
export async function getRuleSchema(sitename) {
    let urls = await getUrl();
    return fetch.get(
        `${urls.sysconfigDetail}?sitename=${sitename}&modulename=cep-rules-schema&configname=rules-schema`
    );
}

export async function getActionSchema(sitename) {
    let urls = await getUrl();
    return fetch.get(
        `${urls.sysconfigDetail}?sitename=${sitename}&modulename=cep-rules-schema&configname=actions-schema`
    );
}
export async function deleteRule(sitename, modulename, currentSubmodulename, config) {
    let urls = await getUrl();
    // const currentSubmodulename = sessionStorage.getItem("ISC-APPLICATION-INFO")&&JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO"))["address.name"];
    return fetch.post(`${urls.sysconfigs}/delete?sitename=${sitename}&modulename=${modulename}&submodulename=${currentSubmodulename}`, config);
    // return fetch.del(
    //     `${
    //         urls.sysconfigs
    //     }?sitename=${sitename}&modulename=cep-rules&submodulename=iotplatform&configname=${encodeURIComponent(
    //         configname
    //     )}`
    // );
}
export async function topologyList(iotIds = {}) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: ["devicemodel"],
        predicate: {
            field: "physical.iotTopologyId",
            operator: "LIKE",
            value: iotIds.value

        },
        resources: ["devicemodel"],
        type: "graphs"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function deviceModelConfig(sitename, devicemodel) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.topologyDeviceModels
        }/properties/${encodeURIComponent(
            devicemodel
        )}`
    );
}

export async function emailList(sitename, submodulename, emailType) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${sitename}&modulename=notification_config&submodulename=${submodulename}&configname=${encodeURIComponent(
            emailType
        )}`
    );
}

export async function updateNotification(sitename, submodulename, configname, configvaldesc, configval, user) {
    let urls = await getUrl();
    let postData = {
        config: {
            configname: configname,
            modifiedby: user,
            configvals: [
                {
                    configvalname: configname,
                    configvaldesc: configvaldesc || "",
                    configvalformat: "text",
                    configval: configval || "",
                    modifiedby: user
                }
            ]
        }
    };
    return fetch.put(
        `${
            urls.sysconfigs
        }?sitename=${sitename}&modulename=notification_config&submodulename=${submodulename}&configname=${encodeURIComponent(
            configname
        )}`,
        postData
    );
}
export async function notificationConfig(config, type) {
    let urls = await getUrl();
    const url = type ? `${urls.notificationConfig}/${type}`: urls.notificationConfig;
    return fetch.post(url, config);
}
export async function workflowConfig(config, type) {
    let urls = await getUrl();
    return fetch.post(`${urls.bpmConfig}/${type}`, config);
}

export async function updateAction(sitename, configTest, user) {
    let urls = await getUrl();
    let modules = [];
    modules.submodules = [];
    modules.submodules.configs = [];
    modules = configTest.map(module => {
        modules.submodules = [];
        module.submodules &&
            module.submodules.map(submodule => {
                modules.submodules.configs = [];
                submodule.configs.map(config => {
                    modules.submodules.configs.push({
                        configname: config.configname,
                        modifiedby: user,
                        configvals: [
                            {
                                configvalname: config.configname,
                                configvaldesc: config.configvaldesc || "",
                                configvalformat: config.configvalformat || "text",
                                configval: config.configval || "",
                                modifiedby: user
                            }
                        ]
                    });
                    return  modules.submodules.configs;
                });
                modules.submodules.push({
                    submodulename: submodule.submodulename,
                    modifiedby: user,
                    config: modules.submodules.configs
                });
                return modules.submodules;
            });
        return {
            modulename: module.modulename,
            modifiedby: user,
            submodules: modules.submodules,
            moduletype:"json",
            status: "1"
        };
    });
    const postData = {
        "site": {
            modules,
            sitename,
            "status": "1",
            "modifiedby": user
        }
    };
    return fetch.put(`${urls.syssites}?sitename=${sitename}`, postData);
}
export async function actionContent(sitename, modulename, submodulename, config, alarmtype) {
    let urls = await getUrl();
    return fetch.get(
        `${
            urls.sysconfigDetail
        }?sitename=${sitename}&modulename=${modulename}&submodulename=${submodulename}&configname=${encodeURIComponent(
            `${config}.${alarmtype}`
        )}`
    );
}

export async function exportRules(columninfos, iotIds, times, readings) {
    // let urls = await getUrl();
    // let filter = getEventAlarmPredicate("alarms", iotIds, times, readings);
    // let postdata = {
    //     fileinfo: {
    //         filename: "alarm",
    //         timezone: -8,
    //         format: "excel",
    //         columninfos
    //     },
    //     filter,
    //     pageinfo: {
    //         indexs: [
    //             {
    //                 end: 1,
    //                 start: 1
    //             }
    //         ],
    //         pagesize: 50
    //     }
    // };
    // return post(urls.exportAlarms, postdata);
}
