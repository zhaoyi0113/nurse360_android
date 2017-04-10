import React from 'react';
import {View, Text, Image, ScrollView, Button, TextInput} from 'react-native';

import {colors, margin, FontSize} from '../../../constants';
import {header} from '../../../components/navigation_header';
import ImageSelector from '../../../components/image_selector';

export default class QuestionReply extends React.Component {

  static navigationOptions = {
    title: '答复问题',
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

  _replyQuestion() {
    this.props.navigation.state.params.replyQuestion(this.state.content, this.selector.state.images,this.props.navigation);
  }

  render() {
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <ScrollView style={{flex:1}}>
        <Text style={{marginLeft: margin, color: colors.lightTextColor}}>回复患者</Text>
        <TextInput style={{backgroundColor: 'white', margin:margin, height:150 }}
                   value={this.state.content}
                   multiline={true}
                   onChangeText={(t)=>this.setState({content: t})}
                   placeholder='回复患者有关病情的建议，解决方案'
                   underlineColorAndroid='transparent'/>
        <Text style={{marginLeft: margin, color: colors.lightTextColor}}>
          上传问题相关或诊断结果（最多9张，没有可不传）
        </Text>
        <ImageSelector ref={s=>this.selector=s}/>
      </ScrollView>
      <View style={{borderRadius:5, margin:margin}}>
        <Button title='提交' disabled={!this.state.content} onPress={this._replyQuestion.bind(this)}/>
      </View>
    </View>);
  }
}