import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import MainContainer from './containers';
import reducers from './reducers';
import createLogger from 'redux-logger';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import * as actions from './actions/common_actions';
import * as types from './actions/action_types';

const engine = createEngine('nurse360_android');


const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: 'https://www.nurse-go.cn:9100/nurse360',
  responseType: 'json'
});

const middlewares = [];

middlewares.push(thunk);
middlewares.push(axiosMiddleware(client));
middlewares.push(storage.createMiddleware(engine, [types.WAITING_INDICATOR]));
middlewares.push(createLogger());
const store = compose(
  applyMiddleware(...middlewares),
)(createStore)(reducers)
store.dispatch(actions.requestWaitingIndicator(true));
// load previous saved states
const load = storage.createLoader(engine);

load(store).then((newState) => store.dispatch(actions.requestWaitingIndicator(false)));
console.log('previous saved store');

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    );
  }
}

