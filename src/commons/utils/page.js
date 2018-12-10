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
 * Created by LWP on 25/05/2018.
 */
import getGuid from "commons/utils/guid";

const page = new Page();

export default page;

function Page() {
    this.page = {};
    this.cache = [];
}

// TODO: remove all cahce
Page.prototype.removeFromCache = function(uri) {
    delete this.cache[uri];
};

// TODO: get cache by id
Page.prototype.getFromCache = function(uri, id) {
    return this.cache[id];
};

// TODO: import react-component
Page.prototype.loader = async function(uri, id) {
    let element = this.getFromCache(uri);
    if (element) return Object.assign({}, element, { id });
    try {
        element = await import(`../../modules${uri}/index.js`);
        this.cache[uri] = element;
    } catch (error) {
        console.log(error);
    }
    return Object.assign({}, element, { id });
};

// TODO: compile config
Page.prototype.run = async function(config) {
    let cBuffer = [];
    const { title } = config;
    this.page = config;
    const modules = this.getModules(config.modules || []);
    document.title = title || "IntelliSURT IoT";
    for (let item of modules) {
        cBuffer.push(await this.getComps(item));
    }

    return cBuffer;
};

// TODO: get module in page
Page.prototype.getModules = function(modules) {
    return (
        modules &&
        modules.map(mod => {
            const { identify, uri, props, properties, ...rest } = mod;
            // document.title = identify;
            return {
                uri,
                props: props || properties,
                ...rest
            };
        })
    );
};

// TODO:  get comp by uri
Page.prototype.getComps = async function({ uri, props, id, ...rest }) {
    if (!id) id = getGuid();
    const element = await this.loader(uri, id);
    const { view: V = null, ...cRest } = element;
    return { V, props, ...rest, ...cRest };
};
