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
 * Created by wplei on 25/05/18.
 */

import React from "react";
import BoardHeader from "./boardHeader";
import $ from "jquery";
import { FloatActionButton, GridEx as WidgetGridView, WidgetContainer, Loading } from "../../components";
import * as actions from "../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import WidgetDrawer from "./widgetDrawer";
import TemplateModal from "./modals/saveTemplateModal";
import DeleteModal from "./modals/deleteDialog";
import EditDashboard from "./modals/editDashboard";
import RenameDashboard from "./modals/renameDashboard";
import ExportCSV from "./modals/export";
import ExitReminder from "./modals/exitReminder";
import _ from "lodash";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import { REDUCER_NAME as mapReducerName } from "modules/map/funcs/constants";
import { withRouter } from "react-router-dom";
import { removeWidgetById, findWidgetById } from "../funcs/mergePageConfig";
import { removeBuffer, loader } from "../funcs/componentLoader";
import { I18n } from "react-i18nify";
import queryString from "commons/utils/queryStringHelper";
import { message } from "antd";
import SecurityModal from "../views/modals/applicationAssociateDialog";
import store from "commons/store";
import { checkUserModify } from "api/dashboardLibrary";
import { actions as msg } from "modules/messageCenter";
import { reducerName as themeReducer } from "modules/theme";

