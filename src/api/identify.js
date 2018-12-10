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

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import formatterUrlParam from "commons/utils/formatterUrlParam";

export async function login(userName, password, accountname) {
    let urls = await getUrl();
    return fetch.post(urls.signin, {
        format: "ISCLoginDTO",
        id: userName,
        password: password,
        accountname: accountname
    });
}

export async function keepAlive() {
    let urls = await getUrl();
    return fetch.put(urls.keepAlive);
}

export async function logout(token) {
    let urls = await getUrl();
    return fetch.post(urls.logout, { "ISC-Auth-Token": token });
}

export async function isTokenValid() {
    let urls = await getUrl();
    return fetch.post(urls.isTokenValid);
}

export async function getAccountData() {
    let urls = await getUrl();
    let url = urls.sysconfigAccount;
    return fetch.get(`${url}`);
}

export async function forgotPassword(email, code, captchatoken) {
    let urls = await getUrl();
    let url = urls.forgotPassword.replace("{0}", code);
    let postData = {
        email,
        captchatoken
    };
    return fetch.post(url, postData);
}

export async function resetForgotPassword({ token, newPassword, confirmPassword }) {
    let urls = await getUrl();
    let url = formatterUrlParam(urls.resetForgotPassword, token);
    let postData = {
        newPassword,
        confirmPassword,
        format: "ISCResetPasswordDTO"
    };
    return fetch.post(url, postData);
}

export async function getVerificationCode() {
    let urls = await getUrl();
    let url = urls.getVerificationCode;
    return fetch.getFile(
        `${url}`,
        {},
        {
            // "Content-Type": "application/octet-stream",
            Accept: "application/octet-stream",
            "Accept-Encoding": "*",
            "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7"
        }
    );
}

export async function checkVerificationCode(code, captchaToken) {
    let urls = await getUrl();
    let url = urls.checkVerificationCodePost.replace("{0}", code);
    // let url = urls.checkVerificationCode.replace("{0}", code);
    return fetch.get(`${url}`, {}, { "captcha-token": captchaToken });
}
