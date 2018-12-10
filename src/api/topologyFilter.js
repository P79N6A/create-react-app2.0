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
 * Created by Wangrui on 25/05/2018.
 */
import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getTopologyFilterDataBySearch(searchWord, paginator, application) {
    let urls = await getUrl();
    let appCondition = {
        operator: "OR",
        predicates: [
            {
                field: "physical.resourcePath",
                operator: "LIKE",
                value: application + "/" || ""
            }
        ]
    };
    appCondition = application ? appCondition : undefined;
    let postData = {
        format: "recordset",
        outputs: ["physical", "devicemodel"],
        predicate: {
            operator: "AND",
            predicates: [
                {
                    operator: "OR",
                    predicates: [
                        {
                            field: "physical.resourcePath",
                            operator: "LIKE",
                            value: searchWord || ""
                        },
                        {
                            field: "physical.displayName",
                            operator: "LIKE",
                            value: searchWord || ""
                        }
                    ]
                },
                appCondition
            ]
        },
        paginator,
        orderby: "physical.resourcePath asc",
        resources: ["physical"],
        type: "graphs"
    };
    return fetch.post(urls.topologySearchResource, postData);
}

export async function getTopologyModelFilterDataBySearch(searchWord, paginator) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: ["devicemodel"],
        predicate: {
            field: "devicemodel.displayName",
            operator: "LIKE",
            value: searchWord || ""
        },
        paginator,
        orderby: "devicemodel.displayName asc",
        resources: ["devicemodel"],
        type: "graphs"
    };
    return fetch.post(urls.topologySearchResource, postData);
}
