import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default class SuggestionFeedback extends React.Component {

  render() {
    return (<View style={{marginTop: 10, marginHorizontal: 10, flex:1}}>
      <Text>提出您的宝贵建议与意见</Text>
      <TextInput style={{flex:10}} multiline={true} onChangeText={(text)=>this.setState({text: text})}/>
      <Button style={{flex:1}} title="提交" onPress={()=>this.props.submit()}/>
    </View>);
  }
}