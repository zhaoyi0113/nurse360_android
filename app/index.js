import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Alert, StatusBar, BackAndroid} from "react-native";
import {addNavigationHelpers, NavigationActions} from "react-navigation";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider, connect} from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import createLogger from "redux-logger";
import axios from "axios";
import {multiClientMiddleware} from "redux-axios-middleware";
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-reactnativeasyncstorage";
import Config from "react-native-config";
import * as actions from "./actions/common_actions";
import * as types from "./actions/action_types";
import {Root} from "./routers";
import WaitingIndicator from './components/waiting_indicator';
import SplashScreen from 'react-native-splash-screen';

const engine = createEngine('nurse360_android');


const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: Config.API_URL,
  responseType: 'json'
});
const leanCloud = axios.create({baseURL: 'https://api.leancloud.cn/1.1'})

const middlewares = [];

middlewares.push(thunk);
middlewares.push(multiClientMiddleware({'default': {client: client}, 'leanCloud': {client: leanCloud}}));
middlewares.push(storage.createMiddleware(engine, [types.WAITING_INDICATOR], [types.LOGIN_HTTP + types.SUCCESS, types.LOGOUT_HTTP + types.SUCCESS]));
middlewares.push(createLogger());

const store = compose(
  applyMiddleware(...middlewares),
)(createStore)(reducers)
store.dispatch(actions.requestWaitingIndicator(true));
// load previous saved states
const load = storage.createLoader(engine);

load(store).then((newState) => store.dispatch(actions.requestWaitingIndicator(false)));

// const AppWithNavigationState = connect(state => ({
//   nav: state.nav,
// }))(({dispatch, nav}) => (
//   <Root navigation={addNavigationHelpers({ dispatch, state: nav })}/>
// ));

class AppWithNavigation extends Component {

  constructor(props) {
    super(props);
    this.showAlert = false;
    BackAndroid.addEventListener('hardwareBackPress', this._deviceBackHandler.bind(this));
  }

  _deviceBackHandler() {
    const {nav} = this.props;
    if (nav.routes.length > 3 && nav.index == nav.routes.length - 1) {
      this.props.navigateBack(nav.routes[nav.index].key);
    } else if (nav.routes.length === 3 && nav.index === nav.routes.length - 1) {
      //TODO: handle exist application
    }
    return true;
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    if (this.props.alert && !this.showAlert) {
      this.showAlert = true;
      Alert.alert(
        this.props.alert.title,
        this.props.alert.message,
        [
          {
            text: '确定', onPress: () => {
            this.props.clearAlert();
            this.showAlert = false;
          }
          },
        ]
      );
    }

    return (<View style={{flex:1}}>
      <StatusBar translucent={true} backgroundColor='transparent'/>
      <Root navigation={this.props.addNavigationHelpers(this.props.nav)}/>
      <WaitingIndicator isVisible={this.props.waitingIndicator}/>
    </View>);
  }

}
const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    nav: state.nav,
    alert: state.common.alert,
    storageLoaded: state.common.storageLoaded,
    waitingIndicator: state.common ? state.common.waitingIndicator : false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNavigationHelpers: (nav) => {
      return addNavigationHelpers({dispatch, state: nav})
    },
    clearAlert: () => {
      dispatch(actions.clearAlert());
    },
    navigateBack: (key) => {
      dispatch({type: 'Navigation/BACK', key})
    }
  }
}

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(AppWithNavigation);

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}




