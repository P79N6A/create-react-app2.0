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
let widgetBuffer = {};

export const removeBuffer = id => {
    if (!id) {
        widgetBuffer = {};
    }
    delete widgetBuffer[id];
};

export const get = id => {
    return id && widgetBuffer[id];
};

export const loader = config => {
    const { widgets, title } = config;
    document.title = title;
    let widgetPro =
        widgets &&
        widgets.map(async (single, index) => {
            if (single.id && widgetBuffer[single.id]) {
                return Object.assign(widgetBuffer[single.id], {
                    layout: single.layout,
                    properties: Object.assign({}, single.properties)
                });
            } else {
                const moduleEle = await commonLoader(single.uri, single.id);
                if (single.reactEle) {
                    delete single.reactEle;
                }
                single = Object.assign(moduleEle, single);
                widgetBuffer[single.id] = single;
            }
            return single;
        });
    return widgetPro || [];
};

export const commonLoader = async (uri, id) => {
    if (!id) {
        id = renderId();
    }
    const reactEle = await import(`modules/${uri.replace("/", "")}/index.js`);
    return {
        reactEle,
        id
    };
};

export const renderId = () => {
    return `_${Math.random().toFixed(10) * 10000000000}`;
};
