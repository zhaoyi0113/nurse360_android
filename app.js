import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';

import {Root} from './app/routers';
import App from './app/index';



AppRegistry.registerComponent('nurse360_android', () => App);