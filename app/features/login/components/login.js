import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, Button} from 'react-native';

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return (<View style={styles.container}>
      <View style={styles.login_view}>
        <View style={{flex:2}}/>
        <Image style={styles.head_image} source={require('../../../images/login/loginhead.png')}/>
        <Image style={styles.login_image} source={require('../../../images/login/loginFont.png')}/>
        <View style={{flex:2}}/>
      </View>
      <View style={styles.input_view}>
        <TextInput style={styles.input_text} placeholder="手机号" onChangeText={(text)=>this.setState({mobile: text})}/>
        <TextInput style={styles.input_text} placeholder="密码" secureTextEntry={true}
                   onChangeText={(text)=>this.setState({password: text})}/>
      </View>
      <View style={styles.login_button}>
        <Button title="登录" onPress={()=>this.props.login(this.state.mobile, this.state.password)}
                disabled={!this.state.mobile || !this.state.password}/>
      </View>
      <View style={styles.text_view}>
        <Text>没有账号？去注册</Text>
        <Text>忘记密码</Text>
      </View>
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
  login_view: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  head_image: {flex: 3, resizeMode: 'contain', marginVertical: 10},
  login_image: {flex: 1, resizeMode: 'contain', marginVertical: 10},
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
