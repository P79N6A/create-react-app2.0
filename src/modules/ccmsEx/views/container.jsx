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
import { CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import domtoimage from "dom-to-image";
import $ from "jquery";
import _ from "lodash";
import { actions as DASHBOARDS } from "modules/ccmsLibrary";
import { actions as MODALS } from "modules/ccmsModal";
import { reducerName as themeReducer } from "modules/theme";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { I18n } from "react-i18nify";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import { loader /*, get*/ } from "../funcs/componentLoader";
import { DEFAULT_PAGE_CONFIG, REDUCER_NAME as ccsmExReducename } from "../funcs/constants";
import { findWidgetById, removeWidgetById, renderLayout, replaceWidgetById } from "../funcs/mergePageConfig";
import { checkBrowser } from "../funcs/utils";
import { commonLoader } from "./../funcs/componentLoader";
import FloatActionButton from "./components/actionButton";
import WidgetContainer from "./components/widgetContainerInLayout";
import Grid from "./grid";
import Header from "./header";
import ModalEx from "./modal";
import WidgetDrawer from "./widgetDrawer";
const styles = Theme => {
    return {
        modalRoot: {
            paddingTop: Theme.spacing.unit * 8,
            zIndex: Theme.zIndex.modal - 1
        },
        cardContentRoot: {
            flex: 1,
            overflow: "auto",
            padding: 0,
            height: "93vh",
            background: Theme.palette.primary.main
        }
        // grid_container: {}
    };
};

class Container extends Component {
    state = {
        id: "",
        doms: [],
        open: false,
        drawerOpen: false,
        drawerTitle: "",
        previewComp: null,
        editWidget: {},
        actionButtons: [],
        category: "",
        compId: "",
        editMode: false
    };
    static defaultProps = {
        actions: [],
        open: false,
        pageKey: "",
        pageConfig: DEFAULT_PAGE_CONFIG
    };
    static propTypes = {
        actions: PropTypes.array,
        open: PropTypes.bool,
        pageKey: PropTypes.string
    };
    widgetsUpdate = (config, id) => {
        if (!config) return;
        const { editMode } = this.state;
        const { widgetAction, MuiTheme, currentApplicationInfo } = this.props;
        const { configValue } = config;
        Promise.all(loader(configValue))
            .then(widgets => {
                return _.map(widgets, widget => {
                    if (id === widget.id) {
                        const { layout, reactEle, properties } = widget;
                        const { view, editerView, ccmsAction } = reactEle;
                        this.setState({
                            view,
                            layout,
                            ccmsAction,
                            props: properties,
                            editView: editerView
                        });
                    }
                    widget &&
                        widget.reactEle &&
                        widget.reactEle.ccmsAction &&
                        store.dispatch(widget.reactEle.ccmsAction(widget.properties, widget.id));
                    return (
                        <div data-grid={widget.layout} key={widget.id} id={widget.id}>
                            <WidgetContainer
                                title={widget.title}
                                widgetId={widget.id}
                                widgetAction={widgetAction}
                                onWidgetAction={this.handleWidgetAction}
                            >
                                {id !== widget.id ? (
                                    <widget.reactEle.view
                                        key={widget.id}
                                        identify={widget.id}
                                        MuiTheme={MuiTheme}
                                        onFullScreen={this.handleWidgetFullScreen}
                                        currentApplicationInfo={currentApplicationInfo}
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
            .then(doms => {
                this.setState(
                    {
                        doms
                    },
                    () => {
                        if (!editMode) {
                            const nodeList = document.querySelectorAll(".react-resizable-handle");
                            Array.from(nodeList).forEach(node => {
                                node.style.pointerEvents = "none";
                                node.style.opacity = 0;
                            });
                        }
                    }
                );
            });
    };
    handleClick = (type, datas) => {
        let { pageConfig, currentApplicationInfo } = this.props;
        const appid = currentApplicationInfo["address.iotTopologyId"] || "";
        const nodeList = document.querySelectorAll(".react-resizable-handle");
        switch (type) {
            case "download":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "export",
                        args: {
                            pageConfig
                        }
                    })
                );
                break;
            case "template":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "template",
                        args: {
                            pageConfig
                        }
                    })
                );
                break;
            case "edit":
                Array.from(nodeList).forEach(node => {
                    node.style.pointerEvents = "all";
                    node.style.opacity = 1;
                });
                this.setState(
                    {
                        editMode: true
                    },
                    () => {
                        this.props.widgetBoardEdit(true);
                    }
                );
                break;
            case "save":
                this.props.widgetBoardEdit(false);
                Object.assign(pageConfig, {
                    appid: currentApplicationInfo && currentApplicationInfo["address.iotTopologyId"]
                });
                store.dispatch(DASHBOARDS.toggleLoadingState(true));
                store.dispatch(DASHBOARDS.getDashboardSuccess([]));
                if (checkBrowser() === "IE") {
                    this.props.updatePageConfig(pageConfig, null);
                    Array.from(nodeList).forEach(node => {
                        node.style.pointerEvents = "none";
                        node.style.opacity = 0;
                    });
                } else {
                    const dom = document.querySelector("#widgets_board_body");
                    const nodeList = document.querySelectorAll(".react-resizable-handle");
                    domtoimage
                        .toBlob(dom, {})
                        .then(blob => {
                            this.setState(
                                {
                                    editMode: false
                                },
                                () => {
                                    this.props.updatePageConfig(pageConfig, blob);
                                    Array.from(nodeList).forEach(node => {
                                        node.style.pointerEvents = "none";
                                        node.style.opacity = 0;
                                    });
                                }
                            );
                        })
                        .catch(err => {
                            // store.dispatch(MESSAGE.warn(err.message, "CCMS-SNAPSHOOT"));
                            this.props.updatePageConfig(pageConfig, null);
                        });
                }
                // this.props.cleanTokenForPage(pageKey);
                break;
            case "exit":
                const { editMode } = this.state;
                if (editMode) {
                    store.dispatch(
                        MODALS.toggleModal(true, {
                            mode: "reminder"
                        })
                    );
                    return;
                }
                store.dispatch(MODALS.getPageKeySuccess(null));
                store.dispatch(actions.getCustomizedDashboards(appid));
                store.dispatch(actions.showModal(false));
                break;
            default:
                break;
        }
    };
    handleWidgetAction = (id, action) => {
        let { pageConfig } = this.props;
        switch (action) {
            case "delete":
                const configs = removeWidgetById(pageConfig, id);
                this.widgetsUpdate(configs);
                break;
            case "edit":
                const widget = findWidgetById(pageConfig, id)[0];
                const { category, type } = widget && widget.infos;
                this.widgetsUpdate(pageConfig, id);
                this.setState({
                    id,
                    category,
                    compId: type,
                    activeStep: 1,
                    drawerOpen: !this.state.drawerOpen,
                    drawerTitle: I18n.t("ccms.editWidgetModalTitle")
                });
                break;
            case "fullscreen":
                this.handleWidgetAction();
                break;
            case "close":
                this.widgetsUpdate(pageConfig);
                this.setState({
                    drawerOpen: false,
                    compId: "",
                    category: "",
                    templates: []
                });
                break;
            case "exit":
                this.setState(
                    {
                        exitBoard: false
                    },
                    () => {
                        store.dispatch(actions.showModal(false));
                    }
                );
                break;
            default:
                break;
        }
    };
    handleWidgetSelected = async template => {
        const { id: oldId } = this.state;
        const { metadata, configValue } = template;
        const { compId, category } = metadata;
        const { properties, layout, settings } = configValue;
        const { reactEle, id } = await commonLoader(metadata.element.uri, oldId || undefined);
        const { view, editerView, ccmsAction } = reactEle;
        ccmsAction && store.dispatch(ccmsAction(properties, id));
        this.setState({
            id,
            view,
            layout,
            compId,
            category,
            metadata,
            settings,
            activeStep: 1,
            props: properties,
            editView: editerView
        });
    };
    handleMenuIconClick = item => {
        const { id } = item;
        const { pageConfig } = this.props;
        const { pageName, pageKey } = this.state;
        switch (id) {
            case "addWidget":
                // console.log(id);
                this.setState({
                    drawerOpen: !this.state.drawerOpen,
                    drawerTitle: I18n.t("ccms.addWidgetModalTitle"),
                    activeStep: 0,
                    editView: null,
                    view: null,
                    id: ""
                });
                break;
            case "rename":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "rename",
                        args: {
                            pageConfig
                        }
                    })
                );
                break;
            case "move":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "move",
                        args: { pageConfig }
                    })
                );
                break;
            case "delete":
                store.dispatch(
                    MODALS.toggleModal(true, {
                        mode: "delete",
                        args: {
                            name: pageName,
                            pageKey: pageKey
                        }
                    })
                );
                break;
            default:
                break;
        }
    };
    handleWidgetCategoryChange = category => {
        const { template, category: gory } = category;
        this.setState({
            category: gory,
            templates: template,
            editView: null
        });
    };
    handleOperate = (type, container) => {
        const { id, metadata, props, settings, category, compId, layout, templates } = this.state;
        let { pageConfig } = this.props;
        switch (type) {
            case "next":
                this.setState({
                    activeStep: 1
                });
                break;
            case "back":
                this.setState({
                    activeStep: 0,
                    templates,
                    category,
                    compId
                });
                break;
            case "close":
                this.setState(
                    {
                        activeStep: 0,
                        templates: [],
                        category: "",
                        compId: "",
                        drawerOpen: !this.state.drawerOpen
                    },
                    () => {
                        this.widgetsUpdate(pageConfig);
                    }
                );
                break;
            case "save":
                const datas = container.getProps();
                let widget = findWidgetById(pageConfig, id)[0];
                widget = widget
                    ? Object.assign({}, widget, {
                        properties: datas
                    })
                    : {
                        uri: metadata && metadata.element && metadata.element.uri,
                        "material-key": "",
                        properties: datas || props,
                        settings: settings,
                        infos: {
                            category,
                            type: compId
                        },
                        id,
                        layout: Object.assign({}, renderLayout(pageConfig.configValue.widgets), layout || {})
                    };
                pageConfig = replaceWidgetById(pageConfig, id, widget);
                this.widgetsUpdate(pageConfig);
                this.setState({
                    drawerOpen: !this.state.drawerOpen,
                    view: null,
                    editView: null,
                    category: "",
                    templates: [],
                    compId: "",
                    props: {},
                    id: "",
                    layout: undefined,
                    metadata,
                    settings,
                    activeStep: 0
                });
                break;
            default:
                break;
        }
    };
    componentWillReceiveProps = nextProps => {
        if (_.isEqual(this.props, nextProps)) return;
        const { pageConfig, editMode, open } = nextProps;
        const { /*pageId,*/ pageKey, configValue } = pageConfig;
        const { title } = configValue;
        if (!open) return store.dispatch(actions.transformPage(DEFAULT_PAGE_CONFIG));
        this.setState({
            pageKey,
            pageName: title,
            editMode: editMode !== undefined ? editMode : false
        });
        editMode !== undefined && store.dispatch(actions.toggleEditMode(editMode));
        this.widgetsUpdate(pageConfig);
    };
    componentDidMount = () => {
        const { currentApplicationInfo } = this.props;
        const appid = currentApplicationInfo["address.iotTopologyId"] || "";
        let { pageConfig } = this.props;
        // const a = {
        //     id: "Customize Dashboards",
        //     pages: [],
        //     status: "2002",
        //     desc: "Customized Dashboards for rule",
        //     appid: appid
        // };
        // store.dispatch(MODALS.createGroup(a.id, a.pages, a.status, a.desc, a.appid));
        store.dispatch(actions.getCustomizedDashboards(appid));
        this.widgetsUpdate(pageConfig);
    };
    handleLayoutChange = layouts => {
        const { pageConfig } = this.props;
        const { lg } = layouts;
        if (!pageConfig || _.isEmpty(lg)) {
            return;
        }
        const { widgets } = pageConfig.configValue;
        const layoutGroup = _.groupBy(lg, "i");
        const afterLayoutWidgets = widgets.map(widget => {
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
    };
    render = () => {
        const {
            drawerOpen,
            doms,
            view,
            props,
            editView,
            layout,
            drawerTitle,
            activeStep,
            id,
            compId,
            category,
            templates,
            editMode,
            pageName,
            settings
        } = this.state;
        const {
            actions,
            loading,
            draggableCancel,
            actionButtons,
            classes,
            open,
            ccmsAction,
            widgetList,
            MuiTheme,
            currentApplicationInfo
        } = this.props;
        return (
            <ModalEx open={open}>
                <React.Fragment>
                    <Header
                        loading={loading}
                        editMode={editMode}
                        title={pageName}
                        actions={actions}
                        onClick={this.handleClick}
                    />
                    <CardContent
                        classes={{
                            root: classes.cardContentRoot
                        }}
                    >
                        <section
                            id="widgets_board_body"
                            style={{
                                height: "100%"
                            }}
                        >
                            {!loading && (
                                <Grid
                                    onLayoutChange={this.handleLayoutChange}
                                    editMode={editMode}
                                    doms={doms}
                                    draggableCancel={draggableCancel}
                                />
                            )}
                        </section>
                    </CardContent>
                    <WidgetDrawer
                        app={currentApplicationInfo}
                        id={id}
                        MuiTheme={MuiTheme}
                        widgetList={widgetList}
                        editMode={editMode}
                        compId={compId}
                        category={category}
                        templates={templates}
                        ccmsAction={ccmsAction}
                        open={drawerOpen}
                        settings={settings}
                        title={drawerTitle}
                        previewProps={props}
                        previewLayout={layout}
                        activeStep={activeStep}
                        previewComponent={view}
                        editorComponent={editView}
                        onOperate={this.handleOperate}
                        onClick={this.handleWidgetAction}
                        onWidgetSelected={this.handleWidgetSelected}
                        onCategoryChange={this.handleWidgetCategoryChange}
                    />
                    <FloatActionButton
                        editMode={editMode}
                        actions={actionButtons}
                        onMenuClick={this.handleMenuIconClick}
                    />
                </React.Fragment>
            </ModalEx>
        );
    };
}

const mapStateToProps = (state, action) => {
    return {
        pageKey: state && state[ccsmExReducename] && state[ccsmExReducename].pageKey,
        open: state && state[ccsmExReducename] && state[ccsmExReducename].open,
        editMode: state && state[ccsmExReducename] && state[ccsmExReducename].editMode,
        pageConfig: state[ccsmExReducename] && state[ccsmExReducename].pageConfig,
        widgetList: state[ccsmExReducename] && state[ccsmExReducename].widgets,
        MuiTheme: state[themeReducer] && state[themeReducer].MuiTheme,
        loading: state[ccsmExReducename] && state[ccsmExReducename].loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // requestAllDefaultComp: () => {
        //     dispatch(actions.requestAllDefaultComponent());
        // },
        widgetBoardEdit: flag => {
            dispatch(actions.toggleEditMode(Boolean(flag)));
        },
        updatePageConfig: (config, bgpBlob) => {
            dispatch(actions.requestPageUpdate(config, bgpBlob));
        },
        cleanTokenForPage: pageKey => {
            dispatch(actions.cleanTokenForPage(pageKey));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Container));
