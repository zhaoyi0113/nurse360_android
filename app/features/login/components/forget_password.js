import React from 'react';

import {View, Text, TextInput, Dimensions} from 'react-native';
import {colors} from '../../../constants';
import Button from 'react-native-button';

export default class ForgetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mobile: '', verifyCode: '', newPwd: ''};
  }

  render() {
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <View style={{margin:10}}>
        <Text>您要修改的新密码</Text>
        <TextInput placeholder='输入您的手机号' onChangeText={(text)=>this.setState({mobile: text})}/>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style={{flex:1}} placeholder='输入验证码'
                     onChangeText={(text)=>this.setState({verifyCode: text})}/>
          <Text style={{color: '#559bec'}}
                onPress={this.props.requestSmsCode.bind(this)}>发送验证码</Text>
        </View>
        <TextInput placeholder='输入您的新密码'
                   secureTextEntry={true}
                   onChangeText={(text)=>this.setState({newPwd: text})}/>
      </View>
      <Button
        containerStyle={{position:'absolute', bottom: 1,width: Dimensions.get('window').width-20,  margin:10, backgroundColor: colors.labelColor}}
        style={{color:'white'}}
        styleDisabled={{backgroundColor: 'lightgray'}}
        disabled={!this.state.newPwd || !this.state.verifyCode || !this.state.mobile}
        onPress={() => this.props.submit(this.state.mobile, this.state.verifyCode, this.state.newPwd)}>
        确定
      </Button>
    </View>);
  }

}