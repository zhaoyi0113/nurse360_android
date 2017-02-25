import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import MainContainer from './containers';
import reducers from './reducers';
import createLogger from 'redux-logger';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import Config from 'react-native-config';
import * as actions from './actions/common_actions';
import * as types from './actions/action_types';
import {Root} from './routers';

const engine = createEngine('nurse360_android');


const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: Config.API_URL,
  responseType: 'json'
});
const leanCloud = axios.create({baseURL: 'https://api.leancloud.cn/1.1'})

const middlewares = [];

middlewares.push(thunk);
middlewares.push(multiClientMiddleware({'default': {client: client}, 'leanCloud': {client: leanCloud}}));
middlewares.push(storage.createMiddleware(engine, [types.WAITING_INDICATOR]));
middlewares.push(createLogger());
const store = compose(
  applyMiddleware(...middlewares),
)(createStore)(reducers)
store.dispatch(actions.requestWaitingIndicator(true));
// load previous saved states
const load = storage.createLoader(engine);

load(store).then((newState) => store.dispatch(actions.requestWaitingIndicator(false)));

const AppWithNavigationState = connect(state=>({
  nav: state.nav,
}))(({ dispatch, nav }) => (
  <Root navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

export default class AppContainer extends Component {

  render() {

    return (
      <Provider store={store}>
        <AppWithNavigationState/>
        {/*<MainContainer rootNavigation={this.props.navigation}/>*/}
      </Provider>
    );
  }
}



