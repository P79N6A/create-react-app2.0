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

/**
 * @fileOverview Here need the description for this file
 * @module Const
 * @author HeZIGANG
 * @example
 * // How to use the consts defined here
 * import {TOKEN_KEY} from 'constants/const';
 * if(TOKEN_KEY){
 *    //...
 * }
 * // same as below
 * import * as consts from  'constants/const';
 * if(consts.TOKEN_KEY){
 *    //...
 * }
 */
/**
 * The default message bus heartbeat interval.
 * Default value is 30 seconds
 */
export const MSG_BUS_HEARTBEAT_INTERVAL = 30000;

/**
 * The default token key for each rest api and websocket.
 * Default value is 'ISC-Auth-Token'
 */
export const TOKEN_KEY = "ISC-Auth-Token";

/**
 * The default key for user info.
 * Default value is 'ISC-CURRENT-USER'
 */
export const USER_KEY = "ISC-CURRENT-USER";

/**
 * The default key for url config.
 * Default value is 'ISC-URL'
 */
export const URL_KEY = "ISC-URL";

/**
 * The default key for all the settings.
 * Default value is 'ISC-SETTINGS'
 */
export const SETTINGS_KEY = "ISC-SETTINGS";

/**
 * The default key for all the language.
 * Default value is 'ISC-LANGUAGE'
 */
export const LANGUAGE_KEY = "ISC-LANGUAGE";

/**
 * The default path for url.json.
 * Default value is './static/config/url.json'
 */
export const URL_CONFIG_PATH = "./static/config/url.json";

/**
 * The default key for all the language.
 * Default value is 'WEATHER_API_CONF_KEY'
 */
export const WEATHER_API_CONF_KEY = "WEATHER_API_CONFIG";

/**
 * The default path for url.json.
 * Default value is './static/config/weatherApiConf.json'
 */
export const WEATHER_API_CONF_PATH = "./static/config/weatherApiConf.json";

/**
 * The default path for settings.json.
 * Default value is './static/config/settings.json'
 */
export const SETTINGS_CONFIG_PATH = "./static/config/settings.json";

/**
 * The default path for language.
 * Default value is './static/lang/{0}.json'
 */
export const LANG_CONFIG_PATH = "./static/lang/{0}.json";

/**
 * default setting for login page.
 */
export const LOGIN_CONFIG_PATH = "./static/config/login.json";
export const LOGIN_CONFIG_KEY = "LOGIN_CONFIG_KEY";
/**
 * The widgets collection
 */
export const WIDGETS_COLLECTION_PATH = "./static/config/widgetsCollection.json";
/**
 * Path of chart Theme
 */
export const CHART_THEME_PATH = "./static/config/chartTheme.json";
export const CHART_THEME_KEY = "CHART_THEME_KEY";
/**
 * The storageFacility page config
 */
export const DASHBOARD_PAGE_CONFIG = "./static/pages/storageFacility.json";

// PRIVATE/PUBLIC PAGES/GROUP
export const PRIVATE = "2002";
export const PUBLIC = "2001";

// THIS  RESOURCE ID: dashboardTemplate
export const DASHBOARD_TEMPLATE = "dashboardTemplate";
/**
 * session key for application info
 */
export const APPLICATION_INFO_KEY = "ISC-APPLICATION-INFO";

export const ISC_ACCOUNT_INFO = "ISC-GROUP";


export const MATERIAL_KEYS = "./static/materialKey/materialKey.json";
