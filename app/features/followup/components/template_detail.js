import React from 'react';
import {View, Text, Dimensions, Button} from 'react-native';
import {FontSize, colors, margin} from '../../../constants';


const Description = ({template}) => {
  return (<View style={{backgroundColor: 'white', marginHorizontal:10, flex:1}}>
    <Text style={{fontSize: FontSize.xlarge, marginVertical: margin, marginHorizontal: margin}}>{template.title}</Text>
    <Text style={{color: colors.lightTextColor, marginHorizontal: margin}}>{template.description}</Text>
    <Text
      style={{color: colors.lightTextColor, marginHorizontal: margin, alignSelf: 'flex-end'}}>共{template.questions.length}项</Text>
  </View>);
}

const Detail = ({questions}) => {
  return (<View style={{flex: 3}}>
    <Text style={{color: colors.lightTextColor, marginLeft: margin, marginTop: margin}}>本模块包含的问题</Text>
    <View style={{flex:1, margin: margin}}>
      {
        questions.map((question, i) => {
          return (
            <Text key={i}
                  style={{fontSize: FontSize.normal, marginVertical: margin/2}}>{i + '、' + question.content}</Text>
          );
        })
      }
    </View>
  </View>);
}


export default class TemplateDetail extends React.Component {

  render() {
    const {template, submit, submitTemplate} = this.props;
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <Description template={template}/>
      <Detail questions={template.questions}/>
      {
        submit ? <View style={{width: Dimensions.get('window').width - margin*2, margin: margin}}>
          <Button title='发送随访' onPress={()=>{ submitTemplate() }}/>
        </View> : null
      }
    </View>);
  }

}


TemplateDetail.propTypes = {
  template: React.PropTypes.object,
}

TemplateDetail.defaultProps = {
  template: {questions: []},
}