import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../constants';
import Button from 'react-native-button';

export default class PasswordUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {oldPassword: '', newPassword: ''};
  }

  render() {
    return (<View style={styles.container}>
      <View style={{margin:10}}>
        <Text>修改您的密码</Text>
        <TextInput placeholder='请输入原密码' value={this.state.oldPassword}
                   secureTextEntry={true}
                   underlineColorAndroid='transparent'
                   onChangeText={(text)=>this.setState({oldPassword: text})}/>
        <TextInput placeholder='请输入新密码' value={this.state.newPassword}
                   secureTextEntry={true}
                   underlineColorAndroid='transparent'
                   onChangeText={(text)=>this.setState({newPassword: text})}/>
        <Text style={{textAlign: 'right',margin:5}} onPress={this.props.forgetPassword.bind(this)}>忘记密码</Text>
      </View>
      <Button
        style={{color: 'white', textAlign: 'center' }}
        styleDisabled={{backgroundColor: 'lightgray'}}
        containerStyle={{position:'absolute', bottom:1,backgroundColor:colors.labelColor, width: Dimensions.get('window').width - 20, margin:10, alignSelf: 'center'}}
        onPress={() => this.props.changePassword(this.state.oldPassword, this.state.newPassword)}
        disabled={!this.state.oldPassword || !this.state.newPassword}>
        确认
      </Button>
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bkColor,
  }
});