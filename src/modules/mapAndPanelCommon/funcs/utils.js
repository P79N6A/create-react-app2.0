/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import { FullScreenButton } from "modules/ccms/components";
import React from "react";
import moment from "moment";
import $ from "jquery";

// handle the coordinate style from our system for the leaflet map
export const handleCoordinate = (center) => {
    if (!Array.isArray(center)) {
        throw new Error(`${center} is not an array`);
    } else {
        return {
            lat: center[1],
            lng: center[0]
        };
    }
};

// judge if the full screen button is needed
export const fullScreen = (props, editer = "editing") => {
    return editer === "edited" ? [<FullScreenButton {...props} />] : null;
};

// handle date type
export const handleDate = (date) => {
    return moment(date).format("HH:mm:ss DD-MMM-YYYY");
};

// label util to handle the label name too long
const labelHandle = (label) => {
    if (label && label.length) {
        return label.length > 24 ? `${label.substring(0, 24)}...` : label;
    } else {
        return "";
    }
};

// JSON stringfy function
const jsonStringfy = (string) => {
    return JSON.stringify(string);
};

// handle image to base64
export const getBase64 = (img) => {
    function getBase64Image(img, width, height) {
        const canvas = document.createElement("canvas");
        canvas.width = width || img.width;
        canvas.height = height || img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL();
    }
    const image = new Image();
    image.src = img;
    const deferred=$.Deferred();
    if(img){
        image.onload =function (){
            deferred.resolve(getBase64Image(image));
        };
        return deferred.promise();
    }
};

export const c_ = {
    label: labelHandle,
    JS: jsonStringfy
};