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
 * Created by Zach on 25/05/2018.
 */

import { LANG_CONFIG_PATH, LANGUAGE_KEY } from "../constants/const";
import Fetch from "./fetch";

const getLang = async lang => {
    const KEY = LANGUAGE_KEY + "-" + lang.toUpperCase();
    var data = sessionStorage.getItem(KEY);
    if (data) {
        return new Promise(function(resolve, reject) {
            resolve(JSON.parse(data));
        });
    }

    let header = {
        headers: {
            "Cache-control": "no-store"
        }
    };

    const language = await Fetch.get(LANG_CONFIG_PATH.replace("{0}", lang), header);
    sessionStorage.setItem(KEY, JSON.stringify(language));
    return language;
};

export default getLang;
