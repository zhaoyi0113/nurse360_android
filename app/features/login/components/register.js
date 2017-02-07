import React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';

import CommonHeader from './common_header';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  nextStep() {
    if (this.state.password.length < 6) {
      Alert.alert(
        '',
        '密码长度不能小于6位',
        [
          {text: '确定'},
        ]
      );
      return;
    }
    this.props.nextStep();
  }

  render() {

    return (<View style={styles.container}>
      <CommonHeader headerImage={require('../../../images/login/loginhead.png')}
                    textImage={require('../../../images/login/registerFont.png')}
                    text="护士基本信息"/>
      <View style={styles.input_view}>
        <TextInput style={styles.input_text} placeholder="手机号" onChangeText={(text)=>this.setState({mobile: text})}/>
        <View style={styles.verify_view}>
          <TextInput style={styles.input_text} placeholder="验证码"
                     onChangeText={(text)=>this.setState({verifyCode: text})}/>
          <Text style={{color: '#559bec', marginRight: 10}} onPress={()=> this.props.requestSmsCode(this.state.mobile)}>获取验证码</Text>
        </View>
        <TextInput style={styles.input_text} placeholder="密码" secureTextEntry={true}
                   onChangeText={(text)=>this.setState({password: text})}/>
      </View>
      <View style={styles.register_button}>
        <Button title="下一步" onPress={this.nextStep.bind(this)}
                disabled={!this.state.mobile || !this.state.password || !this.state.verifyCode}/>
      </View>
      <Text style={{textAlign:'center'}} onPress={()=>this.props.goLogin()}>已有账号？去登录</Text>
      <View style={{flex: 4}}/>
    </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input_view: {
    flex: 2.5,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f6f6f6',
  },
  verify_view: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_text: {
    height: 50,
    flex: 1,
  },
  register_button: {
    flex: 1,
    marginHorizontal: 10,
  },
});