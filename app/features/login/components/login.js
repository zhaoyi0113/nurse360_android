import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Navigator,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions
} from 'react-native';

import CommonHeader from './common_header';
import {colors} from '../../../constants';
import Line from '../../../components/line';

export default class Login extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
  }

  _keyboardDidHide() {
  }

  render() {
    return (<KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={{height: Dimensions.get('window').height / 1.6,flex:1, top:0, alignSelf: 'flex-start'}}>
        <CommonHeader headerImage={require('../../../images/login/loginhead.png')}
                      textImage={require('../../../images/login/loginFont.png')}/>

        <View style={styles.input_view}>
          <TextInput style={styles.input_text} underlineColorAndroid='transparent' placeholder="手机号" onChangeText={(text)=>this.setState({mobile: text})}/>
          <Line/>
          <TextInput style={styles.input_text} underlineColorAndroid='transparent' placeholder="密码" secureTextEntry={true}
                     onChangeText={(text)=>this.setState({password: text})}/>
        </View>
        <View style={styles.login_button}>
          <Button title="登录" onPress={()=>this.props.screenProps.login(this.state.mobile, this.state.password)}
                  disabled={!this.state.mobile || !this.state.password}/>
        </View>
        <View style={styles.text_view}>
          <TouchableHighlight onPress={()=> this.props.navigation.navigate('Register')}
                              underlayColor={colors.underlayColor}>
            <Text style={{color: '#9b9b9b'}}>没有账号？去注册</Text>
          </TouchableHighlight>
          <Text style={{color: '#9b9b9b'}} onPress={()=>this.props.navigation.navigate('ForgetPassword')}>忘记密码</Text>
        </View>
      </View>
    </KeyboardAvoidingView>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',

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
