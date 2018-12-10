import React from "react";
import {
    view as RuleGrid
} from "modules/rule";
import configs from "./config/rule.json";
import Wrap from "commons/components/wrapComponent";

function Rule() {
    let rule = configs.modules[0];
    const { props } = rule;
    return <Wrap><RuleGrid {...props} /></Wrap>;
}

export default Rule;
