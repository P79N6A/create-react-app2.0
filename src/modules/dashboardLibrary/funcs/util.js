export const splitString = str => {
    let rootStr = "";
    str = String(str)
        .split("")
        .reverse();
    str.forEach((element, index) => {
        rootStr += element;
        if (index % 3 === 2 && index !== 0 && str.length - 1 !== index) {
            rootStr += ",";
        }
    });
    return rootStr.split("").reverse();
};

export const formatter = (str, ...data) => {
    let arr = str.match(/{\d+}/g);
    let newStr = str;
    arr &&
        arr.forEach(item => {
            let num = item.replace("{", "").replace("}", "");
            if (data[num]) {
                newStr = newStr.replace(item, data[num]);
            }
        });
    return newStr;
};

export function fomaterUrl(obj) {
    let url = [];
    for (let key in obj) {
        url.push(key + "=" + obj[key]);
    }
    return url.join("&");
}
