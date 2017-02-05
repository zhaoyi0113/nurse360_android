import _ from 'lodash';
import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

export const SETTING_ROUTER = 1;


export const routers = [
  {
    id: 0,
    title: 'main',
  }, {
    //user setting
    id: SETTING_ROUTER,
    title: '设置',
  }
]

export const getRouters = (id) => {
  return _.find(routers, {id: id});
}

export const getRouterMap = (router) => {
  return {
    LeftButton: (route, navigator, index, navState) => {
      return (<TouchableHighlight onPress={() => navigator.pop()}>
        <Text style={{color: '#559bec'}}> {'< 返回'}</Text>
      </TouchableHighlight>);
    },
    RightButton: (route, navigator, index, navState) => {
      return null;
    },
    Title: (route, navigator, index, navState) => {
      return (<Text>{route.title}</Text>);
    },
  }
}