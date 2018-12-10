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
 * Created by Jia Luo on 27/07/2018.
 */
export const REDUCER_NAME = "security/resource_path";

export const initialState = {
    payload: [],
    radioSelected:"",
    loading: true,
    pagination: {
        currentpage: 1,
        limit: 20,
        totalpages: 0,
        totalrecords: 0
    },
    searchData: {
        pageno: 1,
        limit: 20,
        orderby: "address.displayName asc",
        address: ""
    }
};

export const userFilter = [
    { text: "Show All Status", value: "both" },
    { text: "Active only", value: "active" },
    { text: "Inactive only", value: "inactive" }
];

export const columnDatas = [
    {
        id: "address.displayName",
        numeric: false,
        disablePadding: false,
        label: "Address DisplayName",
        property: { component: "th", scope: "row" }
    },
    {
        id: "address.name",
        numeric: false,
        disablePadding: false,
        label: "Address Name"
    },
    {
        id: "address.nodeId",
        numeric: false,
        disablePadding: false,
        label: "Address NodeId",
        orderby: false
    },
    {
        id: "address.format",
        numeric: false,
        disablePadding: false,
        label: "Address Format",
        orderby: false
    }
];

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

export const data = [
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Honeycomb", 408, 3.2, 87, 6.5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Jelly Bean", 375, 0.0, 94, 0.0),
    createData("KitKat", 518, 26.0, 65, 7.0),
    createData("Lollipop", 392, 0.2, 98, 0.0),
    createData("Marshmallow", 318, 0, 81, 2.0),
    createData("Nougat", 360, 19.0, 9, 37.0),
    createData("Oreo", 437, 18.0, 63, 4.0)
];

export const columnData = [
    { id: "name", numeric: false, disablePadding: true, label: "Dessert (100g serving)" },
    { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
    { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
    { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
    { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" }
];
