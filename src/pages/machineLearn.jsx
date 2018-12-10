import React, { Component } from "react";
import { view as MachineLearn } from "modules/machineLearn";
import configs from "./config/jobs.json";

const event = configs.modules[0];
const { props } = event;

export default class Machine extends Component {
    render() {
        return <MachineLearn {...props} />;
    }
}
