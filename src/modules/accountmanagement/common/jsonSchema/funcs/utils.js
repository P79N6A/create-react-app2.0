import moment from "moment";
export function fomartSchema(state, schema) {
    let schemaArr = [];
    for (let key in schema) {
        let obj = Object.assign({}, schema[key], { name: key });
        if (state.hasOwnProperty(key)) {
            obj.value = state[key];
        }
        schemaArr.push(obj);
    }
    return schemaArr;
}

export function getDate() {
    return moment().format("YYYY-MM-DD");
}

export function validation(initState, schema) {
    let flag = true;
    for (let key in schema) {
        if (initState.hasOwnProperty(key) && schema[key].hasOwnProperty("valueregex") && schema[key]["valueregex"]) {
            let reg = new RegExp(schema[key]["valueregex"]);
            if (!reg.test(initState[key]) && schema[key].mandatory) {
                flag = false;
                break;
            } else if (!reg.test(initState[key]) && initState[key]) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}
