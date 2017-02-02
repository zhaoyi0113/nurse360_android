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
import * as reducers from './reducers';
import createLogger from 'redux-logger';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: 'https://www.nurse-go.cn:9100/nurse360',
  responseType: 'json'
});

const middlewares = [];
middlewares.push(thunk);
middlewares.push(axiosMiddleware(client));
middlewares.push(createLogger());
const reducer = combineReducers(reducers);
const store = compose(
  applyMiddleware(...middlewares),
)(createStore)(reducer)

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    );
  }
}

