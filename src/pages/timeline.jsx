import React from "react";
import {
    view as TimelineContent,
} from "modules/timeline";
import configs from "./config/timeline.json";
import Wrap from "commons/components/wrapComponent";
function Timeline() {
    let first = configs[0];
    const { config } = first;
    return <Wrap><TimelineContent {...config} /></Wrap>;
}

export default Timeline;
