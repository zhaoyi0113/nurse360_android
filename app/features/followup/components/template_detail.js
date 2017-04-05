import React from 'react';
import {View, Text} from 'react-native';
import {header} from '../../../components/navigation_header';
import {FontSize, colors, margin} from '../../../constants';


const Description = ({template}) => {
  return (<View style={{backgroundColor: 'white', marginHorizontal:10, flex:1}}>
    <Text style={{fontSize: FontSize.xlarge, marginVertical: margin, marginHorizontal: margin}}>{template.title}</Text>
    <Text style={{color: colors.lightTextColor, marginHorizontal: margin}}>{template.description}</Text>
    <Text
      style={{color: colors.lightTextColor, marginHorizontal: margin, alignSelf: 'flex-end'}}>共{template.detail.length}项</Text>
  </View>);
}

const Detail = ({details}) => {
  return (<View style={{flex: 3}}>
    <Text style={{color: colors.lightTextColor, marginLeft: margin}}>本模块包含的问题</Text>
    <View style={{flex:1}}>
      {
        details.map((detail, i) => {
          return (
            <Text key={i} style={{fontSize: FontSize.normal}}>{i + '、' + detail}</Text>
          );
        })
      }
    </View>
  </View>);
}

export default class TemplateDetail extends React.Component {

  static navigationOptions = {
    title: ({state}) => `${state.params.template.title}`,
    header: header,
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    const {template} = this.props.navigation.state.params;
    return (<View style={{flex:1, backgroundColor: colors.bkColor}}>
      <Description template={template}/>
      <Detail details={template.detail}/>
    </View>);
  }

}