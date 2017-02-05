import React from 'react';
import {Navigator, View} from 'react-native';

export default class NavigationBar extends Navigator.NavigationBar {
  constructor(props) {
    super(props);
  }

  render() {
    var route = this.props.route;

    if (route.id === 0) {
      return null;
    }

    return super.render();
  }
}