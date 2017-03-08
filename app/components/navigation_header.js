import React from 'react';
import {View, Image, TouchableHighlight, Text} from 'react-native';

import {FontSize} from '../constants';

export const headerHeight = 30;

export const header = ({state, setParams, goBack}) => ({
  visible: true,
  titleStyle: {height: headerHeight, alignSelf: 'center', color: 'gray', fontSize: FontSize.large, marginTop: 5, backgroundColor: '#f6f6f6'},
  style: {height: headerHeight, backgroundColor: '#f6f6f6'},
  tintColor: '#f6f6f6',
  right: (<View style={{width: 60}}/>),
  left: (<TouchableHighlight underlayColor='lightgray' onPress={()=>{
    goBack();
  }}>
    <View style={{height: headerHeight, flexDirection: 'row', alignItems: 'center'}}>
    <Image style={{height:15, width:15, marginLeft:5}} source={require('../images/back_blue.png')}/>
    <Text style={{color: '#559bec'}}>返回</Text>
    </View>
  </TouchableHighlight>)
})