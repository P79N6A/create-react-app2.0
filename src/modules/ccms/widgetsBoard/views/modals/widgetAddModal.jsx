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
import { ModalDialog } from "../../../components";
import PreviewCentre from "../previewCentre";
import PropertyCentre from "../propertiesCentre";
import VisualCentre from "../visualCentre";
import SelectionRegion from "../selectionRegion";
import { withStyles } from "@material-ui/core/styles";
// import { theme as themes } from "modules/theme";
import { commonLoader } from "../../funcs/componentLoader";
import { mergeConfig, replaceWidgetById, renderLayout } from "../../funcs/mergePageConfig";
import { I18n } from "react-i18nify";

const styles = theme => {
    return {
        modaldialog_content: {
            width: theme.spacing.unit * 75,
            height: "77vh",
            overflow: "hidden"
        }
    };
};

/**
 *
 *
 * @class WidgetAddModal
 * @extends {React.Component}
 */
class WidgetAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetConfig: null,
            properties: null,
            tabIndex: 0,
            modalOpen: false,
            visualCatrgory: (props.visualOpt && props.visualOpt.category) || null,
            visualType: (props.visualOpt && props.visualOpt.type) || null,
            visualTypeList: [],
            isDisabled: true,
            widgetEle: {
                reactEle: {
                    view: null,
                    editerView: null,
                    visualEditer: false,
                    ccmsAction: null
                },
                id: null
            },
            privateEle: null,
            modalOpt: {
                mode: "add",
                title: "",
                subTitle: "",
                lockTab: true
            }
        };
    }
    static defaultProps = {
        open: false,
        widgetEle: null,
        modalOpt: null,
        visualOpt: null,
        onCancel: () => {},
        onSubmit: () => {},
        onHandleWidgetsUpdate: () => {}
    };
    resetState = cb => {
        this.setState({
            widgetConfig: null,
            properties: null,
            tabIndex: 0,
            modalOpen: false,
            visualTypeList: []
        });
    };
    handleModalClose = () => {
        let { pageConfig } = this.props;
        this.props.onHandleWidgetsUpdate(pageConfig);
        this.resetState();
        this.props.onCancel("addWidget");
    };
    handleModalSubmit = () => {
        let { widgetConfig, properties, item, visualCatrgory, visualType, widgetEle } = this.state;
        const { metadata, configValue } = item || {};
        let { pageConfig } = this.props;
        let propsFromWidget = this.container.getProps();
        if (widgetConfig) {
            const widget = {
                uri: metadata.element.uri,
                "material-key": configValue["material-key"],
                properties: propsFromWidget || properties,
                infos: {
                    category: visualCatrgory,
                    type: visualType
                },
                id: widgetEle.id,
                layout: Object.assign({}, renderLayout(pageConfig.configValue.widgets), configValue.layout || {})
            };
            pageConfig = mergeConfig(pageConfig, widget);
        } else {
            pageConfig = replaceWidgetById(
                pageConfig,
                widgetEle.id,
                Object.assign(widgetEle, {
                    properties: propsFromWidget || properties
                })
            );
        }
        this.props.onHandleWidgetsUpdate(pageConfig);
        this.resetState();
        this.props.onSubmit("addWidget");
    };
    handleVisualChange = async widgetConfig => {
        this.setState({
            widgetConfig,
            properties: null
        });
    };
    handleWidgetSelect = async item => {
        const { metadata, configValue } = item;
        const { properties } = configValue;
        const { widgetEle } = this.state;
        const privateEle = await commonLoader(metadata.element.uri);
        Object.assign(widgetEle, {
            reactEle: {
                view: null,
                editerView: null,
                visualEditer: false,
                ccmsAction: null
            }
        });
        this.setState(
            {
                widgetEle,
                lockTab: true,
                visualType: null
            },
            () => {
                this.setState({
                    properties,
                    widgetEle: Object.assign(privateEle, {
                        properties
                    }),
                    item,
                    tabIndex: 1,
                    lockTab: false,
                    isDisabled: false
                });
            }
        );
    };
    handlePropChange = nextProps => {
        const { widgetEle } = this.state;
        this.setState({
            widgetEle: Object.assign(widgetEle, {
                properties: nextProps
            }),
            properties: nextProps
        });
    };
    handleTabChange = index => {
        const { lockTab } = this.state;
        if (lockTab) {
            return;
        }
        this.setState({
            tabIndex: index,
            isDisabled: index !== 1
        });
    };
    handleVisualComplete = ({ widgetCategory, widgetType, widgetTypesList }) => {
        const { tabIndex } = this.state;
        if (tabIndex === 0) {
            return;
        }
        this.setState({
            visualCatrgory: widgetCategory,
            visualType: widgetType,
            visualTypeList: widgetTypesList
        });
    };
    handlePreviewPropsChange = props => {
        const { widgetEle } = this.state;
        this.setState({
            widgetEle: Object.assign(widgetEle, {
                properties: props
            }),
            properties: props
        });
    };
    componentWillReceiveProps = nextProps => {
        this.setState({
            modalOpen: nextProps.open,
            modalOpt: nextProps.modalOpt,
            tabIndex: nextProps.modalOpt.tabIndex,
            lockTab: nextProps.modalOpt.lockTab,
            mode: nextProps.modalOpt.mode,
            visualCatrgory: nextProps.visualOpt && nextProps.visualOpt.category,
            visualType: nextProps.visualOpt && nextProps.visualOpt.type,
            properties: nextProps.widgetEle && nextProps.widgetEle.properties,
            widgetEle: nextProps.widgetEle,
            isDisabled: nextProps.isDisabled,
            pageConfig: nextProps.pageConfig
        });
    };
    componentWillMount = () => {};
    render = () => {
        const { classes, defaultWidgets } = this.props;
        const {
            modalOpt,
            properties,
            tabIndex,
            modalOpen,
            visualCatrgory,
            visualType,
            visualTypeList,
            widgetEle,
            isDisabled
        } = this.state;
        const { reactEle, id } = widgetEle;
        const { view, editerView, ccmsAction, visualEditer } = reactEle;
        const selectionRegionOpt = {
            tabs: [
                {
                    label: I18n.t("ccms.visualTabLabel"),
                    index: 0,
                    content: (
                        <VisualCentre
                            categories={defaultWidgets}
                            category={visualCatrgory}
                            type={visualType}
                            typelist={visualTypeList}
                            onPropsChange={this.handleVisualChange}
                            onWidgetSelect={this.handleWidgetSelect}
                            onVisualComplete={this.handleVisualComplete}
                        />
                    )
                },
                {
                    label: I18n.t("ccms.propertiesTabLabel"),
                    index: 1,
                    content: (
                        <PropertyCentre
                            onPropsChange={this.handlePropChange}
                            mode={visualEditer}
                            VisualEditer={editerView}
                            // widgetEle={widgetEle}
                            ccmsAction={ccmsAction}
                            properties={properties}
                            getProps={this.getProps}
                            get={node => (this.container = node)}
                            id={id}
                        />
                    )
                }
            ]
        };
        return (
            <ModalDialog
                {...modalOpt}
                noPadding
                onClose={false}
                isDisabled={isDisabled}
                onCancle={this.handleModalClose}
                onSubmit={this.handleModalSubmit}
                open={modalOpen}
            >
                <div className={classes.modaldialog_content}>
                    <PreviewCentre
                        id={id}
                        PreviewElement={view}
                        ccmsAction={ccmsAction}
                        properties={properties}
                        onPreviewPropsChange={this.handlePreviewPropsChange}
                    />
                    <SelectionRegion
                        tabs={selectionRegionOpt.tabs}
                        index={tabIndex}
                        onTabChange={this.handleTabChange}
                    />
                </div>
            </ModalDialog>
        );
    };
}

export default withStyles(styles)(WidgetAddModal);
