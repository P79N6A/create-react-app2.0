import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import asyncComponent from "commons/components/asyncComponent";
import configComponent from "commons/components/configComponent";
import GlobalStyle from "commons/components/globalStyle";
import Wrap from "commons/components/wrapComponent";
import PrivateRoute from "commons/components/privateRoute";
import "commons/utils/observer";
import { getSettings, getLocalSetting, getWeatherApiConf, getMaterialKey } from "commons/utils/settingHelper";
import ContextProvider from "commons/components/context";
import getLang from "commons/utils/langHelper";
import { I18n } from "react-i18nify";
import { actions as auth, Authorization } from "modules/auth";
import userHelper from "commons/utils/userHelper";
import { sagas as themeSagas, reducer as themeReducer, reducerName as themeReducerName } from "modules/theme";
import "react-redux-spinner/dist/react-redux-spinner.css";
import "./index.css";

// import { Spinner } from "react-redux-spinner";
// import registerServiceWorker from "./registerServiceWorker";
// import getUrl from "commons/utils/urlHelper";
import { sagas, reducer, reducerName } from "modules/auth";

import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import sagasMsgBus, * as msg from "commons/utils/messageBus";
import refreshSagas from "commons/utils/autoRefreshComps";
import { view as Messages } from "modules/messageCenter";

/**
 *  * import theme here
 *  * try to change the themes at runtime
 *  ! TO-DO change theme in runtime
 */

import { IscThemes } from "modules/theme";
import boardEditer from "./pages/ccms";

sagaMiddleware.run(sagas);
sagaMiddleware.run(sagasMsgBus);
sagaMiddleware.run(refreshSagas);
sagaMiddleware.run(themeSagas);
injectAsyncReducer(store, reducerName, reducer);
injectAsyncReducer(store, themeReducerName, themeReducer);

async function init() {
    // const urls = await getUrl();
    const settings = await getSettings();
    const localSetting = await getLocalSetting();
    const getWeatherApiConfSetting = await getWeatherApiConf();
    const lang = await getLang(settings.defaultLanguage);
    const materialKeys = await getMaterialKey();
    return Promise.resolve({ settings, lang, localSetting, getWeatherApiConfSetting, materialKeys });
}

// const TaskOperation = asyncComponent(() => import("./pages/taskOperation"));
// const SopManagement = asyncComponent(() => import("./pages/sopManagement"));
const Activition = asyncComponent(() => import("./pages/activition"));
const ForgotPassword = asyncComponent(() => import("./pages/forgotPassword"));
const ResetPassword = asyncComponent(() => import("./pages/resetPassword"));
// const AuditDashboard = asyncComponent(() => import("./pages/audit"));
// const Timeline = asyncComponent(() => import("./pages/timeline"));

// const BaseContainer = asyncComponent(() => import("./pages/containerWithHeaderNav"));
// const Login = asyncComponent(() => import("./pages/login"));
// const Map = asyncComponent(() => import("./pages/map"));
// const Resource = asyncComponent(() => import("./pages/resource"));
// const application = asyncComponent(() => import("./pages/application"));
// const Logger = asyncComponent(() => import("./pages/logger"));
// const Accountmanagement = asyncComponent(() => import("./pages/accountmanagement"));
// const Association = asyncComponent(() => import("./pages/association"));
// const boardsLib = asyncComponent(() => import("./pages/boardsLib"));
// const Security = asyncComponent(() => import("./pages/security"));
// const pageViewer = asyncComponent(() => import("./pages/pageView"));
// const deviceProvision = asyncComponent(() => import("./pages/deviceProvision"));
// const ChartDashboard = asyncComponent(() => import("./pages/chartDashboard"));
// const AlarmPage = asyncComponent(() => import("./pages/alarm"));
// const TopologyPage = asyncComponent(() => import("./pages/topology"));
// const EventDashboard = asyncComponent(() => import("./pages/event"));
// const Rule = asyncComponent(() => import("./pages/rule"));
// const queryBuilder = asyncComponent(() => import("./pages/queryBuilder"));

