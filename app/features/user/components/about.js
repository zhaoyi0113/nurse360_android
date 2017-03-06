import React from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {header} from '../../../components/navigation_header';

export default class About extends React.Component {
  static navigationOptions = {
    title: '关于',
    header:header,
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', flexDirection:'row'}}>
        <Text style={{flex: 1, textAlign: 'center'}}>当前版本：{DeviceInfo.getReadableVersion()}</Text>
      </View>
    )
  }
}


