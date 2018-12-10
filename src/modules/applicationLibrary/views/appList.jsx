/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by LWP on 16/10/2018.
 */

import React from "react";
import { Empty } from "./libraryStatics";
import { GridList, GridListTile, Grow } from "@material-ui/core";
import Cardex from "../components/CardEx";

const AppList = ({ cardActions, onCardActions, datas, classes, load }) => {
    return (
        <div className={classes.listContent}>
            <GridList
                cols={5}
                spacing={8}
                cellHeight="auto"
                style={{
                    overflow: "hidden",
                    padding: 8
                }}
            >
                {datas &&
                    datas.map((apps, i) => {
                        return (
                            apps &&
                            apps.map((app, i) => {
                                return (
                                    <Grow key={app["address.iotTopologyId"]} in={true} timeout={i * 300}>
                                        <GridListTile
                                            classes={{
                                                tile: classes.gridListTileTile
                                            }}
                                        >
                                            <Cardex
                                                onActions={onCardActions}
                                                app={app}
                                                title={app["address.name"]}
                                                subTitle={app["address.displayName"]}
                                                id={app["address.iotTopologyId"]}
                                                actions={cardActions}
                                                media={app["address.imagePathId"]}
                                            />
                                        </GridListTile>
                                    </Grow>
                                );
                            })
                        );
                    })}
                <Empty open={!datas.length && !load} classes={classes} />
            </GridList>
        </div>
    );
};

export default AppList;