const styles = Theme => {
    return {
        ccms_widgets_board: {
            // position: "absolute",
            height: "100%",
            width: "100%",
            top: 0
        },
        board_body: {
            width: "100%",
            background: Theme.palette.primary.main,
            // 10 cell space
            height: "calc(100% - " + Theme.spacing.unit * 8 + "px)",
            overflow: "auto"
            // position: "relative"
        },
        loading_container: {
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            background: "rgba(0,0,0,.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    };
};
class WidgetsBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doms: [],
            editMode: false,
            // modal control
            saveAsTemp: false,
            exitBoard: false,
            exportCSV: false,
            // modal control
            pageName: "",
            pageKey: "",
            pageConfig: {
                configValue: {
                    title: "",
                    group: "",
                    widgets: []
                }
            },
            widgetConfig: null,
            isMounted: false,
            firstLoad: true,
            pageRequestError: false,
            drawerTitle: I18n.t("ccms.addWidgetModalTitle"),
            draggableCancel: "#widget_container_content",
            modalOpen: false,
            fullViewComponent: null,
            fullViewComponentProps: {}
        };
    }
    static propTypes = {};
    static defaultProps = {
        top: 8 * 14,
        right: 8,
        deleteBoard: false
    };
    componentDidMount = () => {
        this.applicationInfo = sessionStorage.getItem("ISC-APPLICATION-INFO");
        const queries = queryString(),
            pageConfig = {
                configValue: {
                    title: "",
                    group: "",
                    widgets: []
                }
            },
            { page, pageKey, editMode } = queries;
        this.setState(
            {
                isMounted: true,
                pageKey: pageKey,
                pageName: decodeURI(page),
                editMode: !!editMode,
                pageRequestError: false
            },
            () => {
                this.props.requestConfigByApi(pageKey, page);
                this.props.clearPageConfig(pageConfig);
                // this.props.getPermissionList();
                this.props.widgetBoardEdit(!!editMode);
                this.props.requestAllDefaultComp();
            }
        );
    };

    handleWidgetsUpdate = (configs, id, MuiTheme) => {
        if (!MuiTheme) {
            MuiTheme = this.props.MuiTheme;
        }
        if (configs) {
            this.setState({
                pageName: configs.configValue.title,
                pageKey: configs.pageKey
            });
            Promise.all(loader(configs.configValue))
                .then(widgets => {
                    return _.map(widgets, widget => {
                        widget &&
                            widget.reactEle &&
                            widget.reactEle.ccmsAction &&
                            this.props.excuteActionFromWidget(widget.reactEle.ccmsAction, widget.properties, widget.id);
                        return (
                            <div data-grid={widget.layout} key={widget.id} id={widget.id}>
                                <WidgetContainer
                                    title={widget.title}
                                    widgetId={widget.id}
                                    onWidgetDelete={this.handleWidgetDelete}
                                    onWidgetEdit={this.handleWidgetEdit}
                                    onWidgetFullView={this.handleWidgetFullScreen}
                                >
                                    {id !== widget.id ? (
                                        <widget.reactEle.view
                                            key={widget.id}
                                            MuiTheme={MuiTheme}
                                            identify={widget.id}
                                            onFullScreen={this.handleWidgetFullScreen}
                                            currentApplicationInfo={
                                                (this.applicationInfo && JSON.parse(this.applicationInfo)) || null
                                            }
                                            {...JSON.parse(JSON.stringify(widget.properties))}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                    )}
                                </WidgetContainer>
                            </div>
                        );
                    });
                })
                .then(views => {
                    this.setState(
                        {
                            doms: views,
                            widgetConfig: null
                        },
                        () => {
                            const { firstLoad, editMode } = this.state;
                            const nodeList = document.querySelectorAll(".react-resizable-handle");
                            if (firstLoad && editMode) {
                                Array.from(nodeList).forEach(node => {
                                    node.style.pointerEvents = "all";
                                    node.style.opacity = 1;
                                });
                            } else if (firstLoad && !editMode) {
                                Array.from(nodeList).forEach(node => {
                                    node.style.pointerEvents = "none";
                                    node.style.opacity = 0;
                                });
                            }
                        }
                    );
                });
        }
    };
    componentWillUnmount = () => {
        try {
            this.props.revertLoadingState();
            this.setState({
                isMounted: false
            });
        } catch (error) {
            console.log(error);
        }
    };
    componentWillReceiveProps = nextProps => {
        const { isMounted } = this.state;
        const { pageConfig, pageRequestError, errorMessage, MuiTheme } = nextProps;
        if (isMounted && pageRequestError && errorMessage) {
            message.error(errorMessage.message);
        }
        this.handleWidgetsUpdate(pageConfig, this.editId || "", MuiTheme);
        this.setState({
            pageConfig,
            errorMessage,
            pageRequestError
        });
    };
    handleMenuIconClick = item => {
        const { pageConfig } = this.props;
        this.setState(
            {
                [item.id]: true,
                drawerTitle: I18n.t("ccms.addWidgetModalTitle")
            },
            () => {
                item.action && item.action(item.id, pageConfig["material-key"]);
            }
        );
    };
    handleWidgetDelete = id => {
        const { pageConfig, MuiTheme } = this.props;
        removeBuffer(id);
        const configs = removeWidgetById(pageConfig, id);
        this.handleWidgetsUpdate(configs, "", MuiTheme);
        this.setState({
            pageConfig: configs
        });
    };
    handleWidgetEdit = id => {
        const { pageConfig, MuiTheme } = this.props;
        const widgets = findWidgetById(pageConfig, id);
        const widget = widgets[0];
        this.handleWidgetsUpdate(pageConfig, id, MuiTheme);
        store.dispatch(actions.toggleAllModalState("addWidget", true));
        this.editId = id;
        this.setState({
            widgetConfig: widget,
            drawerTitle: I18n.t("ccms.editWidgetModalTitle")
        });
    };
    handleWidgetFullScreen = id => {
        const widgetContainer = document.getElementById("widgets_board_body");
        const widgetElement = document.getElementById(id);
        $.publish("WIDGET-RESIZE");
        if (this.full) {
            widgetContainer.style.overflow = "auto";
            widgetContainer.scrollTop = this.originScroolTop;
            widgetElement.style.position = "absolute";
            widgetElement.style.top = null;
            widgetElement.style.transform = this.originTransform;
            widgetElement.style.width = this.originWidth;
            widgetElement.style.height = this.originHeight;
            widgetElement.style.zIndex = 99;
            this.full = false;
        } else {
            this.originTransform = widgetElement.style.transform;
            this.originWidth = widgetElement.style.width;
            this.originHeight = widgetElement.style.height;
            this.originScroolTop = widgetContainer.scrollTop;
            widgetContainer.scrollTop = 0;
            widgetElement.style.position = "fixed";
            widgetElement.style.top = "0";
            widgetContainer.style.overflow = "hidden";
            widgetElement.style.width = "100%";
            widgetElement.style.height = "100vh";
            widgetElement.style.transform = "translate(0, 0)";
            widgetElement.style.zIndex = "999999999"; // make sure display in front
            this.full = true;
        }
        // const { pageConfig } = this.props;
        // const widgets = findWidgetById(pageConfig, id);
        // const widget = widgets[0];
        // const { properties } = widget;
        // const compInBuf = get(id);
        // this.handleWidgetsUpdate(pageConfig, id);
        // this.setState({
        //     modalOpen: !this.state.modalOpen,
        //     fullViewComponent: (compInBuf && compInBuf.reactEle && compInBuf.reactEle.view) || null,
        //     fullViewComponentProps: properties
        // });
    };
    modalOnClose = name => {
        this.editId = "";
        store.dispatch(actions.toggleAllModalState(name, false));
        this.setState({
            [name]: !this.state[name]
        });
    };
    onResize = currItem => {
        $.publish("WIDGET-RESIZE", currItem);
    };
    modalSubmit = name => {
        this.editId = "";
        store.dispatch(actions.toggleAllModalState(name, false));
        this.setState({
            [name]: !this.state[name]
        });
    };
    handleLayoutChange = layouts => {
        const { pageConfig } = this.props;
        const { lg } = layouts;
        if (!pageConfig || _.isEmpty(lg)) {
            return;
        }
        const { widgets } = pageConfig.configValue;
        const layoutGroup = _.groupBy(lg, "i");
        const afterLayoutWidgets = widgets.map((widget, index) => {
            // widget.layout = Object.assign({}, layoutGroup[widget.id][0]);
            // Object.assign
            return Object.assign({}, widget, {
                layout: {
                    ...widget.layout,
                    ...((layoutGroup[widget.id] && layoutGroup[widget.id][0]) || {})
                }
            });
        });
        const configs = Object.assign(pageConfig, {
            configValue: {
                ...pageConfig.configValue,
                widgets: afterLayoutWidgets
            }
        });
        this.setState({
            pageConfig: configs
        });
    };
    handleBoardExport = flag => {
        this.setState({
            exportCSV: true
        });
    };
    handleBoardExit = () => {
        const { editMode } = this.state;
        if (!editMode) {
            this.exitBoard();
        } else {
            this.setState({
                exitBoard: !this.state.exitBoard
            });
        }
    };
    handleBoardSave = blob => {
        const { pageConfig } = this.state;
        this.props.updatePageConfig(pageConfig, blob);
        this.props.widgetBoardEdit(false);
        const nodeList = document.querySelectorAll(".react-resizable-handle");
        Array.from(nodeList).forEach(node => {
            node.style.pointerEvents = "none";
            node.style.opacity = 0;
        });
        this.setState({
            editMode: false,
            pageConfig
        });
    };
    handleBoardEdit = async (pageConfig, editMode) => {
        const { pageKey } = this.state;
        const result = await checkUserModify(pageKey);
        const { appendMsg } = result;
        if (appendMsg && appendMsg.editable) {
            const nodeList = document.querySelectorAll(".react-resizable-handle");
            Array.from(nodeList).forEach(node => {
                node.style.pointerEvents = "all";
                node.style.opacity = 1;
            });
            this.props.widgetBoardEdit(true);
            this.setState({
                editMode: true
            });
        } else if (appendMsg && !appendMsg.editable) {
            // message.warn(appendMsg.message);
            store.dispatch(msg.warn(appendMsg.message));
        }
        this.setState({
            firstLoad: false
        });
    };
    handleExitEditMode = () => {
        this.props.widgetBoardEdit(false);
        this.setState({
            editMode: false
        });
    };
    exitBoard = () => {
        const { pageKey } = this.state;
        this.props.cleanTokenForPage(pageKey);
        window.location.hash = "/dashboards";
    };
    handleSaveTemplate = () => {
        this.setState({
            saveAsTemp: !this.props.saveAsTemp
        });
    };
    updateSecurity = applicationId => {
        const { pageConfig, pageName } = this.state;
        const materialKey = pageConfig["material-key"];
        const desc = pageConfig["desc"];
        // this.props.revertLoadingState();
        this.props.updateSecurity({
            applicationid: applicationId,
            visualizationid: materialKey,
            dashboardname: pageName,
            desc
        });
        store.dispatch(actions.toggleAllModalState("addPermission", false));
    };
    // checkVisual = (vid) => {
    //     this.props.getVisualInfo(vid);
    // }
    render = () => {
        const { classes, actions, top, right, loading, MuiTheme } = this.props;
        const {
            // modal control
            exitBoard,
            exportCSV,
            saveAsTemp,
            //modal control
            pageKey,
            pageName,
            editMode,
            pageConfig,
            drawerTitle,
            widgetConfig,
            draggableCancel,
            pageRequestError
        } = this.state;

        const {
            move,
            addWidget,
            userGroup,
            deleteBoard,
            renameWidget,
            defaultWidgets,
            addPermission,
            permissionList,
            resourceDetail
        } = this.props;
        const materialKey = pageConfig["material-key"];
        const { title, group } = pageConfig.configValue;

        return (
            <div id="ccms_widgets_board" className={classes.ccms_widgets_board}>
                <BoardHeader
                    editMode={editMode}
                    title={title}
                    subTitle={group}
                    pageConfig={pageConfig}
                    requestError={pageRequestError}
                    onBoardExport={this.handleBoardExport}
                    onBoardSave={this.handleBoardSave}
                    onBoardExit={this.handleBoardExit}
                    onBoardEdit={this.handleBoardEdit}
                    onExitEditMode={this.handleExitEditMode}
                    onSaveTemplate={this.handleSaveTemplate}
                />
                <section className={classes.board_body} id="widgets_board_body">
                    {loading && (
                        <div className={classes.loading_container}>
                            <Loading />
                        </div>
                    )}
                    {this.state.doms && this.state.doms.length > 0 && (
                        <WidgetGridView
                            getLayouts={this.handleLayoutChange}
                            onResize={this.onResize}
                            isBreakpoints
                            draggableCancel={draggableCancel}
                        >
                            {this.state.doms}
                        </WidgetGridView>
                    )}
                </section>
                {editMode && (
                    <FloatActionButton
                        top={top}
                        right={right}
                        actions={actions}
                        editMode={editMode}
                        onMenuClick={this.handleMenuIconClick}
                    />
                )}
                <WidgetDrawer
                    MuiTheme={MuiTheme}
                    open={addWidget}
                    pageConfig={pageConfig}
                    drawerTitle={drawerTitle}
                    widgetConfig={widgetConfig}
                    onSubmit={this.modalSubmit}
                    defaultWidgets={defaultWidgets}
                    app={(this.applicationInfo && JSON.parse(this.applicationInfo)) || null}
                    onHandleWidgetsUpdate={this.handleWidgetsUpdate}
                />
                <ExitReminder open={exitBoard} onCancel={this.modalOnClose} onSubmit={this.exitBoard} />
                <TemplateModal
                    app={this.applicationInfo}
                    open={saveAsTemp}
                    onCancel={this.modalOnClose}
                    onSubmit={this.modalOnClose}
                />
                <ExportCSV
                    open={exportCSV}
                    pageName={pageName}
                    pageKey={pageKey}
                    onCancel={this.modalOnClose}
                    onSubmit={this.modalOnClose}
                    pageConfig={pageConfig}
                />
                <DeleteModal
                    pageKey={pageKey}
                    open={deleteBoard}
                    pageName={pageName}
                    materialKey={materialKey}
                    onCancel={this.modalOnClose}
                    onSubmit={this.modalOnClose}
                />
                <EditDashboard
                    open={move}
                    mode={"Move"}
                    pageKey={pageKey}
                    onCancel={this.modalOnClose}
                    onSubmit={this.modalOnClose}
                    app={(this.applicationInfo && JSON.parse(this.applicationInfo)) || null}
                />
                <RenameDashboard
                    open={renameWidget}
                    pageKey={pageKey}
                    pageName={pageName}
                    onCancel={this.modalOnClose}
                    onSubmit={this.modalOnClose}
                />
                <SecurityModal
                    group={userGroup}
                    open={addPermission}
                    materialKey={materialKey}
                    onCancel={this.modalOnClose}
                    permissions={permissionList}
                    onSubmit={this.updateSecurity}
                    resourceDetail={resourceDetail}
                    onVisualizationCheck={this.checkVisual}
                />
            </div>
        );
    };
}

