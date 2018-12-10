// import { MATERIAL_KEYS } from "commons/constants/const";
export const REDUCER_NAME = "users";

export const initialState = {
    countData: [0, 0, 0],
};

export const Search = {
    // groups: ["All Dashboards", "Alarms", "Event"],
    // group: "All Dashboards",
    // orderBys: [
    //     { text: "Sort By", value: "Sort By" },
    //     { text: "Newly Added", value: "createDt" },
    //     { text: "Last Edited", value: "updateDt" },
    //     { text: "Most Viewed", value: "callNum" }
    // ],
    // orderBy: "Sort By",
    statusUsersDatas: [
        { status: "Current Month", icon: "people", count: "000", "material-key": null },
        { status: "Last 6 Months", icon: "people", count: "000", "material-key": null },
        { status: "Current Year", icon: "people", count: "000", "material-key":null }
    ]
};