import React from 'react';
import {View, Text, TextInput, Button, Dimensions, Alert} from 'react-native';
import {FontSize, colors} from '../../../constants';
import {header} from '../../../components/navigation_header';

export default class Withdraw extends React.Component {

  static navigationOptions = {
    title: '申请提现',
    header: header,
  }

  constructor(props) {
    super(props);
    this.state = {withdrawAmount: ''};
  }

  _withdraw() {
    const {amount, withdraw} = this.props.navigation.state.params;
    const money = parseFloat(this.state.withdrawAmount);
    if (money > amount) {
      Alert.alert(
        '',
        '输入金额错误',
        [
          {text: '确定'},
        ],
        {cancelable: false}
      )
    } else {
      withdraw(money);
    }
  }

  render() {
    const {amount} = this.props.navigation.state.params;

    return (
      <View style={{flex:1,backgroundColor: colors.bkColor}}>
        <View
          style={{ paddingHorizontal:10, backgroundColor: colors.bkColor,height: Dimensions.get('window').height / 3}}>
          <Text style={{flex:1, fontSize: FontSize.xxlarge , textAlign:'center', color:'#559bec'}}>{amount}</Text>
          <Text style={{flex:1}}>请输入提现金额</Text>
          <TextInput style={{flex:0.7, backgroundColor: 'white', marginBottom:10}} keyboardType="numeric"
                     placeholder={'最多可提现'+amount}
                     onChangeText={(text)=>this.setState({'withdrawAmount': text})}
                     underlineColorAndroid='transparent'/>
          <Button title="确定" disabled={!this.state.withdrawAmount} onPress={this._withdraw.bind(this)}/>
          <Text style={{marginTop: 10, fontSize: FontSize.small}}>温馨提示：提现后，将有全时护理工作人员和您联系。</Text>
          <Text style={{fontSize: FontSize.small}}>详情咨询：<Text style={{color:'#559bec'}}>400-960-8091</Text></Text>

        </View></View>);
  }
}

