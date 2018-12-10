export const REDUCER_NAME = "logger";

export const initState = {
    payload: [],
    moduleList: [],
    module: "",
    secondModuleList: [],
    isLoading: false,
    pushWebsocket: true,
    secondModule: "",
    criteria: "ALL",
    downloadfile: [],
    paginations: {},
    searchData: {
        pageno: 1,
        limit: 20
    }
};

export const columnDatas = [
    {
        id: "value",
        numeric: false,
        disablePadding: false,
        label: "Logger"
    }
];

export const selectsDatas = [
    {
        name: "module",
        value: "",
        label: "",
        items: []
    },
    {
        name: "moduleChild",
        value: "",
        label: "",
        items: []
    },
    {
        name: "criteria",
        value: "ALL",
        label: "",
        items: ["ALL", "INFO", "WARN", "ERROR", "DEBUG"]
    }
];
