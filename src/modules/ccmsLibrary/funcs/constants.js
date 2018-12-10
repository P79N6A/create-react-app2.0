export const REDUCER_NAME = "DASHBOARD/LIBRARY";
export const DEFAULT_SEARCH_CONDITION = {
    sortOrders: [
        {
            field: "priority",
            asc: false
        },
        {
            field: "createDt",
            asc: false
        }
    ],
    pageable: { pageno: 0, limit: 200 },
    group: "",
    name: "",
    fields: ["pageKey", "pageId", "name", "desc", "createDt", "updateDt"]
};
export const DEFAULT_GROUP_SEARCH_CONDITION = {
    sortOrders: [{ field: "updateDt", asc: false }, { field: "id", asc: true }]
};

export const DASHBOARD_BLACK_LIST = "Customize Dashboards";

export const SESSION_CONDITION_KEY = "ISC-DASHBOARD-SEARCH-CONDITIONS";
