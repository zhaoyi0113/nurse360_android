import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {FontSize, colors} from '../../../constants';
import {header} from '../../../components/navigation_header';

export default class Withdraw extends React.Component {

  static navigationOptions = {
    title: '申请提现',
    header:header,
  }

  render() {
    const {amount, withdraw} = this.props.navigation.state.params;
    return (<View style={{flex:1, paddingHorizontal:10, backgroundColor: colors.bkColor}}>
      <Text style={{flex:2, fontSize: FontSize.xxlarge , textAlign:'center', color:'lightblue'}}>{amount}</Text>
      <Text style={{flex:1}}>请输入提现金额</Text>
      <TextInput style={{flex:1, backgroundColor: 'white'}} keyboardType="numeric" placeholder={'最多可提现'+amount} underlineColorAndroid='transparent'/>
      <Button title="确定" onPress={()=>withdraw()}/>
      <View style={{flex: 20}}/>
    </View>);
  }
}

