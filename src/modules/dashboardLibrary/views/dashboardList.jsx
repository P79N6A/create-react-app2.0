/*
 * @Author: wplei
 * @Date: 2018-11-15 19:31:51
 * @Last Modified by: wplei
 * @Last Modified time: 2018-12-07 18:31:09
 */

import { GridList, GridListTile, Grow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import Cardex from "modules/applicationLibrary/components/CardEx";
import { actions as CCMSEX } from "modules/ccmsEx";
import { actions as MODALS } from "modules/ccmsModal";
import PropTypes from "prop-types";
import React from "react";
import * as actions from "../funcs/actions";
// import { DASHBOARD_BLACK_LIST } from "../funcs/constants";

const defaultProps = {
    dashboards: [],
    cardActions: []
};
const propTypes = {
    dashboards: PropTypes.array,
    cardActions: PropTypes.array
};

const styles = Theme => {
    return {
        gridListRoot: {
            // paddingTop: Theme.spacing.unit
            overflow: "hidden",
            padding: 8
        },
        gridListTileTile: {
            overflow: "initial"
        }
    };
};

class DashboardList extends React.Component {
    componentDidMount = () => {
        const { app } = this.props;
        const appId = app && app["address.iotTopologyId"];
        const appPath = app && app["address.resourcePath"];
        store.dispatch(actions.requestCounts(appId, appPath.replace("/", "")));
    };
    handleClick = (id, options) => {
        console.log(id, options);
        const { app } = this.props;
        const appid = app && app["address.iotTopologyId"];
        const { cardId, title, id: pageId, priority } = options;
        switch (id) {
            case "like":
                store.dispatch(actions.updatePriority(cardId, priority, appid));
                break;
            case "enter":
                store.dispatch(
                    CCMSEX.requestPage(pageId, {
                        editMode: false
                    })
                );
                // window.location.hash = "/ccms?page=" + pageId;
                break;
            case "move":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "move",
                        args: {
                            title: `Move "${title}" To`,
                            pageId: cardId
                        }
                    })
                );
                break;
            case "duplicate":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "duplicate",
                        title: "Duplicate",
                        args: {
                            title: `Duplicate "${title}"`,
                            pageId: cardId
                        }
                    })
                );
                break;
            default:
                break;
        }
    };
    render = () => {
        const { dashboards, cardActions, actionButtons, classes } = this.props;
        return (
            <React.Fragment>
                <GridList
                    classes={{
                        root: classes.gridListRoot
                    }}
                    cols={5}
                    cellHeight="auto"
                    spacing={8}
                >
                    {dashboards.map((part, i) => {
                        return (
                            part &&
                            part.map((da, j) => {
                                if (!da.groups) da.groups = [];
                                return (
                                    <Grow key={da.pageId} in={true} timeout={j * 400}>
                                        <GridListTile
                                            classes={{
                                                tile: classes.gridListTileTile
                                            }}
                                        >
                                            <Cardex
                                                state={0}
                                                id={da.pageId}
                                                title={da.name}
                                                subTitle={da.desc} //da.groups
                                                subTitle2={da.groups && da.groups.join(", ")}
                                                actions={cardActions}
                                                priority={da.priority}
                                                media={da.thumbnail || ""}
                                                onActions={this.handleClick}
                                            />
                                        </GridListTile>
                                    </Grow>
                                );
                            })
                        );
                    })}
                </GridList>
            </React.Fragment>
        );
    };
}

DashboardList.defaultProps = defaultProps;
DashboardList.propTypes = propTypes;

export default withStyles(styles)(DashboardList);