//  ! TO-DO render config
//  ! @TEST
//  ! ready to use it
// const AlarmTest = configComponent(() => import("./pages/config/alarm.json"));
// const EventTest = configComponent(() => import("./pages/config/event.json"));
// const RuleTest = configComponent(() => import("./pages/config/rule.json"));
// const DeviceTest = configComponent(() => import("./pages/config/device.json"));
const DashboardTest = configComponent(() => import("./pages/config/dashboard.json"));
// const LoggerTest = configComponent(() => import("./pages/config/logger.json"));
// const ApplicationTest = configComponent(() => import("./pages/config/application.json"));
// const SecurityTest = configComponent(() => import("./pages/config/security.json"));
// const AccountTest = configComponent(() => import("./pages/config/account.json"));
// const DeviceProvision = configComponent(() => import("./pages/config/deviceProvision.json"));
const AppLibrary = configComponent(() => import("./pages/config/appDashboard.json"));
const LoginTest = configComponent(() => import("./pages/config/login.json"));
// const DataSearchTest = configComponent(() => import("./pages/config/dataSearch.json"));
// const Template = configComponent(() => import("./pages/config/library.json"));
// const MachineLearn = configComponent(() => import("./pages/config/machineLearn.json"));
const Usage = configComponent(() => import("./pages/config/usage"));
// const DeviceCommand = configComponent(() => import("./pages/config/deviceCommandStatus.json"));
const DeviceImport = configComponent(() => import("./pages/config/deviceImport.json"));
const MainRouter = ({ basename, materialKey }) => {
    return (
        <Router basename={basename}>
            <Switch>
                <Route path="/login" component={LoginTest} />
                <Route path="/activation" component={Activition} />
                {/* <Route path="/test" component={DashboardTest} /> */}
                <Route path="/reset_cridential" component={ForgotPassword} />
                <Route path="/user_expiry" component={ResetPassword} />
                <PrivateRoute path="/Usage" component={Usage} />
                <PrivateRoute path="/ccms" component={boardEditer} />
                <PrivateRoute exact path="/dashboards" component={DashboardTest} />
                <PrivateRoute
                    exact
                    path="/"
                    component={AppLibrary} //boardsLib
                    materialKey={materialKey["DASHBOARD_LIBRARY_MGMT_PAGE"]["material-key"]}
                />
                {/*
                <PrivateRoute
                    exact
                    path="/security"
                    component={SecurityTest} //Security
                    materialKey={materialKey["SECURITY_MGMT_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    exact
                    path="/deviceProvision"
                    component={DeviceProvision} //deviceProvision
                    materialKey={materialKey["DEVICE_MGMT_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    exact
                    path="/application"
                    component={ApplicationTest} //application
                    materialKey={materialKey["SETTING_APPLICATION_CONFIG_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    exact
                    path="/rules"
                    component={RuleTest} //Rule
                    materialKey={materialKey["RULE_MGMT_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    exact
                    path="/alarms"
                    component={AlarmTest} //AlarmPage
                    materialKey={materialKey["ALARM_MGMT_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    exact
                    path="/events"
                    component={EventTest} //EventDashboard
                    materialKey={materialKey["EVENT_MGMT_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    path="/devices"
                    component={DeviceTest} //TopologyPage
                />
                <PrivateRoute path="/taskOperation" component={TaskOperation} />
                <PrivateRoute path="/sopManagement" component={SopManagement} />
                <PrivateRoute
                    exact
                    path="/logger"
                    component={LoggerTest} //Logger
                    materialKey={materialKey["LOGGER_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    path="/account"
                    component={AccountTest} //Accountmanagement
                    materialKey={materialKey["ACCOUNTS_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    path="/dataSearch"
                    component={DataSearchTest} // DataSearch
                    materialKey={materialKey["DATA_DATASEARCH_PAGE"]["material-key"]}
                />
                <PrivateRoute
                    exact
                    path="/audit"
                    component={AuditDashboard}
                    materialKey={materialKey["AUDIT_MGMT_PAGE"]["material-key"]}
                />
                <PrivateRoute path="/timeline" component={Timeline} />
                <PrivateRoute path="/machineLearn" component={MachineLearn} />
                <PrivateRoute
                    path="/deviceControlStatus"
                    component={DeviceCommand} // DeviceCommand
                />
                */}
                {/* <PrivateRoute path="/map" component={Map} />
                {/* <PrivateRoute exact path="/template" component={Template} />
                {/* <PrivateRoute path="/view" component={pageViewer} /> */}
                {/* <PrivateRoute path="/resource" component={Resource} /> */}
                {/* <PrivateRoute path="/chartDashboard" component={ChartDashboard} /> */}
                {/* <PrivateRoute path="/queryBuilder" component={queryBuilder} /> */}
                {/* <PrivateRoute path="/test" component={BaseContainer} /> */}
                {/* <PrivateRoute path="/association" component={Association} /> */}
                <PrivateRoute
                    path="/deviceImport"
                    component={DeviceImport}
                    // materialKey={materialKey["DEVICE_IMPORTEXPORT_MENU"]["material-key"]}
                />
            </Switch>
        </Router>
    );
};

init().then(d => {
    I18n.setTranslations(d.lang);
    I18n.setLocale(d.settings.languages[d.settings.defaultLanguage]);
    var userInfo = JSON.parse(userHelper.get());
    if (userInfo) {
        store.dispatch(auth.createIdentify(userInfo));
        store.dispatch(msg.connect());
    }
    let materialKeys = d.materialKeys;
    store.dispatch(auth.reset({ materialKeys: materialKeys || {} }));
    const DefaultProperty = {
        materialKeys: materialKeys
    };
    ReactDOM.render(
        <Provider store={store}>
            <ContextProvider.Provider value={DefaultProperty}>
                <Wrap>
                    <IscThemes>
                        <GlobalStyle />
                        {/* <Template /> */}
                        <MainRouter materialKey={materialKeys} basename={d.settings.homepage} />
                        <Messages />
                    </IscThemes>
                    {/* <Spinner /> */}
                    <Authorization />
                </Wrap>
            </ContextProvider.Provider>
        </Provider>,
        document.getElementById("root")
    );
    // registerServiceWorker();
});
