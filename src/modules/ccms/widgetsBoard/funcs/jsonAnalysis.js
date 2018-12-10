import _ from "lodash";
import { IscTextfiled, IscNumberInput /*IscMultiDropdown, IscSingleDropdown*/ } from "../views/visualComponents";

const mappings = {
    string: IscTextfiled,
    number: IscNumberInput
    // array: IscMultiDropdown
};

let tempWrapDatas = null;

export const jsonAnalysis = json => {
    if (!json) {
        return false;
    }
    let newJson = _.map(json, (v, k) => {
        return {
            key: k,
            value: v,
            type: _.lowerCase(outputType(v))
        };
    });
    return newJson;
};

export const outputType = v => {
    let type = Object.prototype.toString.call(v);
    return type.slice(8).replace(/\]$/g, "");
};

export const mappingEle = analysisJson => {
    tempWrapDatas =
        analysisJson &&
        _.map(analysisJson, (v, k) => {
            return Object.assign({}, v, {
                reactEle: mappings[v.type]
            });
        });
    return tempWrapDatas;
};

export const replacebyKey = (key, replacing) => {
    tempWrapDatas =
        tempWrapDatas &&
        _.map(tempWrapDatas, (item, index) => {
            return item.key === key ? replacing : item;
        });
    return tempWrapDatas;
};

export const recoverDatas = () => {
    let orignDatas = {};
    tempWrapDatas &&
        tempWrapDatas.forEach(element => {
            orignDatas[element.key] = element.value;
        });
    return orignDatas;
};
