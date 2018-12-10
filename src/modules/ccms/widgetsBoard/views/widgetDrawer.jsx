import React from "react";
import Wrap from "commons/components/wrapComponent";
import { Step, Icon, Button, AppBar, Drawer, Stepper, Toolbar, Typography, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
// import { theme as themes } from "modules/theme";
import VisualCentre from "./visualCentre";
import PropertyCentre from "./propertiesCentre";
import { commonLoader } from "./../funcs/componentLoader";
import { replaceWidgetById, renderLayout } from "./../funcs/mergePageConfig";
import store from "commons/store";
import { StepLabel } from "modules/common";

const drawerWidth = 33.2;

const PREVIEW_MAX_HEIGHT = 24;
const PREVIEW_MAX_WIDTH = 22;

const styles = themes => {
    return {
        flex: {
            flexGrow: 1
        },
        drawerRoot: {
            width: 500
        },
        drawerPaper: {
            width: `${drawerWidth}vw`,
            paddingTop: themes.spacing.unit * 8,
            overflowY: "visible"
        },
        leftDrawerPaper: {
            alignItems: "center",
            justifyContent: "center",
            background: themes.palette.action.disabledBackground,
            width: `${100 - drawerWidth}vw`,
            zIndex: 1011
        },
        contentWrap: {
            flexGrow: 1,
            height: "100%",
            padding: "0 24px",
            overflowX: "hidden",
            overflowY: "auto"
        },
        buttonsWrap: {
            display: "flex",
            flexDirection: "row-reverse",
            padding: `${themes.spacing.unit * 3}px ${themes.spacing.unit * 2}px`
        },
        appbarRoot: {
            width: `${drawerWidth}vw`,
            boxShadow: "none"
        }
    };
};

const PreviewContainer = ({ children, layout, lock }) => {
    const { h, w } = layout;
    const w_unit = (window.innerWidth * (1 - drawerWidth / 100)) / PREVIEW_MAX_HEIGHT;
    const h_unit = window.innerHeight / PREVIEW_MAX_WIDTH;
    return (
        <div
            style={{
                pointerEvents: lock ? "none" : "all",
                width: `${w >= PREVIEW_MAX_HEIGHT ? (PREVIEW_MAX_HEIGHT - 1) * w_unit : w * w_unit}px`,
                height: `${h >= PREVIEW_MAX_WIDTH ? (PREVIEW_MAX_WIDTH - 1) * h_unit : h * h_unit}px`
            }}
        >
            {children}
        </div>
    );
};

class WidgetDrawer extends React.Component {
    state = {
        anchor1: "right",
        activeStep: 0,
        category: "",
        compId: "",
        View: null,
        completed: {},
        template: [],
        lockStepper: true,
        saveLocker: false
    };
    static defaultProps = {
        steps: [
            {
                label: "Select a widget"
            },
            {
                label: "Configure your widget"
            }
        ]
    };
    handleResetState = () => {
        this.setState({
            id: null,
            compId: "",
            View: null,
            layout: {},
            template: [],
            category: "",
            completed: {},
            activeStep: 0,
            editerView: null,
            properties: null,
            widgetConfig: null,
            ccmsAction: () => {},
            rawWidgetConfig: { metadata: {}, configValue: {} }
        });
    };
    handleDrawerClose = () => {
        let { pageConfig } = this.props;
        this.props.onSubmit("addWidget");
        this.props.onHandleWidgetsUpdate(pageConfig, "", null);
    };
    getStepLength = () => {
        return this.props.steps.length || 0;
    };
    handleStepButtonClick = stepIndex => {
        const { lockStepper, completed } = this.state;
        if (lockStepper) {
            return;
        }
        completed[stepIndex] = false;
        this.setState({
            activeStep: stepIndex,
            completed
        });
    };
    handleBack = () => {
        let { activeStep, completed, lockStepper } = this.state;
        if (lockStepper) {
            return;
        }
        completed[activeStep - 1] = false;
        activeStep -= 1;
        this.setState({
            activeStep,
            completed
        });
    };
    handleNext = () => {
        let { activeStep, completed, category, compId } = this.state;
        if (!category && !compId) {
            return;
        }
        completed[activeStep] = true;
        activeStep += 1;
        this.setState({
            activeStep,
            completed
        });
    };
    handleSave = () => {
        let { pageConfig } = this.props;
        let { properties, rawWidgetConfig, category, compId, id, widgetConfig } = this.state;
        const { metadata, configValue } = rawWidgetConfig || { metadata: {}, configValue: {} };
        const propsFromWidget = this.container.getProps();
        widgetConfig = widgetConfig
            ? Object.assign(widgetConfig, {
                properties: propsFromWidget
            })
            : {
                uri: metadata.element.uri,
                "material-key": configValue["material-key"],
                properties: propsFromWidget || properties,
                settings: configValue.settings,
                infos: {
                    category,
                    type: compId
                },
                id,
                layout: Object.assign({}, renderLayout(pageConfig.configValue.widgets), configValue.layout || {})
            };
        pageConfig = replaceWidgetById(pageConfig, id, widgetConfig);
        this.props.onHandleWidgetsUpdate(pageConfig, "", null);
        this.props.onSubmit("addWidget");
        this.handleResetState();
    };
    handleCancel = () => {
        let { pageConfig } = this.props;
        this.props.onSubmit("addWidget");
        this.props.onHandleWidgetsUpdate(pageConfig, "", null);
        this.handleResetState();
    };
    handleWidgetLoad = async widgetConfig => {
        const { properties, layout, infos, id, uri, settings } = widgetConfig;
        const { category, type } = infos;
        const { reactEle } = await commonLoader(uri, id);
        const { view, editerView, ccmsAction } = reactEle;
        const { editable } = settings || { editable: false };
        properties && id && ccmsAction && store.dispatch(ccmsAction(properties, id));
        this.setState({
            id,
            layout,
            category,
            View: view,
            editerView,
            ccmsAction,
            properties,
            compId: type,
            activeStep: 1,
            widgetConfig,
            completed: { 0: true },
            preview_editable: editable,
            lockStepper: !!widgetConfig
        });
    };
    handleWidgetSelect = async rawWidgetConfig => {
        const { metadata, configValue } = rawWidgetConfig;
        const { properties, layout, settings } = configValue;
        const { editable } = settings || { editable: false };
        const { reactEle, id } = await commonLoader(metadata.element.uri);
        const { view, editerView, ccmsAction } = reactEle;
        properties && id && ccmsAction && store.dispatch(ccmsAction(properties, id));
        this.setState(
            {
                id,
                layout,
                View: null,
                editerView,
                ccmsAction,
                properties,
                activeStep: 1,
                rawWidgetConfig,
                lockStepper: false,
                completed: { 0: true },
                compId: metadata.compId,
                preview_editable: editable
            },
            () => {
                this.setState({
                    View: view
                });
            }
        );
    };
    handleCategoryChange = cateinfo => {
        const { template, category } = cateinfo;
        this.setState({
            category: category || "None",
            template: template || [],
            compId: ""
        });
    };
    componentWillReceiveProps = nextProps => {
        if (!!nextProps && !!nextProps.widgetConfig) {
            this.handleWidgetLoad(nextProps.widgetConfig);
        }
    };
    disabledSave = state => {
        this.setState({
            saveLocker: !!state
        });
    };
    render = () => {
        const {
            id,
            View,
            layout,
            anchor1,
            compId,
            template,
            category,
            activeStep,
            properties,
            editerView,
            ccmsAction,
            saveLocker,
            lockStepper,
            preview_editable
        } = this.state;
        const { classes, steps, defaultWidgets, open, drawerTitle, MuiTheme, app } = this.props;

        return (
            // <MuiThemeProvider theme={themes}>
            <Wrap>
                <Drawer
                    open={open}
                    anchor={anchor1}
                    variant="persistent"
                    onClose={this.handleDrawerClose}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    className={classes.drawerRoot}
                >
                    <AppBar position="absolute" color="inherit" classes={{ root: classes.appbarRoot }}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.flex}>
                                {drawerTitle}
                            </Typography>
                            <IconButton onClick={this.handleCancel}>
                                <Icon>close</Icon>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Stepper activeStep={activeStep} classes={{ horizontal: classes.stepperHorizontal }}>
                        {steps.map((item, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{item.label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div className={classes.contentWrap}>
                        {activeStep === 0 && (
                            <VisualCentre
                                onCategoryChange={this.handleCategoryChange}
                                onWidgetSelect={this.handleWidgetSelect}
                                categories={defaultWidgets}
                                selectWidget={compId}
                                selectCategory={category}
                                templates={template}
                            />
                        )}
                        {activeStep === 1 && (
                            <PropertyCentre
                                VisualEditer={editerView}
                                ccmsAction={ccmsAction}
                                getProps={this.getProps}
                                properties={properties}
                                onSaveLock={this.disabledSave}
                                get={node => (this.container = node)}
                                id={id}
                                app={app}
                            />
                        )}
                    </div>
                    <div className={classes.buttonsWrap}>
                        {activeStep + 1 === this.getStepLength() ? (
                            <Button color="secondary" disabled={saveLocker} onClick={this.handleSave}>
                                Save
                            </Button>
                        ) : (
                            <Button color="secondary" disabled={!compId} onClick={this.handleNext}>
                                Next
                            </Button>
                        )}
                        {activeStep !== 0 ? (
                            <Button color="secondary" disabled={lockStepper} onClick={this.handleBack}>
                                Back
                            </Button>
                        ) : (
                            <Button color="secondary" onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </Drawer>
                <Drawer
                    variant="persistent"
                    open={open}
                    anchor={"left"}
                    onClose={this.handleDrawerClose}
                    classes={{
                        paper: classes.leftDrawerPaper
                    }}
                    style={{
                        cursor: preview_editable ? "default" : "not-allowed",
                        position: "fixed",
                        zIndex: 1011
                    }}
                >
                    <PreviewContainer layout={layout || { h: 0, w: 0 }} lock={!preview_editable}>
                        {View && (
                            <View identify={id} MuiTheme={MuiTheme} currentApplicationInfo={app} {...properties} />
                        )}
                    </PreviewContainer>
                </Drawer>
            </Wrap>
            // </MuiThemeProvider>
        );
    };
}

export default withStyles(styles)(WidgetDrawer);
