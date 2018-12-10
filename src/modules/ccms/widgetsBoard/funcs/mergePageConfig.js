// import _ from "lodash";

export const mergeConfig = (pageConfig, substitutes, replacing) => {
    let { configValue } = pageConfig;
    let { widgets } = configValue;
    if (!widgets) {
        widgets = [];
    }
    widgets.push(substitutes);
    pageConfig.configValue.widgets = widgets;
    return pageConfig;
};

export const mergeBase64image = (pageConfig, base64) => {
    let { configValue } = pageConfig;
    let { thumbnail } = configValue;
    if (!thumbnail) {
        thumbnail = "";
    }
    thumbnail = base64;
    pageConfig.configValue.thumbnail = thumbnail;
    return pageConfig;
};

export const removeWidgetById = (pageConfig, id) => {
    let { configValue } = pageConfig;
    let { widgets } = configValue;
    const newWidgets = widgets.filter((item, index) => {
        return item.id !== id;
    });

    return Object.assign(pageConfig, {
        configValue: {
            ...pageConfig.configValue,
            widgets: newWidgets
        }
    });
};

export const findWidgetById = (pageConfig, id) => {
    let { configValue } = pageConfig;
    let { widgets } = configValue;
    const widget = widgets.filter((item, index) => {
        return item.id === id;
    });
    return widget;
};

export const replaceWidgetById = (pageConfig, id, replacing) => {
    let replaceFlag = false;
    let { configValue } = pageConfig;
    let { widgets } = configValue;
    widgets.forEach((element, index) => {
        if (element.id === id) {
            widgets[index] = replacing;
            replaceFlag = true;
        }
    });
    !replaceFlag && widgets.push(replacing);
    return pageConfig;
};

export const renderLayout = widgets => {
    let bigY = null;
    widgets &&
        widgets.forEach((i, j) => {
            let tv = i.layout.y || i.layout.h;
            bigY = tv > bigY ? tv : bigY;
        });
    return {
        x: 0,
        y: bigY + 2 || 0,
        w: 8,
        h: 7
    };
};
