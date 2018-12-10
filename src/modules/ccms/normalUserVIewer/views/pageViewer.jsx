import React from "react";
import _ from "lodash";
import Wrap from "commons/components/wrapComponent";
import queryString from "commons/utils/queryStringHelper";
import { loader } from "modules/ccms/widgetsBoard/funcs/componentLoader";
import { GridEx as WidgetGridView, WidgetContainer, Loading } from "modules/ccms/components";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "modules/ccms/widgetsBoard/funcs/constants";
import * as actions from "modules/ccms/widgetsBoard/funcs/actions";
import store from "commons/store";
class PageViewer extends React.Component {
    state = {
        doms: [],
        loading: true,
        pageRequestError: false,
        errorMessage: null
    };
    static defaultProps = {
        loading: true
    };
    componentWillMount = () => {
        window.onhashchange = () => {
            let queries = queryString();
            const { page, pageKey } = queries;
            if (!page) {
                return;
            }
            store.dispatch(actions.passLoadingState(true));
            this.props.requestConfigByApi(pageKey, page);
        };
    };
    componentDidMount = () => {
        let queries = queryString();
        const { page, pageKey } = queries;
        store.dispatch(actions.passLoadingState(true));
        this.props.requestConfigByApi(pageKey, page);
    };
    elementFactory = config => {
        config &&
            Promise.all(loader(config)).then(widgets => {
                let views = _.map(widgets, (widget, index) => {
                    widget &&
                        widget.reactEle &&
                        widget.reactEle.ccmsAction &&
                        this.props.excuteActionFromWidget(widget.reactEle.ccmsAction, widget.properties, widget.id);
                    return (
                        <div data-grid={widget.layout} key={widget.id}>
                            <WidgetContainer
                                title={widget.title}
                                widgetId={widget.id}
                                onWidgetDelete={this.handleWidgetDelete}
                                onWidgetEdit={this.handleWidgetEdit}
                            >
                                <widget.reactEle.view key={widget.id} identify={widget.id} {...widget.properties} />
                            </WidgetContainer>
                        </div>
                    );
                });
                this.setState({
                    doms: views
                });
            });
    };
    componentWillReceiveProps = props => {
        const { pageConfig, pageRequestError } = props;
        const { configValue } = pageConfig;
        if (!pageRequestError) {
            this.elementFactory(configValue || []);
        }
    };
    render = () => {
        const { doms } = this.state;
        const { loading } = this.props;
        return (
            <Wrap>
                {loading && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 9999,
                            background: "#0e0e0e",
                            opacity: 0.5,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Loading />
                    </div>
                )}
                <WidgetGridView>{doms}</WidgetGridView>
            </Wrap>
        );
    };
}

const mapStateToProps = (state, ownedProps) => {
    return {
        pageConfig: state[reducerName] && state[reducerName].pageConfig,
        pageRequestError: state[reducerName] && state[reducerName].pageRequestError,
        errorMessage: state[reducerName] && state[reducerName].errorMessage,
        loading: state[reducerName] && state[reducerName].loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestConfigByApi: (pageKey, page) => {
            dispatch(actions.requestPageConfig(pageKey, page));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageViewer);
