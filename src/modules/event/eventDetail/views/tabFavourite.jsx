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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class TabFavourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultArr: [
                { key: "note", value: "Note" },
                { key: "sentdatetime", value: "Send Time" },
                { key: "eventtype", value: "Event Type" },
                { key: "source", value: "Source" }
            ]
        };
    }

    render() {
        const { ojbData, dateStyle } = this.props;
        return (
            <div className="favourite">
                {Object.keys(ojbData).length === 0 ? (
                    <div className="progressBox">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    this.state.defaultArr.map((item, index) => {
                        let name = item.key;
                        return (
                            <ListItem button key={index}>
                                <ListItemText
                                    className="listItemText"
                                    title={
                                        name === "sentdatetime"
                                            ? moment(ojbData[name]).format(dateStyle)
                                            : ojbData[name]
                                                ? ojbData[name]
                                                : ""
                                    }
                                    primary={
                                        name === "sentdatetime"
                                            ? moment(ojbData[name]).format(dateStyle)
                                            : ojbData[name]
                                                ? ojbData[name]
                                                : ""
                                    }
                                    secondary={item.value}
                                />
                            </ListItem>
                        );
                    })
                )}
            </div>
        );
    }
}

export default TabFavourite;
