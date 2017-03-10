import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, Button, Navigator, TouchableHighlight, KeyboardAvoidingView, Keyboard} from 'react-native';

import CommonHeader from './common_header';
import {colors} from '../../../constants';

export default class Login extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  constructor(props) {
    super(props);
    this.state = {space:4};
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(){
    this.setState({space:4});
  }

  _keyboardDidHide(){
    this.setState({space:4});
  }

  render() {
    return (<KeyboardAvoidingView style={styles.container} behavior='padding'>
      <CommonHeader headerImage={require('../../../images/login/loginhead.png')}
                    textImage={require('../../../images/login/loginFont.png')}/>

      <View style={styles.input_view}>
        <TextInput style={styles.input_text} placeholder="手机号" onChangeText={(text)=>this.setState({mobile: text})}/>
        <TextInput style={styles.input_text} placeholder="密码" secureTextEntry={true}
                   onChangeText={(text)=>this.setState({password: text})}/>
      </View>
      <View style={styles.login_button}>
        <Button title="登录" onPress={()=>this.props.screenProps.login(this.state.mobile, this.state.password)}
                disabled={!this.state.mobile || !this.state.password}/>
      </View>
      <View style={styles.text_view}>
        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Register')}
                            underlayColor={colors.underlayColor}>
          <Text>没有账号？去注册</Text>
        </TouchableHighlight>
        <Text onPress={()=>this.props.navigation.navigate('ForgetPassword')}>忘记密码</Text>
      </View>
      <View style={{flex: this.state.space}}/>
    </KeyboardAvoidingView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input_view: {
    flex: 1.5,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f6f6f6',
    // alignItems: 'center',
  },
  input_text: {
    height: 50,
    flex: 1,
  },
  login_button: {
    flex: 1,
    marginHorizontal: 10,
  },
  text_view: {
    flex: 1,
    alignItems: 'center',
  }
});
