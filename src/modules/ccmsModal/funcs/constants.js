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
 * Created by wplei on 25/05/18.
 */
export const REDUCER_NAME = "CCMS/MODALS";
export const BLACK_KEY = "Customize Dashboards";
export const INITIAL_STATE = {
    templates: [
        {
            id: "Blank Template",
            seqId: null,
            value: {
                desc: "Template description:Blank Dashboard",
                pageConfig: {
                    desc: "",
                    status: "2002",
                    priority: "default",
                    applicationId: "",
                    configValue: {
                        thumbnail: "",
                        title: "",
                        widgets: []
                    }
                }
            }
        }
    ]
};
export const filterFirstSpace = str => {
    if ("[object String]" !== Object.prototype.toString.call(str)) return str;
    return str.replace(/^\s+/, "");
};
