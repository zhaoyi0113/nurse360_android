import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {FontSize} from '../../../constants';

export default class Withdraw extends React.Component {

  static navigationOptions = {
    title: '申请提现',
  }

  render() {
    const {amount, withdraw} = this.props.navigation.state.params;
    return (<View style={{flex:1, marginTop: 40, marginHorizontal:10}}>
      <Text style={{flex:2, fontSize: FontSize.xxlarge , textAlign:'center', color:'lightblue'}}>{amount}</Text>
      <Text style={{flex:1}}>请输入提现金额</Text>
      <TextInput style={{flex:1, backgroundColor: 'white'}} keyboardType="numeric"/>
      <Button title="确定" onPress={()=>withdraw()}/>
      <View style={{flex: 20}}/>
    </View>);
  }
}

