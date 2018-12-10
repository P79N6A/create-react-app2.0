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

import {
    SETTINGS_CONFIG_PATH,
    SETTINGS_KEY,
    WEATHER_API_CONF_KEY,
    WEATHER_API_CONF_PATH,
    CHART_THEME_KEY,
    CHART_THEME_PATH,
    MATERIAL_KEYS
} from "../constants/const";
import Fetch from "./fetch";

const getSettings = async () => {
    var data = sessionStorage.getItem(SETTINGS_KEY);
    if (data) {
        return new Promise(function(resolve, reject) {
            resolve(JSON.parse(data));
        });
    }
    const urls = await Fetch.get(SETTINGS_CONFIG_PATH);
    sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(urls));
    return urls;
};

const getLocalSetting = async () => {
    var data = localStorage.getItem(SETTINGS_KEY);
    const urls = await Fetch.get(SETTINGS_CONFIG_PATH);
    if (data && JSON.stringify(data) === JSON.stringify(urls)) {
        return new Promise(function(resolve, reject) {
            resolve(JSON.parse(data));
        });
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(urls));
    return urls;
};

const getWeatherApiConf = async () => {
    var weatherApiCongData = localStorage.getItem(WEATHER_API_CONF_KEY);

    if (weatherApiCongData) {
        return new Promise(function(resolve, reject) {
            resolve(JSON.parse(weatherApiCongData));
        });
    }

    const urls = await Fetch.get(WEATHER_API_CONF_PATH);
    localStorage.setItem(WEATHER_API_CONF_KEY, JSON.stringify(urls));

    return urls;
};

const getChartThemeConfig = async () => {
    var chartThemedata = sessionStorage.getItem(CHART_THEME_KEY);

    if (chartThemedata) {
        return new Promise(function(resolve, reject) {
            resolve(JSON.parse(chartThemedata));
        });
    }

    const urls = await Fetch.get(CHART_THEME_PATH);
    sessionStorage.setItem(CHART_THEME_KEY, JSON.stringify(urls));

    return urls;
};

const getMaterialKey = async () => {
    const mks = await Fetch.get(MATERIAL_KEYS);
    return mks;
};

export { getSettings, getLocalSetting, getWeatherApiConf, getChartThemeConfig, getMaterialKey };
