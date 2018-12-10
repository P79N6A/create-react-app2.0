/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
import { TOKEN_KEY } from "../constants/const";

/**
 * @fileOverview Local token management
 * @module TokenHelper
 * @author HeZIGANG
 * @exports {
 *  get,
 *  set,
 *  remove
 * }
 */

/**
 * Set token to localStorage
 * @example
 * import tokenHelper from './tokenHelper';
 * tokenHelper.set('this is your current token from server side');
 *
 * @param {string} token token string from server side
 */
function set(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get token from localStorage
 * @example
 * import tokenHelper from './tokenHelper';
 * let token = tokenHelper.get();
 * @returns current token
 */
function get() {
    return sessionStorage.getItem(TOKEN_KEY);
}

/**
 * Remove currrent token from localStorage
 * @example
 * import tokenHelper from './tokenHelper';
 * tokenHelper.remove();
 *
 */
function remove() {
    // sessionStorage.removeItem(TOKEN_KEY);
}

export default {
    set,
    get,
    remove
};
