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
