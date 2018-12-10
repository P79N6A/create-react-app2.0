export function fomartSchema(obj, data) {
    for (let key in obj) {
        if (key !== "path") {
            if (typeof obj[key] !== "object") {
                data.push({
                    header: key,
                    type: typeof obj[key],
                    defaultValue: obj[key],
                    path: obj.path ? obj.path + "/" + key : key
                });
            } else if (Array.isArray(obj[key])) {
                data.push({
                    header: key,
                    type: "array",
                    defaultValue: obj[key]
                        .filter(item => {
                            return item.defaultSelect;
                        })
                        .map(item => {
                            return item.columnName;
                        }),
                    path: obj.path ? obj.path + "/" + key : key,
                    source: obj[key].map(item => {
                        return item.columnName;
                    })
                });
            } else {
                obj[key].path = (obj.path ? obj.path + "/" : "") + (obj[key].path ? obj[key].path + "/" + key : key);
                fomartSchema(obj[key], data);
            }
        }
    }
}

export const checkBrowser = () => {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Trident") > -1) {
        return "IE";
    } else if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    } else {
        return "Other";
    }
};