const mapStateToProps = (state, ownedProps) => {
    return {
        actions: state[reducerName] && state[reducerName].buttonActions,
        pageConfig: state[reducerName] && state[reducerName].pageConfig,
        updateSize: state[mapReducerName] && state[mapReducerName].updateSize,
        pageRequestError: state[reducerName] && state[reducerName].pageRequestError,
        errorMessage: state[reducerName] && state[reducerName].errorMessage,
        loading: state[reducerName] && state[reducerName].loading,
        defaultWidgets: state[reducerName] && state[reducerName].components,
        editable: state[reducerName] && state[reducerName].editable,
        permissionList: state[reducerName] && state[reducerName].permissionList,
        userGroup: state[reducerName] && state[reducerName].userGroup,
        resourceDetail: state[reducerName] && state[reducerName].resourceDetail,
        move: state[reducerName] && state[reducerName].move,
        addWidget: state[reducerName] && state[reducerName].addWidget,
        deleteBoard: state[reducerName] && state[reducerName].deleteBoard,
        renameWidget: state[reducerName] && state[reducerName].renameWidget,
        addPermission: state[reducerName] && state[reducerName].addPermission,
        MuiTheme: state[themeReducer] && state[themeReducer].MuiTheme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestAllDefaultComp: () => {
            dispatch(actions.requestAllDefaultComponent());
        },
        excuteActionFromWidget: (ccmsAction, properties, id) => {
            dispatch(ccmsAction(properties, id));
        },
        requestConfigByApi: (pageKey, page) => {
            dispatch(actions.requestPageConfig(pageKey, page));
        },
        widgetBoardEdit: flag => {
            dispatch(actions.toggleEditMode(Boolean(flag)));
        },
        updatePageConfig: (config, bgpBlob) => {
            dispatch(actions.updatePageConfig(config, bgpBlob));
        },
        clearPageConfig: defaultConfig => {
            dispatch(actions.passPageConfig(defaultConfig));
        },
        cleanTokenForPage: pageKey => {
            dispatch(actions.cleanTokenForPage(pageKey));
        },
        revertLoadingState: () => {
            dispatch(actions.passLoadingState(true));
        },
        getPermissionList: () => {
            dispatch(actions.getPermissionList());
        },
        updateSecurity: params => {
            dispatch(actions.updatePermissions(params));
        }
        // getResourceInfo: key => {
        //     dispatch(actions.getResourceInfo(key));
        // },
        // getVisualInfo: id => {
        //     dispatch(actions.getVisualInfo(id));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(WidgetsBoard)));
