import React from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';


export default class PasswordUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {oldPassword: '', newPassword: ''};
  }

  render() {
    return (<View style={styles.container}>
      <Text>修改您的密码</Text>
      <TextInput placeholder='请输入原密码' value={this.state.oldPassword}
                 secureTextEntry={true}
                 onChangeText={(text)=>this.setState({oldPassword: text})}/>
      <TextInput placeholder='请输入新密码' value={this.state.newPassword}
                 secureTextEntry={true}
                 onChangeText={(text)=>this.setState({newPassword: text})}/>
      <Text style={{textAlign: 'right',margin:5}} onPress={this.props.forgetPassword.bind(this)}>忘记密码</Text>
      <Button title='确认' onPress={() => this.props.changePassword(this.state.oldPassword, this.state.newPassword)}
              disabled={!this.state.oldPassword || !this.state.newPassword}/>
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});