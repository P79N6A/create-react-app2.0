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
// import { I18n } from "react-i18nify";
export const validate = {
    required: {
        // reg: /^[^\s+]/,
        reg: /^[^ ]/,
        msg: "security.validation.required"
    },
    id: {
        reg: /^[a-zA-Z0-9.@_]{3,49}$/,
        msg: "security.validation.userid"
    },
    name: {
        reg: /^\w{3,99}$/,
        msg: "security.validation.username"
    },
    normal: {
        reg: /^[\W\w]{0,128}$/,
        msg: "security.validation.textfield"
    },
    dbnormal: {
        reg: /^[\W\w]{0,255}$/,
        msg: "security.validation.textarea"
    },
    password: {
        reg: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?.]).{8,20}$/,
        msg: "security.validation.password"
    },
    email: {
        reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        msg: "security.validation.email"
    },
    countrycode: {
        reg: /^\+\d+$/,
        msg: "security.validation.countrycode"
    },
    number: {
        reg: /^\d+$/,
        msg: "security.validation.number"
    },
    phone: {
        reg: /^\+\d+$/,
        msg: "security.validation.phone"
    },
    isEqualPassword: {
        msg: "security.validation.confirmPassword"
    }
};

const state = {
    status: true,
    msg: ""
};

/**
 * validator use for form validation
 * @example
 *
 * @param {array|string} rules
 * @param {array|string} value
 * @returns Component
 */
export function validator(rules, value, columns = [], item, finalResult) {
    let flag = true,
        error = state;
    if (finalResult) {
        if (
            (!rules || (!value && (typeof rules === "string" ? rules !== "required" : rules.indexOf("required")))) &&
            item &&
            item.name !== "confirmpassword"
        )
            return state;
    } else if (!item || !item.name) {
        return;
    } else {
        if (!rules || !value) return state;
    }

    value = Array.isArray(value) ? value : typeof value !== "string" ? String(value).trim() : value;
    if (!Array.isArray(rules) && item.name && item.name !== "confirmpassword" && item.name !== "oldpassword") {
        let stringValidate = validate[rules].reg.test(value);
        if (rules === "required" && Array.isArray(value)) {
            if (!value.length) {
                flag = false;
                error = {
                    status: false,
                    msg: validate[rules].msg
                };
            }
        } else if (!stringValidate) {
            flag = false;
            error = {
                status: false,
                msg: validate[rules].msg
            };
        }
    } else if (item.name && item.name !== "confirmpassword" && item.name !== "oldpassword") {
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (typeof rule === "string") {
                let stringValidate2 = validate[rule].reg.test(value);
                if (rule === "required" && Array.isArray(value)) {
                    if (!value.length) {
                        flag = false;
                        error = {
                            status: false,
                            msg: validate[rule].msg
                        };
                    }
                } else if (!stringValidate2) {
                    flag = false;
                    error = {
                        status: false,
                        msg: validate[rule].msg
                    };
                }
            } else {
                let objValidate = rule.reg.test(value);
                if (!objValidate) {
                    flag = false;
                    error = {
                        status: false,
                        msg: rule.msg
                    };
                }
            }
        }
    }

    // if validator pass
    if (flag) {
        // validator password
        if (
            (rules === "password" || ~rules.indexOf("password")) &&
            Array.isArray(columns) &&
            item &&
            item.name &&
            item.name === "confirmpassword"
        ) {
            let confirmpassword = columns.find(n => n.name === "confirmpassword");
            let password = columns.find(n => n.name === "password");
            if ((confirmpassword && password && value !== password.value) || !value || !password.value) {
                return {
                    status: false,
                    msg: validate.isEqualPassword.msg
                };
            }
        }
        return state;
    } else {
        return error;
    }
}

/**
 * reportError use for report validation result true(pass) false{reject}
 * @example
 *
 * @param {boolean} validate
 * @param {array} field
 * @param {array} formData
 * @returns Component
 */
export function reportError(validate, field, formData) {
    if (!validate) return true;
    let root = field.filter(item => {
        return item.rules;
    });
    for (let i = 0; i < root.length; i++) {
        let item = root[i];
        let error = validate ? validator(item.rules, formData[item.name], root, item, true) : { status: true, msg: "" };
        if (!error.status) return false;
    }
    return true;
}
