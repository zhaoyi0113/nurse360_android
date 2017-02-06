import _ from 'lodash';
import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';

import SettingContainer from '../features/user/containers/setting_container';
import About from '../features/user/components/about';
import UserAgreemnt from '../features/user/components/user_agreement';

export const SETTING_ROUTER = 1;
export const ABOUT_ROUTER = 2;
export const USER_AGREEMENT = 3;

export const routers = [
  {
    id: 0,
    title: '',
  }, {
    //user setting
    id: SETTING_ROUTER,
    title: '设置',
  }, {
    id: ABOUT_ROUTER,
    title: '关于',
  }, {
    id: USER_AGREEMENT,
    title: '用户协议'
  }
]

export const getRouters = (id) => {
  return _.find(routers, {id: id});
}

export const getRouteComponent = (route, navigator) => {
  switch (route.id) {
    case SETTING_ROUTER:
      return <SettingContainer navigator={navigator}/>;
    case ABOUT_ROUTER:
      return <About navigator={navigator}/>;
    case USER_AGREEMENT:
      return <UserAgreemnt navigator={navigator}/>;
  }
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