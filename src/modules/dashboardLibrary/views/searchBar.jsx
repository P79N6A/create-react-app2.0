/*
 * @Author: wplei
 * @Date: 2018-11-14 18:39:43
 * @Last Modified by: wplei
 * @Last Modified time: 2018-12-04 13:39:50
 */

import { withStyles } from "@material-ui/core/styles";
import React from "react";
import SearchBarRight from "./searchBarRight";
import { CountPanel } from "./statics";
import { Grow } from "@material-ui/core";

const defaultProps = {
    counts: {
        devices: { count: 0 },
        alarms: { count: 0 },
        dashboards: { count: 0 }
    }
};
const propTypes = {};

const styles = Theme => {};

class View extends React.Component {
    render = () => {
        const { optionCounts, conditions, app, searchInterval, defaultOrder, counts } = this.props;
        return (
            <section
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div
                    style={{
                        display: "flex"
                    }}
                >
                    {optionCounts.map((item, i) => {
                        return (
                            <Grow key={item.id} timeout={i * 400}>
                                <CountPanel countItem={item} count={counts[item.id].count} />
                            </Grow>
                        );
                    })}
                </div>
                <SearchBarRight
                    defaultOrder={defaultOrder}
                    searchInterval={searchInterval}
                    conditions={conditions}
                    app={app}
                />
            </section>
        );
    };
}

View.defaultProps = defaultProps;
View.propTypes = propTypes;

export default withStyles(styles)(View);
