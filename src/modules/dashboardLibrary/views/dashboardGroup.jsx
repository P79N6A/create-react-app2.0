/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */

/**
 * @fileOverview Here need the description for this file
 * @module DASHBOARDGROUP
 * @author LUOJIA
 * @exports {
 *  AddDashboardGroup
 * }
 */
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import { withStyles } from "@material-ui/core/styles";
import { Icon, FormControl, InputAdornment, IconButton } from "@material-ui/core";
import { Input } from "../../common/index";
import { I18n } from "react-i18nify";
// import { theme } from "modules/theme";
import { connect } from "react-redux";
// import { formatter } from "../funcs/util";
import { updateGroup, getGroupList, deleteGroup, filterGroup, editGroup } from "../funcs/actions";
import { REDUCER_NAME as topoReducer, sortGroup } from "../funcs/constants";
import GroupTable from "./component/groupTable";
import GroupStep from "./component/groupStep";
import classnames from "classnames";

const styles = Theme => ({
    root: {
        width: "100%",
        overflowX: "auto"
    },
    button: {
        marginLeft: Theme.spacing.unit * 4 + "px"
    },
    selectIcon: {
        color: Theme.palette.text.secondary
    },
    tdCenter: {
        textAlign: "center"
    },
    switchRoot: {
        margin: "0px"
    },
    tdRoot: {
        minWidth: "200px"
    },
    formRoot: {
        width: "100%"
    },
    paperRoot: {
        padding: "10px"
    },
    tableCellRoot: {
        width: "300px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
    tableCellRootLast: {
        width: "300px",
        whiteSpace: "nowrap",
        paddingRight: "12px!important"
    },
    tableFirstCellRoot: {
        width: "200px",
        minWidth: "200px",
        maxWidth: "200px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
    tableFooter: {
        textAlign: "right",
        display: "flex",
        "& div": {
            marginLeft: "auto",
            borderBottom: "none"
        }
    },
    textField: {
        width: "200px",
        verticalAlign: "middle"
    },
    table: {
        height: "350px",
        overflowY: "auto"
    },
    tableWrapper: {
        overflowX: "hidden",
        height: "350px",
        width: "700px"
    },
    numeric: {
        // flexDirection: "row-reverse",
        paddingRight: "0px"
    },
    svgBlock: {
        display: "block"
    },
    svgNone: {
        display: "none"
    },
    buttonLayout: {
        // "& button": {
        //     width: "32px",
        //     height: "32px"
        // },
        // "& button:last-child": {
        //     marginLeft: "25px"
        // }
    },
    underline: {
        "&:before": {
            borderBottom: "1px solid " + Theme.palette.text.primary
        },
        "& input": {
            borderBottom: "none"
        }
    },
    margin: {
        marginRight: Theme.spacing.unit * 2
    }
});

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const Search = ({ classes, handleChange, keydownHandle, search, searchHandle }) => {
    return (
        <FormControl className={classnames(classes.margin, classes.textField)}>
            <Input
                id="adornment-search"
                value={search}
                onChange={handleChange}
                onKeyDown={keydownHandle}
                className={classes.underline}
                name="search"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            // style={{ height: "32px", width: "32px" }}
                            onClick={searchHandle}
                            // onMouseDown={this.handleMouseDownPassword}
                        >
                            <Icon>search</Icon>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

class AddDashboardGroup extends React.Component {
    static defaultProps = {
        mode: "",
        open: false
    };

    state = {
        title: I18n.t("modal.groupManage.title"),
        subTitle: I18n.t("modal.groupManage.subTitle"),
        open: false,
        name: I18n.t("modal.groupManage.name"),
        rowsPerPage: 5,
        page: 0,
        groupData: [],
        sort: [],
        subOpen: false,
        status: false,
        anchorEl: null,
        littleOpen: false,
        order: "asc",
        orderBy: "id",
        selected: [],
        search: "",
        mode: "",
        clickData: {},
        editMode: false,
        childrenData: {}
    };

    handleClick = (e, id) => {};

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    componentDidMount() {
        const { app } = this.props;
        const applicationId = app && app["address.iotTopologyId"];
        this.props.getGroupList({ applicationId });
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return false;
        }
        this.setState({
            open: nextProps.open,
            editMode: false,
            mode: "",
            groupData: nextProps.groupData
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(nextState, this.state)) {
            return false;
        } else {
            return true;
        }
    }

    cancle = () => {
        this.props.closeModalDialog("groupOpen");
    };

    deleteHandle = seqId => () => {
        // this.props.deleteGroup(seqId);
        this.setState({
            mode: "delete",
            clickData: this.filterData(seqId),
            editMode: true
        });
    };

    editHandle = (id, seqId) => () => {
        this.setState({
            mode: "edit",
            editMode: true,
            clickData: this.filterData(seqId)
        });
    };

    filterData = clickSeqId => {
        return (
            this.props.groupData.find(item => {
                return item.seqId === clickSeqId;
            }) || {}
        );
    };

    searchHandle = event => {
        this.filterGroup();
    };
    keydownHandle = event => {
        if (event.keyCode === 13) {
            this.filterGroup();
        }
    };
    filterGroup = () => {
        const { search } = this.state;
        this.props.filterGroup(search);
    };

    getIcons = () => {
        return [
            {
                visible: !this.state.mode,
                content: () => {
                    return (
                        <Search
                            key={"search"}
                            classes={this.props.classes}
                            handleChange={this.handleChange}
                            search={this.state.search}
                            keydownHandle={this.keydownHandle}
                            searchHandle={this.searchHandle}
                        />
                    );
                },
                "material-key": null
            },
            {
                name: "add",
                visible: !this.state.mode,
                func: () => {
                    this.setState({
                        mode: "add",
                        editMode: true,
                        clickData: this.filterData("")
                    });
                },
                "material-key": null
            }
        ];
    };

    search = () => {
        const { sort } = this.state;
        let searchData = sortGroup
            .filter(item => {
                return ~sort.indexOf(item.value);
            })
            .map(item => {
                const { value, ...data } = item;
                return data;
            });
        let postData = {
            sortOrders: searchData
        };
        this.props.getGroupList(postData);
    };

    radioChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChange = event => {
        this.setState({ search: event.target.value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";
        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }
        this.setState({ order, orderBy });
    };

    createSortHandler = property => event => {
        this.handleRequestSort(event, property);
    };

    andleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    goBack = () => {
        this.setState({
            mode: "",
            clickSeqId: "",
            editMode: false
        });
    };

    submit = () => {
        const { checked, id, desc, modes } = this.state.childrenData;
        const { clickData } = this.state;
        const { app } = this.props;
        if (modes === "add") {
            let privacyCode = checked ? "2002" : "2001";
            this.props.updateGroup(id, [], privacyCode, desc, app && app["address.iotTopologyId"]);
        } else if (modes === "edit") {
            this.props.editGroup(clickData.seqId, id, clickData.page, desc, this.props.searchData);
        } else {
            this.props.deleteGroup(clickData.seqId, this.props.searchData, app && app["address.iotTopologyId"]);
        }
        this.goBack();
    };

    getEditModeData = state => {
        this.setState({
            childrenData: state
        });
    };

    render() {
        const { classes } = this.props;
        const {
            title,
            subTitle,
            open,
            rowsPerPage,
            page,
            groupData,
            status,
            order,
            orderBy,
            selected,
            editMode,
            mode,
            clickData
        } = this.state;
        let start = page * rowsPerPage + 1;
        let end = (page + 1) * rowsPerPage;
        let rootData = groupData.sort(getSorting(order, orderBy)).slice(start - 1, end);
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, groupData.length - page * rowsPerPage);
        return (
            // <MuiThemeProvider theme={theme}>
            <Dialog
                title={title}
                cancle={this.cancle}
                submit={this.submit}
                open={open}
                subTitle={subTitle}
                icons={this.getIcons()}
                submitText={mode !== "delete" ? "SAVE" : "DELETE"}
                minWidth="700px"
                isFooter={!mode}
                noPadding
            >
                {editMode ? (
                    <GroupStep
                        getEditModeData={this.getEditModeData}
                        clickData={clickData}
                        mode={mode}
                        goBack={this.goBack}
                    />
                ) : (
                    <GroupTable
                        classes={classes}
                        selected={selected}
                        order={order}
                        orderBy={orderBy}
                        groupData={groupData}
                        status={status}
                        rootData={rootData}
                        emptyRows={emptyRows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        createSortHandler={this.createSortHandler}
                        handleRequestSort={this.handleRequestSort}
                        radioChange={this.radioChange}
                        handleClick={this.handleClick}
                        deleteHandle={this.deleteHandle}
                        editHandle={this.editHandle}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        handleChangePage={this.handleChangePage}
                    />
                )}
            </Dialog>
            // </MuiThemeProvider>
        );
    }
}

AddDashboardGroup.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        groupData: state[topoReducer] && state[topoReducer].cloneGroupData,
        searchData: state[topoReducer] && state[topoReducer].searchData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateGroup: (groupId, pages, status, desc, app) => {
            dispatch(updateGroup(groupId, pages, status, desc, app));
        },
        getGroupList: searchData => {
            dispatch(getGroupList(searchData));
        },
        deleteGroup: (seqId, searchData, appid) => {
            dispatch(deleteGroup(seqId, searchData, appid));
        },
        filterGroup: search => {
            dispatch(filterGroup(search));
        },
        editGroup: (seqId, id, page, desc, searchData) => {
            dispatch(editGroup(seqId, id, page, desc, searchData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddDashboardGroup));
